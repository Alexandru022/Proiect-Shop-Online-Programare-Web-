import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ClientDashboard } from './components/client-dashboard/client-dashboard';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'admin/dashboard', component: AdminDashboard }, 
  { path: 'client/dashboard', component: ClientDashboard },
  { path: '**', redirectTo: '' } 
];
// ... restul fișierului ...

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }