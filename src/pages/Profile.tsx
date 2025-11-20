import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useEffect } from 'react';
import { Navbar08 } from '@/components/Navbar2';

export default function Profile() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground">Loading... wow look at ya</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
    <Navbar08 />
    <div className="text-foreground min-h-screen font-sans px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg border border-foreground shadow-lg p-4 sm:p-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>
        
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.user_metadata?.avatar_url} alt='Avatar' />
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                { user.user_metadata?.full_name || 'No name set'}
              </h2>
              <p className="text-foreground">{user.email}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Full Name
              </label>
              <p className="text-foreground">
                { user.user_metadata?.full_name || 'Not provided'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Email
              </label>
              <p className="text-foreground">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                Account Created
              </label>
              <p className="text-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* GitHub Info (if available) */}
          {user.user_metadata?.user_name && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">
                GitHub Username
              </label>
              <p className="text-foreground">@{user.user_metadata.user_name}</p>
            </div>
          )}
        </div>
      </div>
      <div className="text-foreground font-sans pt-4 sm:pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 mb-8 shadow-lg border border-foreground">
            <h2 className="text-xl font-bold text-foreground mb-4">My Calculators</h2>
            <p>In the future you will be able to access your own created calculators here and the main page of course.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}