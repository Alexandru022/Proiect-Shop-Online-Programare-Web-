import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }


  register(username: string, password: string): Observable<any> {
    const registerData = {
      username: username,
      password: password
    };
    
    return this.http.post(`${this.loginUrl.replace('/login', '/register')}`, registerData, { responseType: 'text' });
    
  }

  
  login(username: string, password: string): Observable<any> {
    
    
    const authRequest = {
      username: username,
      password: password
    };

    
    return this.http.post<any>(this.loginUrl, authRequest).pipe(
      
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.saveRole(response.role);
          this.saveUsername(response.username);
        }
      })
    );
  }

 
  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

 
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

 
  private saveRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  private saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

 
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  }
}