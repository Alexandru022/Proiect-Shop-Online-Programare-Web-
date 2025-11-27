import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Product } from '../../models/product';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; 
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
   
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  products: Product[] = [];
  currentProduct: Product = { name: '', description: '', price: 0, imageUrl: '' };
  isEditing: boolean = false;

  constructor(
    private productService: ProductService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }

  saveProduct(): void {
    if (this.isEditing) {
      this.productService.updateProduct(this.currentProduct.id!, this.currentProduct).subscribe({
        next: () => {
          alert('Produs actualizat!');
          this.resetForm();
          this.loadProducts();
        },
        error: () => alert('Eroare la actualizare')
      });
    } else {
      this.productService.createProduct(this.currentProduct).subscribe({
        next: (product) => {
          this.products.push(product);
          alert('Produs adăugat!');
          this.resetForm();
        },
        error: () => alert('Eroare la adăugare')
      });
    }
  }

  startEdit(product: Product): void {
    this.isEditing = true;
    this.currentProduct = { ...product };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteProduct(id: number): void {
    if(confirm('Ștergi produsul?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.products = this.products.filter(p => p.id !== id),
        error: () => alert('Eroare la ștergere')
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentProduct = { name: '', description: '', price: 0, imageUrl: '' };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}