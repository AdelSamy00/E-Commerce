import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  styleUrls: ['./nav-admin.component.scss']
})
export class NavAdminComponent implements OnInit {
  readonly _AuthService:AuthService = inject(AuthService);
  readonly _MyTranslateService:MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService:TranslateService = inject(TranslateService);
  change(lang:string):void{
    this._MyTranslateService.changeLang(lang);
  }

  ngOnInit() {
  }

}
