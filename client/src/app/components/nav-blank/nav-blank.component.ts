import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
  readonly _AuthService:AuthService = inject(AuthService);
  readonly _CartService:CartService = inject(CartService);
  private readonly _MyTranslateService:MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService:TranslateService = inject(TranslateService);

  cartCount:Signal<number> = computed(() => this._CartService.cartCount());


  change(lang:string):void{
    this._MyTranslateService.changeLang(lang);
  }
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (result) => {
        console.log(result);
        this._CartService.cartCount.set(result.cart.cart.length);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
