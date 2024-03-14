import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/data-types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  productData: Product | undefined;

  constructor(private route: ActivatedRoute ,private productService: ProductService, private router : Router){}

  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id');
    if(productId){
      this.productService.getProductById(productId).subscribe((res) =>{
        this.productData = res;
      });
    }else{
      this.router.navigate(['seller-home']);
    }
  }

  updateProduct(data : Product){

    if(this.productData){
      data.id=this.productData?.id!;
    }

    this.productService.updateProduct(data).subscribe((res)=>{
      if(res){
        this.router.navigate(['seller-home']);
      }
    })
  }
}
