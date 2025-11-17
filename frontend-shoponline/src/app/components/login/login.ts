import { Component } from '@angular/core';
import { AuthService } from '../../services/auth'; // Calea ta e corectă
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html', 
  styleUrls: ['./login.css'], 
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule 
  ] 
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = ''; 

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.errorMessage = ''; 

    // Serviciul 'authService.login()' a fost actualizat (la Pasul 1)
    // Acum trimite JSON și salvează token-ul automat (datorită 'tap')
    this.authService.login(this.username, this.password).subscribe({
      
        next: (response: any) => { 
          // Răspunsul conține { token: "...", role: "...", username: "..." }
          // Serviciul a salvat deja totul în localStorage.
          // Trebuie doar să redirecționăm.

          // --- MODIFICARE CRUCIALĂ ---
          // Backend-ul (JwtUtil) trimite acum rolul complet, ex: "ROLE_ADMIN"
          if (response.role === 'ROLE_ADMIN') { 
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/client/dashboard']);
          }
        },
        
        error: (err: any) => { 
          // Răspunsul de eroare de la backend-ul JWT este acum text simplu
          if (err.status === 401) {
            this.errorMessage = 'Autentificare eșuată. Utilizator sau parolă incorectă.';
          } else {
            this.errorMessage = 'A apărut o eroare la conectare.';
          }
          console.error(err);
        }
    });
  }
}