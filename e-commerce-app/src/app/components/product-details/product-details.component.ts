import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productData: Product | undefined;
  productQuantity: number;

  removeCartEnable: Boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productQuantity = 1;
  }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((res) => {
        this.productData = res;
      });

      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        let items = JSON.parse(cartData);

        items = items.filter((item: Product) => item.id === productId);

        if (items.length) {
          this.removeCartEnable = true;
        } else {
          this.removeCartEnable = false;
        }
      }
    }
  }

  handleQuantitiy(operation: string) {
    if (operation == 'sub' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    } else if (operation == 'add' && this.productQuantity < 20) {
      this.productQuantity += 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      this.productService.localAddToCart(this.productData);
      this.productQuantity = 1;
      this.removeCartEnable = true;
    }
  }

  removeFromCart() {
    if (this.productData) {
      this.productService.localRemoveFromCart(this.productData);
      this.removeCartEnable = false;
    }
  }
}
