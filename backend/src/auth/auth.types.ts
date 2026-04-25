export type Role = 'Admin' | 'Organizer' | 'Participant' | 'Viewer';

export interface AuthUser {
  id: string;
  role: Role;
  displayName: string;
}
