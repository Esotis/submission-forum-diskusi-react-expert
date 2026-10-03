import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../states/auth/authSlice';
import Spinner from '../Spinner/Spinner';

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Spinner label="Mengalihkan ke halaman masuk..." />;
  }

  return children;
}

export default ProtectedRoute;
