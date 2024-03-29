import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLoggedIn()) {
    if (state.url.includes('/auth/')) {
      router.navigate(['dashboard']);
    }
    return true;
  }
  tokenService.removeToken();
  router.navigate(['/auth/login']);
  return false;
};
