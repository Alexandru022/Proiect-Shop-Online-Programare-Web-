import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  private cartItems: Product[] = [];

  
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor() { }

  
  getCartUpdates() {
    return this.cartSubject.asObservable();
  }

  
  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
  }

  
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems);
  }

  
  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}