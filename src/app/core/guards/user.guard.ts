import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const role = localStorage.getItem('role');
    if (role !== 'SuperAdmin') {
      // Redirect to a different route if the user is not an admin
      return true; // or any other appropriate route
    } else {
      router.navigate(['noAuth']); // or any other appropriate route
    }
  }
  return true

  // Allow access by default (you might want to adjust this logic)
};
