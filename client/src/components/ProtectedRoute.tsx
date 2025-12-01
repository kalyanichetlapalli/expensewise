import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const hasTriggeredLogin = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasTriggeredLogin.current) {
      hasTriggeredLogin.current = true;
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname
        }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
