import { useAuth0 } from '@auth0/auth0-react';

export function useUser() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    email: user?.email,
    name: user?.name,
    picture: user?.picture,
    sub: user?.sub,
  };
}
