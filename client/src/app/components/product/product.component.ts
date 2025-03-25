import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/IProduct';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { _, TranslateModule } from '@ngx-translate/core';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TremPipe } from '../../core/pipes/trem.pipe';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-product',
  imports: [FormsModule,RouterLink,UpperCasePipe,CurrencyPipe, TremPipe,SearchPipe,TranslateModule,NgxPaginationModule],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly _ProductService: ProductService = inject(ProductService);
    private readonly _CartService: CartService = inject(CartService);
  getAllProductsSubscription!: Subscription; 
  getAllCategoriesSubscription!: Subscription;
  addProductToCartSubscription!: Subscription;
  keyword: WritableSignal<string> = signal('');
  products:WritableSignal<IProduct[]> = signal([]);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);

  ngOnInit() {
    // get all products
    this.getAllProductsSubscription = this._ProductService.getProducts().subscribe({
      next: (res: any) => {
        //this._ProductService.products = res.products;
        this.products.set(res.products);
        console.log(res.metaData);
        this.currentPage.set(res.metaData.currentPage);
        this.pageSize.set(res.metaData.limit);
        this.totalItems.set(res.results);
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

  pageChanged(pageNumber: number) {
    this._ProductService.getProducts(pageNumber).subscribe({
      next: (res: any) => {
        this.products.set(res.products);
        this.currentPage.set(res.metaData.currentPage);
        this.pageSize.set(res.metaData.limit);
        this.totalItems.set(res.results);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
  getLanguage() {
    return localStorage.getItem('lang') || 'en';
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription?.unsubscribe();
    this.addProductToCartSubscription?.unsubscribe();
  }

}
