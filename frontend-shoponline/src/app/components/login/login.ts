import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
      this.errorMessage = ''; 

      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => { 
            
            if (response.role === 'ROLE_ADMIN') {
                this.router.navigate(['/admin/dashboard']);
            } else {
                this.router.navigate(['/client/dashboard']);
            }
        },
        error: (err: any) => {
            
            if (err.status === 401) {
              this.errorMessage = 'Nume de utilizator sau parolă incorectă.';
            } else {
              this.errorMessage = 'A apărut o eroare de conectare.';
            }
            console.error(err);
        }
      });
  }

  
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}