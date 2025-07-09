"use client";

import { useAuth } from './auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      return null; // or a loading spinner
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;