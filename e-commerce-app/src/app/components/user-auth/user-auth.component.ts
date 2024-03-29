import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, SignUp } from '../../Models/data-types';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  userLogin:boolean = false
  errorMessage: string = '';

  constructor(private userService: UserService, private productService: ProductService){}

  ngOnInit(){
    this.userService.userLoginReload();
  };

  signUp(data:SignUp){
    this.userService.signUpUser(data);
  }

  login(data:Login){
    this.userService.userLogin(data);
    this.userService.userAuthStatus.subscribe((status) =>{
      if(!status){
        this.errorMessage='Invalid Credentials';
      }else{
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin(){
    this.userLogin = true;
  }

  openSignUp(){
    this.userLogin = false;
  }


  localCartToRemoteCart(){
    let localCart = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');

    if(localCart && user){
      let localCartList : Product[]  = JSON.parse(localCart);

      let userId = user &&  JSON.parse(user).id;

      localCartList.forEach((product:Product, index)=>{
        let remoteCart : Cart = {
          ...product,
          userId:userId,
          productId : product.id,
        }
        delete remoteCart.id;

        this.productService.addToCart(remoteCart).subscribe(res=>{
        })

        if(localCartList.length === index+1){
          localStorage.removeItem('localCart');
        }
      })

    }
    let userId = user &&  JSON.parse(user).id;
    this.productService.getCartListFromDB(userId);

  }
}
