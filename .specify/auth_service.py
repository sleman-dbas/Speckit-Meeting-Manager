"""Authentication service (in-memory prototype).

Implements registration, authentication, and HMAC-signed token issuance.
All functions and classes are fully typed and use Google-style docstrings.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import secrets
import time
from dataclasses import dataclass
from typing import Dict, Optional, Tuple


@dataclass
class User:
    """Data model for a registered user.

    Attributes:
        username: The user's unique username.
        salt: The salt used for PBKDF2 (base64-encoded bytes).
        password_hash: The derived key from PBKDF2 (base64-encoded bytes).
        created_at: Timestamp when the user was created (epoch seconds).
    """

    username: str
    salt: bytes
    password_hash: bytes
    created_at: float


class AuthService:
    """In-memory authentication service.

    This is a prototype intended for tests and local development. Production
    must replace the in-memory store with a persistent database and secure
    secret management.
    """

    def __init__(self, secret: Optional[bytes] = None) -> None:
        """Initialize the auth service.

        Args:
            secret: Optional HMAC secret. If not provided, read from the
                AUTH_SECRET environment variable. A runtime error is raised
                if no secret is available.
        """
        secret_env = os.environ.get("AUTH_SECRET")
        if secret is not None:
            self._secret = secret
        elif secret_env:
            self._secret = secret_env.encode("utf-8")
        else:
            raise RuntimeError("Authentication secret not configured")

        # Simple in-memory user store: username -> User
        self._users: Dict[str, User] = {}

    # -- Password helpers --
    def _hash_password(self, password: str, salt: Optional[bytes] = None) -> Tuple[bytes, bytes]:
        """Hash a password with PBKDF2-HMAC-SHA256.

        Args:
            password: Plaintext password.
            salt: Optional salt. If not provided, a new 16-byte salt is generated.

        Returns:
            A tuple (salt, password_hash) where both are raw bytes.
        """
        if salt is None:
            salt = secrets.token_bytes(16)
        dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
        return salt, dk

    def _verify_password(self, password: str, salt: bytes, expected: bytes) -> bool:
        """Verify a password against stored salt and hash.

        Args:
            password: Plaintext password to verify.
            salt: Salt used to derive the stored hash.
            expected: Stored derived key to compare against.

        Returns:
            True if password matches, False otherwise.
        """
        dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
        return hmac.compare_digest(dk, expected)

    # -- User lifecycle --
    def register_user(self, username: str, password: str) -> User:
        """Register a new user.

        Args:
            username: Desired username (must be unique).
            password: Plaintext password.

        Returns:
            The created User instance.

        Raises:
            ValueError: If username is already taken or input is invalid.
        """
        if not username or not password:
            raise ValueError("username and password are required")
        if username in self._users:
            raise ValueError("username already exists")
        salt, pwhash = self._hash_password(password)
        user = User(username=username, salt=salt, password_hash=pwhash, created_at=time.time())
        self._users[username] = user
        return user

    def authenticate_user(self, username: str, password: str) -> str:
        """Authenticate a user and return an HMAC-signed token.

        Args:
            username: Username.
            password: Plaintext password.

        Returns:
            A compact base64 token string.

        Raises:
            ValueError: On invalid credentials.
        """
        user = self._users.get(username)
        if user is None:
            # Generic error to avoid leaking user existence
            raise ValueError("invalid username or password")
        if not self._verify_password(password, user.salt, user.password_hash):
            raise ValueError("invalid username or password")
        token = self._generate_token(username)
        return token

    # -- Token management --
    def _generate_token(self, username: str, expires_in: int = 3600) -> str:
        """Generate a signed token carrying the username and expiry.

        This is a minimal HMAC-signed payload. Not a full JWT implementation.

        Args:
            username: Username to include in the token payload.
            expires_in: Seconds until expiry.

        Returns:
            A URL-safe base64 token string.
        """
        header = {"alg": "HS256", "typ": "AUTH-1"}
        payload = {"sub": username, "exp": int(time.time()) + int(expires_in)}
        raw = base64.urlsafe_b64encode(json.dumps({"h": header, "p": payload}).encode()).rstrip(b"=")
        sig = hmac.new(self._secret, raw, hashlib.sha256).digest()
        token = raw + b"." + base64.urlsafe_b64encode(sig).rstrip(b"=")
        return token.decode("utf-8")

    def verify_token(self, token: str) -> Optional[str]:
        """Verify a token and return the username if valid and unexpired.

        Args:
            token: Token string previously generated by _generate_token.

        Returns:
            The username if token is valid, otherwise None.
        """
        try:
            raw_b64, sig_b64 = token.encode("utf-8").split(b".")
            # pad for base64
            raw = base64.urlsafe_b64decode(raw_b64 + b"=")
            sig = base64.urlsafe_b64decode(sig_b64 + b"=")
            expected_sig = hmac.new(self._secret, raw_b64, hashlib.sha256).digest()
            if not hmac.compare_digest(expected_sig, sig):
                return None
            obj = json.loads(raw.decode("utf-8"))
            payload = obj.get("p", {})
            if int(time.time()) > int(payload.get("exp", 0)):
                return None
            return str(payload.get("sub"))
        except Exception:
            # Do not reveal internal errors to callers
            return None
