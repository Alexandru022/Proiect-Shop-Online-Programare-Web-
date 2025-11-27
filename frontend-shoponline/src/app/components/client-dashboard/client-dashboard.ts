import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule], // Nu avem nevoie de FormsModule aici (doar afișăm)
  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboard implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Nu am putut încărca produsele', err)
    });
  }

  // Funcție simulată pentru coșul de cumpărături
  addToCart(product: Product): void {
    alert(`Ai adăugat "${product.name}" în coș!`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}