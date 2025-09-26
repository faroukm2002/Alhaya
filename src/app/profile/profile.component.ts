import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthenService} from '../authen.service';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {User, City} from '../interfaces.module';
import {Globals } from '../servicesApi/globals';
import {Title} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  check = false;
  emailExist = false;
  dataSaved = false;
  imageChanged = false;
  selectedFile: File;
  city: City;
  user: User ;
  lang = 'en';
  rtl: string;
  @ViewChild('successModal', {static: false}) successModal;
  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authen: AuthenService,
    private profile: ApiCalledService, private globals: Globals, private titleService: Title, private modalService: NgbModal) {
  }


  get getProfileEditForm() {
    return this.editProfileForm.controls;
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordConfirmation = group.controls.password_confirmation.value;

    return password === passwordConfirmation ? null : {notSame: true};
  }


  ngOnInit() {
    this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | تعديل الحساب');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Edit Account');
      }
    });
    this.globals.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        if (!this.user.image) {
          this.user.image = 'assets/smart-image/icons8-user-80.png';
        }
      }
    });
    this.editProfileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      password: ['', []],
      address: [this.user.address, [Validators.required]],
      city_id: [this.user.city_id, [Validators.required]],
      api_token: [this.user.api_token, [Validators.required]],
    });
    this.profile.getCities(this.lang).subscribe(
      data => {
        this.city = data;
      });

  }

  editFunc() {
    this.check = true;
    if (!this.editProfileForm.invalid) {
      this.check = false;
      this.spinner.show();
      this.authen.editProfile(this.editProfileForm.value)
        .subscribe(
          res => {
            this.globals.setUser(res);
            this.imageChanged = false;
            this.dataSaved = true;

            this.modalService.open(this.successModal, {
              centered: true,
              backdropClass: 'success-backdrop',
              windowClass: 'success-modal'
            });

            this.spinner.hide();
          },
          err => {
            console.log(err);
            if (err.error.error.email) {
              this.emailExist = true;
            }
            this.spinner.hide();
          });
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.profile.changeProfileImage(this.selectedFile, this.user.api_token).subscribe(
      res => {
        this.imageChanged = true;
        this.dataSaved = false;
        this.globals.setUser(res);
        this.modalService.open(this.successModal, {
          centered: true,
          backdropClass: 'success-backdrop',
          windowClass: 'success-modal'
        });
        this.spinner.hide();
      });
  }
}
