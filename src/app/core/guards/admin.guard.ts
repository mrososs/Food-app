import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const role = localStorage.getItem('role');
    if (role !== 'SuperAdmin') {
      // Redirect to a different route if the user is not an admin
      router.navigate(['/']); // or any other appropriate route
      return false;
    }
  }

  // Allow access by default (you might want to adjust this logic)
  return true;
};
