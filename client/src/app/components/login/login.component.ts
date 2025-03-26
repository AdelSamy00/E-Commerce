import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgClass,RouterLink,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService: AuthService = inject(AuthService);
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _Router: Router = inject(Router);
  private readonly _Toster: ToastrService = inject(ToastrService);

  ErrorMsg: string = '';
  isLoading: boolean = false;

  /* ------ form builder --------- */
  loginForm = this._FormBuilder.group({
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  });


  onSubmit() {
    this.isLoading = true;
    if(this.loginForm.valid) {
      this._AuthService.loginSubmit(this.loginForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.isLoading = false;
          if(result.success) {
            this._Toster.success('Login Successfully','Success');
            // save token in local storage
            localStorage.setItem('token', result.token);
            // save user data in service
            this._AuthService.saveUserData();
            // navigate to home page
            if(this._AuthService.userData.user?.role === 'admin'){
              this._Router.navigate(['/admin']);
            }else{
              this._Router.navigate(['/home']);
            }
          }
        },
        error: (err:HttpErrorResponse) => {
          this.ErrorMsg = err.error.message;
          console.log(err); 
          this._Toster.error(this.ErrorMsg,'Error');
          this.isLoading = false;
        }
      })
    }else{
      this.isLoading = false;
      this.loginForm.markAllAsTouched();
    }
  }
}
