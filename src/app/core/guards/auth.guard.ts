import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (!role) {
    router.navigate(['/auth']);
  }
  return true;
};

export const loginGuard:CanActivateFn=(route,state)=>{
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (role) {
    router.navigate(['/dashboard']);
  }
  return true;
}