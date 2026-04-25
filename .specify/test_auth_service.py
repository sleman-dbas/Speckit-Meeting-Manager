"""Unit tests for the in-memory AuthService.

Uses Python's built-in unittest to avoid external dependencies.
"""
from __future__ import annotations

import os
import time
import unittest

from auth_service import AuthService


class AuthServiceTests(unittest.TestCase):

    def setUp(self) -> None:
        os.environ["AUTH_SECRET"] = "test-secret"
        self.auth = AuthService()

    def test_register_and_authenticate(self) -> None:
        user = self.auth.register_user("alice", "s3cret")
        self.assertEqual(user.username, "alice")
        token = self.auth.authenticate_user("alice", "s3cret")
        self.assertIsInstance(token, str)

    def test_invalid_credentials(self) -> None:
        self.auth.register_user("bob", "hunter2")
        with self.assertRaises(ValueError):
            self.auth.authenticate_user("bob", "wrong")

    def test_token_verify_and_expiry(self) -> None:
        self.auth.register_user("carol", "pw")
        token = self.auth.authenticate_user("carol", "pw")
        sub = self.auth.verify_token(token)
        self.assertEqual(sub, "carol")
        # Create a short-lived token and ensure expiry
        short = self.auth._generate_token("carol", expires_in=1)
        time.sleep(2)
        self.assertIsNone(self.auth.verify_token(short))


if __name__ == "__main__":
    unittest.main()
