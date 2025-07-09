"use client";

import { useAuth } from './auth';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const Auth = (props: P) => {
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