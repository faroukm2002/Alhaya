import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenService} from './../authen.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from 'angular2-social-login';
import {Title} from '@angular/platform-browser';
import {Globals} from '../servicesApi/globals';
import {Location} from '@angular/common';
import {RouterExtService} from '../servicesApi/RouterExtService';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  lang = 'en';
  rtl: string;
  check = false;
  emailExist = false;
  phoneExist = false;
  logface: Object;
  referrer;
  public user;
  sub: any;
  constructor(public translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private authen: AuthenService,
              public formBuilder: FormBuilder,
              private spinner: NgxSpinnerService, private  location: Location, private routerService: RouterExtService,
              public aauth: AuthService, private globals: Globals, private titleService: Title) {
  }


  get getSignUpForm() {
    return this.signUpForm.controls;
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls.password_confirmation.value;

    return password === passwordConfirmation ? null : {notSame: true};
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
            res => { this.globals.setUser(res);
              if (this.referrer.indexOf('login') > -1) {
                this.router.navigate([this.lang + '/']);
              } else {
                this.location.back();
              }
              this.spinner.hide();
            }
          );

      }
    );
  }


  ngOnInit() {
    this.referrer = this.routerService.getPreviousUrl();

    this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | التسجيل');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Registration');
      }
    });


    this.signUpForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['']
    }, {validator: this.checkPasswords});
  }

  signUp() {
    this.check = true;
    if (!this.signUpForm.invalid) {
      this.check = false;
      this.spinner.show();
      this.authen.signUp(this.signUpForm.value)
        .subscribe(
          res => {
            this.globals.setUser(res);
            if (this.referrer.indexOf('login') > -1) {
              this.router.navigate([this.lang + '/']);
            } else {
              this.location.back();
            }
            this.spinner.hide();
          },
          err => {
            this.spinner.hide();
            this.check = false;
            if (err.error.error.email) {
              this.emailExist = true;
              // tslint:disable-next-line:align
            } if (err.error.error.phone) {
              this.phoneExist = true;
            }
          }
        );
    }
  }
}
