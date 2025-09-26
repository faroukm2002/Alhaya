import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'https://cp.alhayatsmart.com/api/';

// const baseUrl = 'http://alhayat.local:4567/api/';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()

export class AuthenService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  private loginUrl = baseUrl + 'login';
  private registerSignUp = baseUrl + 'signup';
  private contactusRegist = baseUrl + 'contactUs';
  private logfacebook = baseUrl + 'loginFacebook';
  private editprofileurl = baseUrl + 'editUserData';



  loginUser(user: any) {
    this.spinner.show();
    return this.http.post<any>(this.loginUrl, user);

  }


  signUp(user: any) {
    this.spinner.show();
    return this.http.post<any>(this.registerSignUp, user);
  }


  contactUs(data: any) {
    this.spinner.show();
    return this.http.post<any>(this.contactusRegist, data);
  }


  loginFace(user: any) {
    this.spinner.show();
    return this.http.post<any>(this.logfacebook, user);
  }

  editProfile(user: any) {
    this.spinner.show();
    return this.http.post<any>(this.editprofileurl, user);
  }

}
