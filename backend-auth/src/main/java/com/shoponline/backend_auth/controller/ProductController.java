package com.shoponline.backend_auth.controller;

import com.shoponline.backend_auth.model.Product;
import com.shoponline.backend_auth.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // 1. GET - Obține toate produsele (pentru magazin)
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. POST - Adaugă un produs nou (cu Debugging inclus)
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            System.out.println("--- Încercare salvare produs ---");
            System.out.println("Nume: " + product.getName());
            System.out.println("Preț: " + product.getPrice());
            
            // Salvează în baza de date PostgreSQL
            Product savedProduct = productRepository.save(product);
            
            System.out.println("--- SUCCES! Produs salvat cu ID: " + savedProduct.getId());
            return ResponseEntity.ok(savedProduct);
            
        } catch (Exception e) {
            System.out.println("!!! EROARE CRITICĂ LA SALVARE !!!");
            e.printStackTrace(); // Ne va arăta eroarea în consolă
            return ResponseEntity.internalServerError().body("Eroare: " + e.getMessage());
        }
    }

    // 3. DELETE - Șterge un produs
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        // Verificăm întâi dacă produsul există
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}