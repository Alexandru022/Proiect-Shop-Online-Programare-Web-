import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart';
import { FormsModule } from '@angular/forms'; 


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    MatInputModule, 
    MatFormFieldModule
  ],
  templateUrl: './client-dashboard.html',
  styleUrls: ['./client-dashboard.css']
})
export class ClientDashboard implements OnInit {

  allProducts: Product[] = []; 
  filteredProducts: Product[] = []; 
  
  cartCount = 0;
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    
    this.cartService.getCartUpdates().subscribe(items => {
      this.cartCount = items.length;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filteredProducts = data; 
      },
      error: (err) => console.error('Eroare încărcare produse', err)
    });
  }


  applyFilter(): void {
    const text = this.searchText.toLowerCase();
    
    this.filteredProducts = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(text) || 
      product.description.toLowerCase().includes(text)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}