import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing-module';
import { App } from './app'; 
import { LoginComponent } from './components/login/login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ClientDashboard } from './components/client-dashboard/client-dashboard';
import { TokenInterceptor } from './services/token-interceptor';

@NgModule({
  declarations: [
    App 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    
    LoginComponent,
    AdminDashboard,
    ClientDashboard
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [App] 
})
export class AppModule { }