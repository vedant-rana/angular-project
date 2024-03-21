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
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
productData : Product | undefined;
productQuantity: number;

constructor(private activeRoute: ActivatedRoute ,private  productService : ProductService) {
  this.productQuantity = 1;
}

ngOnInit():void{
  let productId = this.activeRoute.snapshot.paramMap.get('id');
  if(productId){
    this.productService.getProductById(productId).subscribe(res=>{
      this.productData = res;
    })
  }
}

handleQuantitiy(operation:string){
if(operation == "sub" && this.productQuantity > 1){
  this.productQuantity-=1;
}else if(operation == "add" && this.productQuantity<20){
  this.productQuantity+=1;
}
}


addToCart(){
  if(this.productData){
    this.productData.quantity = this.productQuantity;
    this.productService.localAddToCart(this.productData);
    this.productQuantity= 1;
  }
}
}
