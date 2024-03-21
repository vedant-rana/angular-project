import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/data-types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchedProducts: Product[] | undefined;
  cartItems: number = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((data: any) => {
      if (data.url) {
        if (localStorage.getItem('user')) {
          let user = localStorage.getItem('user');
          this.userName = user && JSON.parse(user).name;

          this.menuType = 'user';
        } else if (
          localStorage.getItem('seller') &&
          data.url.includes('seller')
        ) {
          let seller = localStorage.getItem('seller');
          this.sellerName = seller && JSON.parse(seller)[0].name;
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.productService.cartData.subscribe((cartData) => {
      this.cartItems = cartData.length;
    });
  }

  sellerLogout(): void {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }

  resirectToDetails(id: string | undefined): void {
    // console.log(id);

    this.router.navigate([`/details/${id}`]);
  }

  getSerachedProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value !== undefined) {
        this.productService
          .getSerchedProducts(element.value)
          .subscribe((res) => {
            if (res.length > 5) {
              res.length = 5;
            }
            this.searchedProducts = res;
          });
      }
    }
  }

  hideSearch() {
    this.searchedProducts = undefined;
  }

  submitSearch(query: string) {
    this.router.navigate([`search/${query}`]);
  }
}
