import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized, NavigationEnd} from '@angular/router';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {Globals} from '../servicesApi/globals';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {Basket, Settings, User} from '../interfaces.module';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
declare let gtag: Function;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [NgbDropdownConfig]
})
export class NavBarComponent implements OnInit, AfterViewInit {
  user: User;
  categories;
  lang;
  switchLangUrl: string;
  rtl: string;
  basket: Basket[];
  basketCount = 0;
  settings = new Settings();
  public isCollapsed = true;
  navScroll = false;
  constructor(private route: ActivatedRoute, private apiCalledService: ApiCalledService, private globals: Globals,
              private router: Router, private translate: TranslateService, private spinner: NgxSpinnerService, config: NgbDropdownConfig,
              ) {
    config.autoClose = 'outside';
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  logOut() {
    this.globals.setUser(null);
    this.router.navigate([this.lang]);
    return localStorage.removeItem('user');
  }
  @HostListener('document:scroll')
  scrollFunction() {
    this.navScroll = document.documentElement.scrollTop > 30;
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        // this.switchLangUrl = this.route.snapshot;
        if (val.state.root.firstChild.params.language) {
          this.globals.setLang(val.state.root.firstChild.params.language);
        } else {
          this.globals.setLang('en');
        }
        if (val.state.root.firstChild.params.language === 'ar') {
          this.switchLangUrl = '/en';
        } else {
          this.switchLangUrl = '/ar';
        }
        val.state.root.children[0].url.forEach(value => {
            if (value.path !== 'en' && value.path !== 'ar') {
              this.switchLangUrl += '/' + value.path;
            }
          }
        );
      }
      if (val instanceof NavigationEnd) {
        this.apiCalledService.getSettings().subscribe(data => {
          this.spinner.hide();
          this.settings = data;
        });
        gtag('config', 'UA-144674258-5', {page_path: val.urlAfterRedirects});
      }
    });
    if (localStorage.getItem('user')) {
      this.globals.setUser(JSON.parse(localStorage.getItem('user')));
    }
    this.globals.getLang().subscribe(lang => {
        if (lang !== undefined && lang !== this.lang) {
          this.lang = lang;
          this.translate.use(this.lang);
          if (this.lang === 'ar') {
            this.rtl = 'rtl';
          } else {
            this.rtl = '';
          }
          this.apiCalledService.getCategories(this.lang).subscribe(data => {
            this.categories = data.parent;
            this.globals.setCategories(this.categories);
            this.spinner.hide();
          });
          if (this.user) {

            this.getBasket();
          } else if (localStorage.getItem('basket')) {
            this.globals.setBasket(JSON.parse(localStorage.getItem('basket')));
          }
        }
      }
    );

    this.globals.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        if (!this.user.image) {
          this.user.image = 'assets/smart-image/icons8-user-80.png';
        }
        if (this.lang) {

          if (localStorage.getItem('basket')) {

            const basket = JSON.parse(localStorage.getItem('basket'));
            basket.products.forEach((value, index) => {
              this.apiCalledService.addToBasket(value, this.user.api_token).subscribe(res => {
               if (index === basket.products.length - 1) {
                 this.getBasket();
                 localStorage.removeItem('basket');
               }
              });
            });
          } else {
            this.getBasket();
          }

        }
      }
    });
  }

  ngAfterViewInit() {
    this.globals.getBasket().subscribe(val => {
      if (val) {
        this.basketCount = val.products.length;
      }

    });
  }

  getBasket() {
    this.apiCalledService.getBasket(this.lang, this.user.api_token).subscribe(res => {
      if (res.message !== 'basket Empty') {
        this.globals.setBasket(res);
      }
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
    }
      );
  }
}
