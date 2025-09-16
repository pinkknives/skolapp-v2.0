import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Role = 'guest' | 'teacher' | 'student';

interface RoleContextValue {
  role: Role;
  setRole: (r: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

const STORAGE_KEY = 'role';

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(() => {
    if (typeof window === 'undefined') return 'guest';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'guest' || stored === 'teacher' || stored === 'student') return stored;
    } catch {}
    return 'guest';
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, role); } catch {}
  }, [role]);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
