import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';
import { ICategory, IProduct } from '../../core/interfaces/IProduct';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TremPipe } from '../../core/pipes/trem.pipe';

@Component({
  selector: 'app-brands',
  imports: [RouterLink,UpperCasePipe,CurrencyPipe,TremPipe,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandService: BrandService = inject(BrandService);
  private readonly _CartService: CartService = inject(CartService);
  getAllBrandsSubscription!: Subscription;
  addProductToCartSubscription!: Subscription;

  @ViewChild('productsSection') ProductsSections!: ElementRef;
  brands: WritableSignal<ICategory[]> = signal([]);
  products: WritableSignal<IProduct[]> = signal([]);

  ngOnInit() {
    this.getAllBrandsSubscription = this._BrandService.getBrands().subscribe({
      next: (res: any) => {
        console.log(res.brands);
        this.brands.set(res.brands);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  getProductsByBrand(brandId: string) {
    this._BrandService.getProductsForSpecificBrand(1,8,brandId).subscribe({
      next: (res: any) => {
        this.products.set(res.products);
        this.ProductsSections.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  } 

  addProductToCart(productId: string) {
    this.addProductToCartSubscription = this._CartService.addToCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this._CartService.cartCount.set(res.userCart.cart.length);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getLanguage() {
    return localStorage.getItem('lang') || 'en';
  }

  ngOnDestroy() {
    this.getAllBrandsSubscription.unsubscribe();
  }
}
