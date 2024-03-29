import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../Models/data-types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();

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

  getSerchedProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?category=${query}`
    );
  }

  localAddToCart(data: Product) {
    let localCartData: Product[] = [];
    let localStorageCartData = localStorage.getItem('localCart');

    if (!localStorageCartData) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      localCartData = JSON.parse(localStorageCartData);

      localCartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(localCartData));
    }
    this.cartData.emit(localCartData);


    // let localStorageCartData = localStorage.getItem('localCart') ? JSON.parse(localStorage.getItem('localCart')) : [];
  }

  localRemoveFromCart(data: Product) {
    let localCartData: Product[] = [];
    let localStorageCartData = localStorage.getItem('localCart');

    if (localStorageCartData) {
      localCartData = JSON.parse(localStorageCartData);
      localCartData = localCartData.filter((item) => item.id !== data.id);
      localStorage.setItem('localCart', JSON.stringify(localCartData));
    }
    this.cartData.emit(localCartData);
  }


  addToCart(cartData:Cart){
    return this.http.post('http://localhost:3000/cart', cartData, {
      observe:'response',
    });
  }


  getCartListFromDB(userId: string){
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {observe: 'response'}).subscribe(data =>{
      if(data && data.body){
        this.cartData.emit(data.body);
      }
    });
  }
}
