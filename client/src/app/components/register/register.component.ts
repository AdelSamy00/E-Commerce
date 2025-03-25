import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  private readonly _AuthService: AuthService = inject(AuthService);
  private readonly _FormBuilder: FormBuilder = inject(FormBuilder);
  private readonly _Router: Router = inject(Router);
  registerationSubscription!: Subscription;

  ErrorMsg: string = '';
  isLoading: boolean = false;
  /* Form */
  /* registerForm = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.ConfirmPassword); */

  /* ------ form builder --------- */
  registerForm = this._FormBuilder.group({
    name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null,[Validators.required,Validators.email]],
    password: [null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null,[Validators.required]],
    phone: [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },{validators: this.ConfirmPassword});

  ConfirmPassword(group: AbstractControl) {
    if(group.get('password')?.value == group.get('rePassword')?.value) {
      return null;
    }else{
      return {mismatch: true}
    }
  }

  onSubmit() {
    this.isLoading = true;
    if(this.registerForm.valid) {
      this.registerationSubscription = this._AuthService.registerSubmit(this.registerForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.isLoading = false;
          if(result.success) {
            this._Router.navigate(['/login']);
          }
        },
        error: (err:HttpErrorResponse) => {
          this.ErrorMsg = err.error.message;
          console.log(err); 
          this.isLoading = false;
        }
      })
    }else{
      this.isLoading = false;
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.registerationSubscription?.unsubscribe();
  }
}
