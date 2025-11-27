import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

// Material Design
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Cont creat cu succes! Redirecționare...';
        // Așteptăm 2 secunde să vadă mesajul, apoi mergem la login
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        // Dacă userul există deja, backend-ul trimite 400 Bad Request
        if (err.status === 400) {
          this.errorMessage = err.error; // Mesajul de la backend
        } else {
          this.errorMessage = 'Eroare la înregistrare. Încearcă din nou.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}