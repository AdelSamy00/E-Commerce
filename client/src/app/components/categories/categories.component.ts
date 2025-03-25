import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Subscription } from 'rxjs';
import { ICategory, IProduct } from '../../core/interfaces/IProduct';
import { ProductService } from '../../core/services/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { TremPipe } from '../../core/pipes/trem.pipe';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-categories',
  imports: [FormsModule,RouterLink,UpperCasePipe,CurrencyPipe, TremPipe,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _CategoryService: CategoryService = inject(CategoryService);
  private readonly _ProductService: ProductService = inject(ProductService);
  private readonly _CartService: CartService = inject(CartService);
  getAllCategoriesSubscription!: Subscription;
  addProductToCartSubscription!: Subscription;
  categories:WritableSignal<ICategory[]> = signal([]);
  products:WritableSignal<IProduct[]> = signal([]);
  @ViewChild('productsSection') ProductsSections!: ElementRef;

  ngOnInit() {
    this.getAllCategoriesSubscription = this._CategoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res.categories);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getProductsByCategory(categoryId: string) {
    this._ProductService.getProducts(1,8,categoryId).subscribe({
      next: (res: any) => {
        console.log(res.products);
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
    this.getAllCategoriesSubscription?.unsubscribe();
    this.addProductToCartSubscription?.unsubscribe();
  }
}
