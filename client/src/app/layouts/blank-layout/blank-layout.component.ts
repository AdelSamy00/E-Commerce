import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavAdminComponent } from "../../components/nav-admin/nav-admin.component";
import { IUser } from '../../core/interfaces/IUser';

@Component({
  selector: 'app-blank-layout',
  imports: [NavBlankComponent, RouterOutlet, FooterComponent, NavAdminComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent implements OnInit {
  readonly _AuthService: AuthService = inject(AuthService);
  userData:WritableSignal<IUser>= signal({} as IUser);
  getUserData():void{
    this._AuthService.getUserData().subscribe({
      next: (result) => {
        console.log(result.user);
        this.userData.set(result.user);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
  ngOnInit(): void {
    this.getUserData();
  }

}
