import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  if (role !== 'SystemUser') {
    return false;
  }
  return true;
};
