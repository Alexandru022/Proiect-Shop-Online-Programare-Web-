import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    
   
    const credentials = btoa(`${username}:${password}`); 

  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

   
    return this.http.post(this.loginUrl, {}, { headers, withCredentials: true });
  }
}

