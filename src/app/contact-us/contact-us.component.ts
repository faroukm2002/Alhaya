import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenService} from '../authen.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../interfaces.module';
import {Globals} from '../servicesApi/globals';
import {Title} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class ContactUsComponent implements OnInit {
  contactUs: FormGroup;
  language: any;
  model = false;
  check = false;
  lang = 'en';
  rtl: string;
  settings = new Settings();
  @ViewChild('successModal', {static: false}) successModal;

  constructor(public translate: TranslateService, private globals: Globals, private titleService: Title,
              private route: ActivatedRoute,
              private authen: AuthenService,
              public formBuilder: FormBuilder, private apiCalledService: ApiCalledService,
              private spinner: NgxSpinnerService, private modalService: NgbModal) {
  }


  get getContactForm() {
    return this.contactUs.controls;
  }

  ngOnInit() {
    this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | تواصل معنا');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Contact Us');
      }
    });
    this.contactUs = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.apiCalledService.getSettings().subscribe(data => {
      this.spinner.hide();
      this.settings = data;
    });
  }

  sendData() {
    this.check = true;
    if (!this.contactUs.invalid) {
      this.check = false;
      this.authen.contactUs(this.contactUs.value)
        .subscribe(
          res => {
            this.spinner.hide();
            if (res.message === 'success') {
              this.contactUs.reset();
              this.modalService.open(this.successModal, {
                centered: true,
                backdropClass: 'success-backdrop',
                windowClass: 'success-modal'
              });
            }
          },
          err => {
            this.spinner.hide();
          }
        );
    }
  }
}


