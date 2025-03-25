import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./components/forgotPassword/forgotPassword.component').then(c => c.ForgotPasswordComponent) },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(c => c.BlankLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
      { path: 'products', loadComponent: () => import('./components/product/product.component').then(c => c.ProductComponent) },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(c => c.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allOrders/allOrders.component').then(c => c.AllOrdersComponent) },
      { path: 'order/:cartId', loadComponent: () => import('./components/order/order.component').then(c => c.OrderComponent) },
    ],
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) },
];
