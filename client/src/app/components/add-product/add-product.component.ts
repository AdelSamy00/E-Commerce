import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/interfaces/IProduct';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _CategoryService: CategoryService = inject(CategoryService);
  private readonly _BrandService: BrandService = inject(BrandService);
  getAllBrandsSubscription!: Subscription;
  getAllCategoriesSubscription!: Subscription;
  categories:WritableSignal<ICategory[]> = signal([]);
  brands:WritableSignal<ICategory[]> = signal([]);
  productImages: File[] = [];
  coverImage!: File;


  ngOnInit(): void {
    this.getAllCategoriesSubscription = this._CategoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res.categories);
        console.log(this.categories());
      },
      error: (error: any) => {
        console.error(error);
      }
    });

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

  addProductForm= this._FormBuilder.group({
    title: [null,[Validators.required]],
    title_ar: [null,[Validators.required]],
    slug: [null,[Validators.required]],
    slug_ar: [null,[Validators.required]],
    description: [null,[Validators.required]],
    description_ar: [null,[Validators.required]],
    quantity: [null,[Validators.required,Validators.min(1)]],
    price: [null,[Validators.required,Validators.min(1)]],
    category: [null,[Validators.required]], // ICategory
    brand: [null,[Validators.required]], // IBrand
  });

  onImageChange(event: any) {
    this.productImages = [...event.target.files];
    console.log(this.productImages);
  }

  onCoverImageChange(event: any) {
    this.coverImage = event.target.files[0];
    console.log(this.coverImage);
  }

  addProduct(){
    //console.log(this.addProductForm.value);
    if(this.addProductForm.valid && this.productImages.length > 0 && this.coverImage) {
      console.log(this.addProductForm.value);
      console.log(this.productImages);
      console.log(this.coverImage);
      const formData = new FormData();
      formData.append('body', JSON.stringify(this.addProductForm.value));
      formData.append('coverImage', this.coverImage);
    }else{
      this.addProductForm.markAllAsTouched();
    }
  }
}
