import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importă componentele
import { LoginComponent } from './components/login/login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ClientDashboard } from './components/client-dashboard/client-dashboard';
    
// 1. IMPORTĂ NOUA GARDĂ FUNCȚIONALĂ
import { authGuard } from './services/auth-guard'; // <-- Numele funcției, nu al clasei

const routes: Routes = [
  { path: '', component: LoginComponent },
  
  // 2. APLICĂ GARDA FUNCȚIONALĂ
  { 
    path: 'admin/dashboard', 
    component: AdminDashboard,
    canActivate: [authGuard], // <-- Folosește funcția 'authGuard'
    data: { role: 'ROLE_ADMIN' } 
  },
  
  { 
    path: 'client/dashboard', 
    component: ClientDashboard,
    canActivate: [authGuard], // <-- Folosește funcția 'authGuard'
    data: { role: 'ROLE_CLIENT' }
  },
  
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }