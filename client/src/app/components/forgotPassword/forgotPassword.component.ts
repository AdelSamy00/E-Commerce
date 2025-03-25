import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotPassword',
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _AuthService: AuthService = inject(AuthService);
  private readonly _Router: Router = inject(Router);
  private readonly _Toster: ToastrService = inject(ToastrService);

  email: string| null| undefined = ''
  steps:number = 1
  verifyEmailForm = this._FormBuilder.group({
    email: [null,[Validators.required,Validators.email]]
  });

  verifyResetCodeForm = this._FormBuilder.group({
    resetCode: [null,[Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
  });

  ResetPasswordForm = this._FormBuilder.group({
    email: [ null,[Validators.required,Validators.email]],
    newPassword: [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  });

  ngOnInit() {
  }

  sendResetCode(){
    this._AuthService.sendResetCode(this.verifyEmailForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.success === true){
          this.ResetPasswordForm.get('email')?.setValue(this.verifyEmailForm.get('email')!.value);
          this.steps = 2;
          this._Toster.success(res.message,'Success');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  verifyResetCode(){
    this._AuthService.resetCodeVerification(this.verifyResetCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.success === true){
          this.steps = 3;
          this._Toster.success(res.message,'Success');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  resetPassword(){
    this._AuthService.resetPassword(this.ResetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Toster.success('Password Reset Successfully','Success');
        localStorage.setItem('token', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  console.log(this.ResetPasswordForm.value);
  }

}
