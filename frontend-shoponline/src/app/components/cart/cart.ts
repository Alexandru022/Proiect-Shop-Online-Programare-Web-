import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';
import { Router } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  items: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
   
    this.cartService.getCartUpdates().subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  checkout(): void {
    if (this.items.length > 0) {
      alert('Comanda a fost plasată cu succes!');
      this.cartService.clearCart();
      this.router.navigate(['/client/dashboard']);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/client/dashboard']);
  }
}