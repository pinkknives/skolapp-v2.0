export type Role = 'guest' | 'teacher' | 'student';

export interface User {
  id: string;
  role: Role;
  email?: string; // For teachers
  name?: string;
  isAuthenticated: boolean;
}

export interface Teacher extends User {
  role: 'teacher';
  email: string;
  name: string;
}

export interface Student extends User {
  role: 'student';
  classCode?: string; // For guest mode access
  pseudonym?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface StudentAccessCredentials {
  classCode: string;
  pseudonym?: string;
}