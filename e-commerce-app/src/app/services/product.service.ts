import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/data-types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data, {
      observe: 'response',
    });
  }

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProductById(id: string | undefined) {
    return this.http.delete<Product>(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }

  getPopularProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`);
  }

  getTrendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`);
  }
}
