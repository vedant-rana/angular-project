import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, SignUp } from '../../Models/data-types';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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

  constructor(private userService: UserService){}

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
      }
    });
  }

  openLogin(){
    this.userLogin = true;
  }

  openSignUp(){
    this.userLogin = false;
  }
}
