import React, { useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { UserContext } from '@/hooks/useUser';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<unknown | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // Keep loading as true initially
  const [loading, setLoading] = useState(true); 

  // --- Profile Fetch Function (Unchanged, but important for finally block) ---
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } 
    // NOTE: We rely on the caller (getInitialSession) to set setLoading(false)
    // for the initial load, NOT the finally block here, to avoid race conditions.
  };


  useEffect(() => {
    // 1. Function to handle the initial session and profile load
    const initializeAuth = async () => {
      // Step A: Get the initial session from storage
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      
      setSession(initialSession);
      const initialUser = initialSession?.user ?? null;
      setUser(initialUser);

      // Step B: If a user exists, fetch their profile
      if (initialUser) {
        await fetchProfile(initialUser.id);
      }
      
      // Step C: THIS IS THE CRITICAL LINE.
      // We set loading to false ONLY after the initial session check AND 
      // the profile fetch (if necessary) are complete.
      setLoading(false); 
    };
    
    initializeAuth();

    // 2. Set up the real-time listener for subsequent changes (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        // This listener updates state, but DOES NOT set setLoading(false).
        // It's already been set to false by initializeAuth.
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // You must await fetchProfile here to ensure profile is loaded before redirecting/accessing
          await fetchProfile(currentSession.user.id); 
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Removed setLoading(false) from fetchProfile's finally block:
  // Now, fetchProfile is only called from initializeAuth for the initial load,
  // which guarantees setLoading(false) runs last. For subsequent state changes 
  // (via onAuthStateChange), we don't want to re-trigger the main loading state.

  return (
    <UserContext.Provider value={{ user, profile, loading, session }}>
      {/* The component consuming this context should check 'loading':
        {loading ? <LoadingScreen /> : <AppRoutes />} 
      */}
      {children}
    </UserContext.Provider>
  );
};