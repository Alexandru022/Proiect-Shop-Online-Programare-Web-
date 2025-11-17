import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  // Injectăm serviciul Router
  const router = inject(Router); 
  
  // Preluăm rolul utilizatorului din localStorage
  const userRole = localStorage.getItem('userRole');

  // Preluăm rolul cerut de rută (din app-routing-module.ts)
  const requiredRole = route.data['role'];

  // Verificăm dacă utilizatorul are rolul necesar
  if (userRole && userRole === requiredRole) {
    // Dacă are rolul corect (ex: 'ADMIN' === 'ADMIN'), permitem accesul
    return true; 
  } else {
    // Dacă nu, îl redirecționăm la pagina de login
    console.error('Acces blocat de AuthGuard. Rol necesar:', requiredRole, 'Rol deținut:', userRole);
    router.navigate(['/']); // Redirecționează la rădăcină (login)
    return false;
  }
};