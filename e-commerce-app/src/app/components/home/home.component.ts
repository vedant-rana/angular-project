import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/data-types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPopularProducts().subscribe((products) => {
      this.popularProducts = products;
    });

    this.productService.getTrendyProducts().subscribe((products) => {
      this.trendyProducts = products;
    });
  }
}
