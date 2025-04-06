import { useEffect } from 'react';
import { router, useNavigationContainerRef } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/auth/login');
    }, 100); // Esperamos un poco para evitar el error

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
