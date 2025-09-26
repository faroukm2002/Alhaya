import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Globals} from '../servicesApi/globals';

import Swiper from 'swiper';
import {ISubscription} from 'rxjs-compat/Subscription';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit, AfterViewInit{
  aboutSwiper: Swiper;
  language;
  aboutUs: any[];
  langSubscription: ISubscription;
  description: string;
  title: string;
  rtl: string;
  lang = 'en';
  @ViewChildren('swiperFinished') adds: QueryList<any>;
  ngOnInit() {

    this.langSubscription = this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | البيت الذكي');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Smart Home');
      }
      this.apiCalledService.getAbout(this.lang).subscribe((data: any []) => {
        this.spinner.hide();
        this.aboutUs = data;
        this.description = this.aboutUs[0].paragraph;
        this.title = this.aboutUs[0].title;
      });
    });

  }
  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private apiCalledService: ApiCalledService,
    private titleService: Title,
    private globals: Globals) {

    this.route.paramMap.subscribe(params => {
      this.language = params.get('language');
    });

  }
  ngAfterViewInit() {
      this.aboutSwiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        direction: 'vertical',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
      this.aboutSwiper.on('slideChange', () => {
        this.description = this.aboutUs[this.aboutSwiper.activeIndex -1].paragraph;
        this.title = this.aboutUs[this.aboutSwiper.activeIndex -1].title;
        });

}}
