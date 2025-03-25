import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory, IProduct } from '../../core/interfaces/IProduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/services/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, CarouselModule,TranslateModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _CategoryService: CategoryService = inject(CategoryService);
  products:WritableSignal<IProduct[]> = signal([]);
  categories:WritableSignal<ICategory[]> = signal([]);

  getAllProductsSubscription!: Subscription; 
  getAllCategoriesSubscription!: Subscription;
  addProductToCartSubscription!: Subscription;
  keyword: WritableSignal<string> = signal('');
  
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    rtl: true,
  }
  images: {id:number,image:string}[] = [
    {id:1,image: './assets/images/img1.avif'},
    {id:2,image: './assets/images/img2.avif'},
    {id:3,image: './assets/images/img3.avif'},
    {id:4,image: './assets/images/img4.avif'},
    {id:5,image: './assets/images/img5.avif'},
    {id:6,image: './assets/images/img6.avif'},
    {id:7,image: './assets/images/img7.avif'},
  ];
  

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false,
    rtl: true,
  }
  ngOnInit() {
    // get all categories
    this.getAllCategoriesSubscription = this._CategoryService.getCategories().subscribe({
      next: (res: any) => {
        //this._CategoryService.categories = res.categories;
        this.categories.set(res.categories);
        console.log(this.categories());
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  getLanguage() {
    return localStorage.getItem('lang') || 'en';
  }
  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe();
  }

}
