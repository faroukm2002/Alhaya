import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {HistoryComponent} from './history/history.component';
import {ProfileComponent} from './profile/profile.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ProductComponent} from './product/product.component';
import {SolutionComponent} from './solution/solution.component';

import {Globals} from './servicesApi/globals';
import {AccessGuard} from './servicesApi/AccessGuard';

const routes: Routes = [
  {path: ':language/login', component: LoginComponent, data: {notLogged: true}, canActivate: [AccessGuard]},
  {path: 'login', component: LoginComponent, data: {notLogged: true}, canActivate: [AccessGuard]},
  {path: ':language/signup', component: SignUpComponent, data: {notLogged: true}, canActivate: [AccessGuard]},
  {path: 'signup', component: SignUpComponent, data: {notLogged: true}, canActivate: [AccessGuard]},
  {path: ':language/contact', component: ContactUsComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: ':language/about', component: AboutUsComponent},
  {path: 'about', component: AboutUsComponent},
  {path: ':language/orders', component: HistoryComponent, data: {requiresLogin: true}, canActivate: [AccessGuard]},
  {path: 'orders', component: HistoryComponent, data: {requiresLogin: true}, canActivate: [AccessGuard]},
  {path: ':language/profile', component: ProfileComponent, data: {requiresLogin: true}, canActivate: [AccessGuard]},
  {path: 'profile', component: ProfileComponent, data: {requiresLogin: true}, canActivate: [AccessGuard]},
  {path: ':language/cart', component: ShoppingCartComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {
    path: ':language/products', component: ProductComponent,
    children: [{path: ':category', component: ProductComponent},
      {path: ':category/:product', component: ProductComponent}]
  },
  {
    path: 'products', component: ProductComponent,
    children: [{path: ':category', component: ProductComponent},
      {path: ':category/:product', component: ProductComponent},
      {path: ':brand',  component: ProductComponent}]
  },
  {path: ':language/smart-home', component: SolutionComponent},
  {path: 'smart-home', component: SolutionComponent},
  {path: '', component: HomeComponent},
  {path: ':language', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Globals, AccessGuard]
})
export class AppRoutingModule {
}
