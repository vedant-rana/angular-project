import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../Models/data-types';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productCreationMessage : string |undefined;

  constructor(private productService:ProductService){}

  addProducts(form:NgForm, data : Product){
    this.productService.createProduct(data).subscribe((result) => {
      if(result){
        this.productCreationMessage=`Product created Successfully`;
        form.reset();
      }

      setTimeout(() => {
        this.productCreationMessage=undefined;
      }, 3000);
    })
  }

}
