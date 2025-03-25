import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/IProduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports:[CarouselModule,TranslateModule,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductService: ProductService = inject(ProductService)
  private _getProductByIdSubscription!: Subscription;

  product !:IProduct;
  
  customOptionsImages: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    rtl:true
  }
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct:string = params.get('id') !== null ? params.get('id')!:'';
          /* Call API */
          this._ProductService.getProductById(idProduct).subscribe({
            next: (res) => {
              console.log(res.data);
              this.product = res.data;
            },
            error: (error) => {
              console.log(error);
            }
          })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getLanguage() {
    return localStorage.getItem('lang') || 'en';
  }
  ngOnDestroy(): void {
    this._getProductByIdSubscription?.unsubscribe();
  }

}
