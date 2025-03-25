import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private _FormBuilder = inject(FormBuilder);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _OrdersService = inject(OrdersService);
  private _Router = inject(Router);
  private _Toster = inject(ToastrService);

  cartId:string = '';

  orderForm = this._FormBuilder.group({
    details: [null,[Validators.required]],
    phone: [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null,[Validators.required]],
  });


  cashPayment() {
    console.log(this.orderForm.value);
    this._OrdersService.cashPayment(this.orderForm.value,this.cartId).subscribe({
      next: (res) => {
        console.log(res);
        if(res.success === true){
          this._Toster.success(res.message,'Success');
          this._Router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onlinePayment() {
    this._OrdersService.onlinePayment(this.orderForm.value,this.cartId).subscribe({
      next: (res) => {
        console.log(res);
        if(res.success === true){
          window.open(res.clientSecret.url,'_self');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => {
        this.cartId = params.get('cartId') !== null ? params.get('cartId')!:'';
      }
    })
  }

}
