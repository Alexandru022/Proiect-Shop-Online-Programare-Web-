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
            this.errorMessage = 'Autentificare eșuată. Utilizator sau parolă incorectă.';
          } else {
            this.errorMessage = 'A apărut o eroare la conectare.';
          }
          console.error(err);
        }
    });
  }
}