import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth'; // Sau './auth'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Ia token-ul din serviciul nostru
    const token = this.authService.getToken();

    // Verifică dacă token-ul există
    if (token) {
      // Clonează cererea și adaugă noul header 'Authorization'
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Acesta este formatul "Bearer"
        }
      });
    }

    // Trimite cererea clonată (cu sau fără token) mai departe
    return next.handle(request);
  }
}