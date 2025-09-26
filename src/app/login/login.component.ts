import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenService} from './../authen.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Globals} from '../servicesApi/globals';
import {Title} from '@angular/platform-browser';
import {AuthService} from 'angular2-social-login';
import {RouterExtService} from '../servicesApi/RouterExtService';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  language: any;
  check = false;
  errorCerdentials = false;
  rtl: string;
  lang = 'en';
  logface: Object;
  public user;
  sub: any;
  referrer;

  constructor(public translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private authen: AuthenService, private  location: Location,
              public formBuilder: FormBuilder, private routerService: RouterExtService,
              private spinner: NgxSpinnerService, private aauth: AuthService, private globals: Globals, private titleService: Title) {

  }


  get getLoginForm() {
    return this.loginForm.controls;
  }


  ngOnInit() {
    this.referrer = this.routerService.getPreviousUrl();
    this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | تسجيل الدخول');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Login');
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  loginUser() {
    this.check = true;
    if (!this.loginForm.invalid) {
      this.spinner.show();
      this.authen.loginUser(this.loginForm.value)
        .subscribe(
          res => {
            localStorage.setItem('user', JSON.stringify(res));
            this.globals.setUser(res);
            this.spinner.hide();
            if (this.referrer.indexOf('login') > -1) {
              this.router.navigate([this.lang + '/']);
            } else {
              this.location.back();
            }
          },
          err => {
            if (err.error.error === 'invalid_credentials') {
              this.errorCerdentials = true;
              this.check = false;
            }
            this.spinner.hide();
          }
        );
    }
  }

  socialSignIn() {
    this.sub = this.aauth.login('facebook').subscribe(
      (data: any) => {
        this.logface = data;
        const logface = {
          name: data.name,
          email: data.email,
          faceId: data.uid
        };

        this.authen.loginFace(logface)
          .subscribe(
            res => {
              this.spinner.hide();
              this.globals.setUser(res);
              this.spinner.hide();
              if (this.referrer.indexOf('login') > -1) {
                this.router.navigate([this.lang + '/']);
              } else {
                this.location.back();
              }

            }
          );

      }
    );
  }
}
