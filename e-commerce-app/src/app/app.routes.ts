import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { sellerAuthGuard } from './guards/seller-auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'seller-auth', component:SellerAuthComponent},
    {path: 'seller-home', component:SellerHomeComponent, canActivate:[sellerAuthGuard]},
    {path: 'seller-add-product', component:AddProductComponent, canActivate:[sellerAuthGuard]},
    {path: 'seller-update-product/:id', component:SellerUpdateProductComponent, canActivate:[sellerAuthGuard]},
    {path: 'search/:query', component:SearchProductsComponent},
    {path: 'details/:id', component:ProductDetailsComponent},
    {path: 'user-auth', component:UserAuthComponent},
];
