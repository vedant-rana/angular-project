import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'seller-auth', component:SellerAuthComponent},
];
