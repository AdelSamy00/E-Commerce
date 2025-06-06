import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService: TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID: Injectable = inject(PLATFORM_ID)
  private readonly _Renderer2: Renderer2 = inject(RendererFactory2).createRenderer(null,null)
  constructor() { 
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._TranslateService.setDefaultLang('en');
      this.setLang();
    }
    
  }
  setLang() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let lang = localStorage.getItem('lang');
      if(lang === null) lang = 'en';
      this._TranslateService.use(lang !);
      if(lang === 'en'){
        this._Renderer2.setAttribute(document.documentElement,'dir','ltr');
      this._Renderer2.setAttribute(document.documentElement,'lang','en');
      }else if(lang === 'ar'){
        this._Renderer2.setAttribute(document.documentElement,'dir','rtl');
      this._Renderer2.setAttribute(document.documentElement,'lang','ar');
      } 
    }
  }

  changeLang(lang:string){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang',lang);
      this.setLang();
    }
  }
}
