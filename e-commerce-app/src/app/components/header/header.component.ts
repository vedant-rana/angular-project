import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  menuType:string ='default';
  sellerName:string='';

  constructor(private  router: Router) {}

  ngOnInit():void{
    this.router.events.subscribe((data:any)=>{
      if(data.url){
        if(localStorage.getItem('seller') && data.url.includes('seller')){
          let seller= localStorage.getItem('seller');
          this.sellerName= seller &&  JSON.parse(seller)[0].name;
          this.menuType='seller';
        }else{
          this.menuType = 'default';
        }
      }
    })
  }


  logout():void{
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
  }
}
