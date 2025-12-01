'use client';

import { Container, Box } from '@mui/material';
import { use, useEffect } from 'react';
import ProtectedRoute from '@/common/components/ProtectedRoute';
import Navbar from '@/common/components/Navbar';
import Footer from '@/common/components/Footer';
import {ProductDetail} from '@/features/products/components/ProductDetail';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/common/utils/constants';

export default function Home() {
  const router = useRouter();
  // const { isAuthenticated,initAuth } = useAuthStore();

  // useEffect(() => {
  //   // Initialize auth state from localStorage on mount
  //   initAuth();
  // }, [initAuth]);

  useEffect(() => {
  //   // if (isAuthenticated) {
  //   // }
    router.push(ROUTES.DASHBOARD);
  }, []);

  return null;
}
