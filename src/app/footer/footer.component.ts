import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Globals} from '../servicesApi/globals';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {Settings} from '../interfaces.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class FooterComponent implements OnInit {
  lang = 'en';
  rtl: string;
  settings = new Settings();
  constructor(public translate: TranslateService, private route: ActivatedRoute,  private globals: Globals,
              private apiCalledService: ApiCalledService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.globals.getLang().subscribe(lang => {
     this.lang = lang;
     if ( this.lang === 'ar' ) {
        this.rtl = 'rtl';
      } else {
        this.rtl = '';
      }
    });

    this.apiCalledService.getSettings().subscribe(data => {
      this.spinner.hide();
      this.settings = data;
    });
  }
}
