import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
 
  const router = inject(Router); 
  
  
  const userRole = localStorage.getItem('userRole');

  
  const requiredRole = route.data['role'];

  
  if (userRole && userRole === requiredRole) {
   
    return true; 
  } else {
   
    console.error('Acces blocat de AuthGuard. Rol necesar:', requiredRole, 'Rol deținut:', userRole);
    router.navigate(['/']); 
    return false;
  }
};