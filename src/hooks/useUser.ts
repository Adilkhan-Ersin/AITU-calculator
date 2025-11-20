import { useContext, createContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  profile: unknown | null;
  loading: boolean;
  session: Session | null;
}

export const UserContext = createContext<UserContextType>({ 
  user: null, 
  profile: null, 
  loading: true, 
  session: null
});


export const useUser = () => useContext(UserContext);