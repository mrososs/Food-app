import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('role');
    if (!role) {
      router.navigate(['/auth']);
      return false;
    }
  }
  return true;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('role');
    if (role) {
      router.navigate(['/dashboard']);
      return false;
    }
  }
  return true;
};
