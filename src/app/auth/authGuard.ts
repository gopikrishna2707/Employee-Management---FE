import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH_LOGIN } from '../app.routes';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (!localStorage.getItem('jwt')) {
    snackBar.open('Please login to access content', 'close', {
      duration: 3000,
      panelClass: 'snackbar-failure',
    });
    router.navigate([PATH_LOGIN]);
    return false;
  }

  return true;
};
