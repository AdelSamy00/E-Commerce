import { Component, inject, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/ICart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService: CartService = inject(CartService)

  /* cartDetails: ICart = {} as ICart; */
  cartDetails:WritableSignal<ICart> = signal<ICart>({} as ICart);

  getCartSubscription!: Subscription
  removeProductFromCartSubscription!: Subscription
  updateQuantitySubscription!: Subscription
  clearCartSubscription!: Subscription
  ngOnInit(): void {
    this.getCartSubscription = this._CartService.getCart().subscribe({
      next: (res: any) => {
        this.cartDetails.set(res.cart);
        console.log(this.cartDetails);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }


  removeProductFromCart(productId: string):void {
    this.removeProductFromCartSubscription = this._CartService.removeItemFromCart(productId).subscribe({
      next: (res: any) => {
        this.cartDetails.set(res.cart);
        this._CartService.cartCount.set(res.cart.cart.length) ;

      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  updateQuantity(productId: string, quantity: number):void {
    this.updateQuantitySubscription = this.removeProductFromCartSubscription = this._CartService.updateCart(productId, quantity).subscribe({
      next: (res: any) => {
        this.cartDetails.set(res.cart);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  clearCart():void {
    this.clearCartSubscription = this._CartService.deleteCart().subscribe({
      next: (res: any) => {
        this.cartDetails.set(res.cart);
        this._CartService.cartCount.set(0);
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
    this.getCartSubscription?.unsubscribe();
    this.removeProductFromCartSubscription?.unsubscribe();
    this.updateQuantitySubscription?.unsubscribe();
    this.clearCartSubscription?.unsubscribe();
  }
}
