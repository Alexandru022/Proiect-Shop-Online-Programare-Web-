import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth'; // Pentru logout
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Avem nevoie de formulare și liste
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  products: Product[] = []; // Lista de produse
  
  // Obiectul pentru formularul de adăugare
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Se apelează automat când se încarcă pagina
  ngOnInit(): void {
    this.loadProducts();
  }

  // Încarcă produsele de la backend
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Eroare la încărcarea produselor:', err)
    });
  }

  // Adaugă un produs
  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: (product) => {
        // Adăugăm produsul nou în listă
        this.products.push(product);
        // Resetăm formularul
        this.newProduct = { name: '', description: '', price: 0, imageUrl: '' };
        alert('Produs adăugat cu succes!');
      },
      error: (err) => alert('Eroare la adăugare!')
    });
  }

  // Șterge un produs
  deleteProduct(id: number): void {
    if(confirm('Sigur vrei să ștergi acest produs?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Scoatem produsul din listă local
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => alert('Eroare la ștergere!')
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}