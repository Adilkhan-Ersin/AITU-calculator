import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true }); 
    }
  }, [user, loading, navigate]);

  // 1. Show Loader while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading...  if it takes more than 30s pls login again</p>
        </div>
      </div>
    );
  }

  // 2. Double check: If loading is done and still no user, render nothing 
  if (!user) {
    return null; 
  }

  // 3. User is confirmed, render the page
  return <>{children}</>;
}