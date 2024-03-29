import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../../Models/data-types';
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

      let user = localStorage.getItem('user');
      if(user ){
        let userId = user && JSON.parse(user).id;
        this.productService.getCartListFromDB(userId);

        this.productService.cartData.subscribe((cartProducts)=>{
          let needToRemoveCart = cartProducts.filter((prod:Product)=> productId === prod.productId);

          if(needToRemoveCart){
            this.removeCartEnable = true;
          }
        })
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

      if(!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.productQuantity = 1;
        this.removeCartEnable = true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData:Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }

        delete cartData.id;

        this.productService.addToCart(cartData).subscribe(data => {
          if(data){
            this.productService.getCartListFromDB(userId);
            this.removeCartEnable=true;
          }
        });

      }
    }
  }

  removeFromCart() {
    if (this.productData) {
      this.productService.localRemoveFromCart(this.productData);
      this.removeCartEnable = false;
    }
  }
}
