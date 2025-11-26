/*
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {

    const rol = localStorage.getItem('rol');

    if (!rol) {
      this.router.navigate(['/']);
      return false;
    }

    const rolesPermitidos = route.data?.['roles'] as string[];

    if (!rolesPermitidos) return true;

    if (rolesPermitidos.includes(rol)) return true;

    this.router.navigate(['/dashboard']);
    return false;
  }

}
*/

// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RoleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const rol = Number(localStorage.getItem('rol')); // 🔴 IMPORTANTE: convertir a número

  if (!rol) {
    router.navigate(['/']);
    return false;
  }

  const rolesPermitidos = route.data?.['roles'] as number[];

  if (!rolesPermitidos) return true;

  if (rolesPermitidos.includes(rol)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
