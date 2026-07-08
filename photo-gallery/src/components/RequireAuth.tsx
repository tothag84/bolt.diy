import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/store';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useAuth((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
