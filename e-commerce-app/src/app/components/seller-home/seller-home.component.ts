import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/data-types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productAlterMessage: string | undefined;
  productList: Product[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  deleteProduct(id: string | undefined) {
    this.productService.deleteProductById(id).subscribe((result) => {
      if (result) {
        this.productAlterMessage = `Product : ${result.name} is Deleted Successfully !`;
        this.getProductList();
      }
      setTimeout(() => this.productAlterMessage = undefined, 3000);
    })
  }

  getProductList() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;
    });
  }

}
