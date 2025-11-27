import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login'; 
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard'; 
import { ClientDashboard } from './components/client-dashboard/client-dashboard';
import { CartComponent } from './components/cart/cart'; 


import { authGuard } from './services/auth-guard'; 

const routes: Routes = [
  
  { path: '', component: LoginComponent },

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
 
  { 
    path: 'admin/dashboard', 
    component: AdminDashboard,
    canActivate: [authGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  
  
  { 
    path: 'client/dashboard', 
    component: ClientDashboard,
    canActivate: [authGuard],
    data: { role: 'ROLE_CLIENT' } 
  },

 
  { 
    path: 'cart', 
    component: CartComponent, 
    canActivate: [authGuard],
    data: { role: 'ROLE_CLIENT' } 
  },
  
  
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }