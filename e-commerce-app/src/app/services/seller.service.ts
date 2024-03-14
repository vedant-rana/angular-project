import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../Models/data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  sellerSignUp(data: SignUp) {
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      })
  }


  sellerLogin(data:Login){
    return this.http
      .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result:any) => {
        if(result && result.body && result.body.length){
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
        }else{
          this.isLoginError.emit(true);
        }
        
      })
  }

  
  reloadSeller() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem("seller")) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    }
  }
}
