// Simple client-side auth service (for demo purposes)
// In production, authentication should be handled server-side
import { User, LoginCredentials, RegisterCredentials, Teacher } from './types';

const JWT_SECRET = 'skolapp-secret-key'; // In production, use environment variable
const JWT_EXPIRES_IN = 24 * 60 * 60 * 1000; // 24 hours in ms

// Mock teacher database (in production, use real database)
const teachers: Record<string, { id: string; email: string; name: string; password: string }> = {};

// Simple password hashing for demo (use bcrypt server-side in production)
function simpleHash(password: string): string {
  // This is NOT secure - only for demo purposes
  return btoa(password + 'salt').split('').reverse().join('');
}

function verifyPassword(password: string, hash: string): boolean {
  return simpleHash(password) === hash;
}

// Simple JWT-like token (use proper JWT library server-side)
function createToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + JWT_EXPIRES_IN
  };
  return btoa(JSON.stringify(payload));
}

function verifyToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name,
      isAuthenticated: true
    };
  } catch {
    return null;
  }
}

export const authService = {
  // Generate token
  generateToken: createToken,

  // Verify token
  verifyToken,

  // Register teacher
  async registerTeacher(credentials: RegisterCredentials): Promise<Teacher> {
    const { email, password, name } = credentials;
    
    // Check if teacher already exists
    if (Object.values(teachers).some(t => t.email === email)) {
      throw new Error('En lärare med denna e-postadress finns redan');
    }

    const id = `teacher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const passwordHash = simpleHash(password);
    
    teachers[id] = { id, email, name, password: passwordHash };
    
    return {
      id,
      email,
      name,
      role: 'teacher',
      isAuthenticated: true
    };
  },

  // Login teacher
  async loginTeacher(credentials: LoginCredentials): Promise<Teacher> {
    const { email, password } = credentials;
    
    const teacher = Object.values(teachers).find(t => t.email === email);
    if (!teacher) {
      throw new Error('Ogiltiga inloggningsuppgifter');
    }

    const isValidPassword = verifyPassword(password, teacher.password);
    if (!isValidPassword) {
      throw new Error('Ogiltiga inloggningsuppgifter');
    }

    return {
      id: teacher.id,
      email: teacher.email,
      name: teacher.name,
      role: 'teacher',
      isAuthenticated: true
    };
  },

  // Create student guest session
  async createStudentSession(classCode: string, pseudonym?: string): Promise<User> {
    // Basic validation of class code (in production, verify against real classes)
    if (!classCode || classCode.length < 4) {
      throw new Error('Ogiltig klasskod');
    }

    const id = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id,
      role: 'student',
      isAuthenticated: true
    };
  }
};