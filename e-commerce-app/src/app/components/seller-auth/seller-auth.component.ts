import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../../Models/data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  showLogin: boolean = false;
  errorMessage: string = '';

  constructor(private seller: SellerService, private router: Router) { }


  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    console.log(data);
    this.seller.sellerSignUp(data);
  }

  login(data: Login): void {
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.errorMessage = "Invalid username or password";
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
