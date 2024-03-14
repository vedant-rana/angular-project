import { CanActivateFn } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { inject } from '@angular/core';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  const sellerServices = inject(SellerService);

  if (localStorage.getItem("seller")) {
    return true;
  }

  return sellerServices.isSellerLoggedIn;
};
