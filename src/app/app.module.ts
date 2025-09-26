import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductComponent } from './product/product.component';
import { SolutionComponent } from './solution/solution.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApiCalledService } from './servicesApi/api-called.service';
import { AuthenService } from './authen.service';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {RouterExtService} from './servicesApi/RouterExtService';
import {GoogleAnalyticsService} from './google-analytics.service';
import { IgxSliderModule,	IgxInputGroupModule } from 'igniteui-angular';
import { FacebookModule } from 'ngx-facebook';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const providers = {
  facebook: {
    clientId: '337882340426556',
    apiVersion: 'v4.0'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ContactUsComponent,
    AboutUsComponent,
    HistoryComponent,
    ProfileComponent,
    ShoppingCartComponent,
    ProductComponent,
    SolutionComponent,

],
  imports: [
    InfiniteScrollModule,
    HttpModule,
    IgxSliderModule,
    IgxInputGroupModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Angular2SocialLoginModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    FacebookModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ApiCalledService,
    AuthenService,
    Title,
    RouterExtService,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts(providers);

