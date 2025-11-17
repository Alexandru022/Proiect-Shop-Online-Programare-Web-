import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // Importăm 'tap'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  /**
   * Noua metodă de Login: Trimite un JSON, primește un token.
   */
  login(username: string, password: string): Observable<any> {
    
    // 1. Creăm corpul cererii (JSON-ul)
    const authRequest = {
      username: username,
      password: password
    };

    // 2. Trimitem cererea POST cu corpul JSON
    return this.http.post<any>(this.loginUrl, authRequest).pipe(
      // 3. Folosim 'tap' pentru a "spiona" răspunsul reușit
      //    și a salva token-ul și rolul înainte de a-l trimite componentei
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.saveRole(response.role);
          this.saveUsername(response.username);
        }
      })
    );
  }

  /**
   * Salvează token-ul JWT în localStorage
   */
  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Ia token-ul din localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Salvează rolul în localStorage
   */
  private saveRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  /**
   * Salvează username-ul în localStorage
   */
  private saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  /**
   * Log out: Șterge totul din localStorage
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  }
}