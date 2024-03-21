import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/data-types';

@Component({
  selector: 'app-search-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-products.component.html',
  styleUrl: './search-products.component.css'
})

export class SearchProductsComponent {
searchProducts : Product[] | undefined;

constructor(private activeRoute : ActivatedRoute, private productService : ProductService){
  this.setSearchProducts();
}

setSearchProducts() {
  this.activeRoute.paramMap.subscribe((params)=>{
    let query = params.get('query');
    if(query){
      this.productService.getSerchedProducts(query).subscribe(res=>{
        this.searchProducts = res;
      })
    }else{
      this.searchProducts = undefined;
    }
  });
}
}
