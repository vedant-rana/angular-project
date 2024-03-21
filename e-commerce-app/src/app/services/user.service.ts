import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../Models/data-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthStatus = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router:Router) { }

  signUpUser(data: SignUp){
    return this.http
   .post('http://localhost:3000/users', data, { observe:'response' })
   .subscribe((result) => {
        if(result){
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data: Login){
    return this.http
    .get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe: 'response'})
    .subscribe((result:any) =>{
      if(result && result.body && result.body.length){
        this.userAuthStatus.emit(true);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }else{
        this.userAuthStatus.emit(false);
        this.router.navigate(['/login']);
      }
    })
  }

  userLoginReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
