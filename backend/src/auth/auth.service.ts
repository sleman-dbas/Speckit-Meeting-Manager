import { Injectable } from '@nestjs/common';
import { AuthUser } from './auth.types';

@Injectable()
export class AuthService {
  getUserFromToken(token: string | undefined): AuthUser | null {
    if (!token) {
      return null;
    }

    if (token === 'admin-token') {
      return { id: 'admin', role: 'Admin', displayName: 'System Admin' };
    }

    if (token === 'organizer-token') {
      return { id: 'organizer', role: 'Organizer', displayName: 'Meeting Organizer' };
    }

    if (token === 'participant-token') {
      return { id: 'participant', role: 'Participant', displayName: 'Participant User' };
    }

    return { id: 'viewer', role: 'Viewer', displayName: 'Viewer User' };
  }
}
