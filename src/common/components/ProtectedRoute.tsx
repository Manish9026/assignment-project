'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/features/auth/store/authStore';

// import Loader from './Loader';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();
//   const { isAuthenticated } = useAuthStore();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return <Loader />;
//   }

//   return <>{children}</>;
// }


import { useAuthStore } from '@/features/auth/store/authStore';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { ROUTES } from '../utils/constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute component
 * Wraps routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, initAuth } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    // Initialize auth state from localStorage on mount
    // initAuth(); 
    // 
    if (isAuthenticated === false) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated]);



  return <>{children}</>;
};