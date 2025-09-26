import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ApiCalledService} from '../servicesApi/api-called.service';
import Swiper from 'swiper';
import {Title} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {MainContent, Product, Settings, swiper} from '../interfaces.module';
import {Globals} from '../servicesApi/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  brandSwiper: Swiper;
  partnerSwiper: Swiper;
  lang = 'en';
  last = false;
  postHome;
  rtl: string;
  brands: any [];
  bestSellingProducts: Product[];
  swiper: swiper[];
  settings = new Settings();
  mainContent: MainContent[];
  homeCatSwiper: Swiper;
  categories;
  products: Product[];
  product: Product;


  @ViewChildren('swiperFinished') adds: QueryList<any>;

  constructor(public translate: TranslateService,
              private route: ActivatedRoute,
              private apiCalledService: ApiCalledService, private  spinner: NgxSpinnerService, private globals: Globals,
              private titleService: Title) {

  }

  ngOnInit() {

    this.globals.getLang().subscribe(lang => {

      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | بيتك ذكي معنا');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Your home is smart with us');
      }
      if (this.swiper) {
        this.swiper.length = 0;
      }
      if (this.bestSellingProducts) {
        this.bestSellingProducts.length = 0;
      }
      this.apiCalledService.getHome(this.lang).subscribe(
        data => {
          this.spinner.hide();
          this.postHome = data;
          this.swiper = data.swiper;
          this.bestSellingProducts = data.products;
          this.mainContent = data.main_content;
        }
      );
    });
    // @ts-ignore
    this.apiCalledService.getBrands(this.lang).subscribe(
      data => {
        this.spinner.hide();
        this.brands = data;
      }
    );

    this.globals.getCategories().subscribe(categories => {
      this.categories = JSON.parse(JSON.stringify(categories));
      if (this.categories) {
 this.categories.forEach((category) => {
    category.categories = this.chunkArray(category.categories, 4);
   });
 categories = this.categories;
 console.log(categories);
 }
    });
  }
  chunkArray = (myArray, chunkSize) => {
    const tempArray = [];
    for (let index = 0; index < myArray.length; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }
    return tempArray;
  }
  ngAfterViewInit() {
    setTimeout (() => {
      const homeCatSwiper = new Swiper('.cat-swiper-con', {
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
          reverseDirection: true,
        },
      });
    }, 2000);
    this.brandSwiper = new Swiper ('.swiper-con', {
      observer: true,
      observeParents: true,
      loop: true,
      slidesPerView: 6,
      spaceBetween: 30,
      slidesPerGroup: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        reverseDirection: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      },
    });
    this.partnerSwiper = new Swiper ('.partner-swiper', {
      observer: true,
      observeParents: true,
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        reverseDirection: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        900: {
          slidesPerView: 2,
        },
      },

    });
    this.homeCatSwiper =  new Swiper ('.cat-swiper-con', {
      observer: true,
      observeParents: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
      slidesPerGroup: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        reverseDirection: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        900: {
          slidesPerView: 2,
        },
      },

    });

  }

}
