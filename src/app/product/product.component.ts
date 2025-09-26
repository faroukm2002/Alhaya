import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Globals} from '../servicesApi/globals';
import {Title} from '@angular/platform-browser';
import {Basket, Brand, Product, User} from '../interfaces.module';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {SliderType} from 'igniteui-angular';
import {Location} from '@angular/common';
import Swiper from 'swiper';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  _router: string;
  public sliderType = SliderType;
  maxPrice = 10000000;
  public priceRange = new PriceRange(0, this.maxPrice);
  @ViewChildren('imagesSwiper') imagesSwiper: QueryList<any>;
  lang = 'en';
  categories;
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = false;
  products: Product[];
  product: Product;
  basket = new Basket([]);
  rtl: string;
  nextPage = null;
  totalProducts = 0;
  searchInput = '';
  brands: Brand[];
  user: User;
  loading = false;
  fetchedUrl: string;
  categoryName = null;
  sortByText = null;
  categoryId = '';
  productImagesSwiper: Swiper;
  productName = null;
  productId: number;
  sortBy = '';
  selectedBrandsString = '';
  previewProduct = new BehaviorSubject(false);
  throttle = 300;
  scrollDistance = 0;
  customInput: Subject<string> = new Subject();
  priceDebounce: Subject<string> = new Subject();
  selectedBrands = '';
  expandedIndex: number;
  expandedIndex1: number;

  @ViewChild('productModal', {static: false}) productModal;
  @ViewChild('successModal', {static: false}) successModal;

  langsubscription: ISubscription;
  routerSubscription: ISubscription;
  animatedMenu = '';

  constructor(public translate: TranslateService, private spinner: NgxSpinnerService,
              private route: ActivatedRoute, private globals: Globals,
              private titleService: Title, config: NgbDropdownConfig,
              private apiCalledService: ApiCalledService, private modalService: NgbModal, private router: Router,
              private location: Location) {
    config.autoClose = 'outside';
    this._router = router.url ;
    this.customInput.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.searchInput = value;
      this.products = [];
      this.getProducts();
    });
    this.priceDebounce.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.products = [];
      this.getProducts();
    });
    this.routerSubscription = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // this.switchLangUrl = this.route.snapshot;
        if (route.snapshot.params.language) {
          this.lang = route.snapshot.params.language;
        }

        if (route.firstChild) {
          if (route.firstChild.snapshot.params.product) {
            const productString = route.firstChild.snapshot.params.product;
            this.productName = productString.substring(productString.indexOf('-') + 1, productString.length);
            this.productId = productString.substring(0, productString.indexOf('-'));
            this.previewProduct.next(true);
            if (this.categoryName === null) {
              const categoryString = route.firstChild.snapshot.params.category;
              this.categoryName = categoryString.substring(categoryString.indexOf('-') + 1, categoryString.length);
              this.categoryId = categoryString.substring(0, categoryString.indexOf('-'));
              this.getBrands();
              this.getProducts();
            }
            this.titleService.setTitle(this.productName);
          } else if (route.firstChild.snapshot.params.category) {
            const categoryString = route.firstChild.snapshot.params.category;
            if(!this.products || this.categoryName !== categoryString.substring(categoryString.indexOf('-') + 1, categoryString.length) ) {
              this.categoryName = categoryString.substring(categoryString.indexOf('-') + 1, categoryString.length);
              this.categoryId = categoryString.substring(0, categoryString.indexOf('-'));
              this.priceRange = new PriceRange(0, 10000000);
              this.getBrands();
              this.getProducts();
              this.titleService.setTitle(this.categoryName);
            }
          }
        } else {
        if(!this.products){
          this.categoryName = '';
          this.categoryId = '';
          this.getBrands();
          this.getProducts();
          if (this.lang === 'ar') {
            this.rtl = 'rtl';
            this.titleService.setTitle('الحياة سمارت | المنتجات');
          } else {
            this.rtl = '';
            this.titleService.setTitle('Alhayat Smart | Products');
          }
        }
        }
      }
    });
  }

  ngOnInit() {
    this.langsubscription = this.globals.getLang().subscribe(lang => {
      if(this.lang !== lang){
        this.products = null;
      }
      this.lang = lang;

      if (this.lang === 'ar') {
        this.rtl = 'rtl';
      } else {
        this.rtl = '';
      }
    });
    this.globals.getCategories().subscribe(categories => {
      this.categories = categories;
      if (this.categories) {
       this.categories.map((item, index ) => {
         if (this.categoryId == item.id ) {
           this.isCollapsed3 = true;
           this.Collaps('parent', index);
         } else {
           item.categories.map((category, index2) => {
             if (category.id == this.categoryId) {
               this.isCollapsed3 = true;
               this.Collaps('parent', index);
               this.Collaps('child', index2);
             } else {
               if (category.categories) {
               category.categories.map((category2 => {
                 if (category2.id == this.categoryId) {
                   this.isCollapsed3 = true;
                   this.Collaps('parent', index);
                   this.Collaps('child', index2);
                 }
               })); }
             }
           });
         }
       });
     }

    });
    this.expandedIndex = -1;
    this.expandedIndex1 = -1;
  }

  ngOnDestroy() {
    this.langsubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  getProducts() {
    this.loading = true;
    this.apiCalledService.getProducts(this.lang, this.categoryId, this.sortBy,
      this.searchInput, this.priceRange, this.selectedBrands).subscribe(res => {
      this.products = res.products;
      this.nextPage = res.nextPageUrl;
      this.totalProducts = res.totalProducts;
      if (this.maxPrice !== res.maxPrice) {
        this.maxPrice = res.maxPrice;
        this.priceRange = new PriceRange(0, this.maxPrice);
      }
      this.loading = false;
    });
  }

  getProductsByPage() {

    if (this.fetchedUrl !== this.nextPage && this.nextPage) {
      this.apiCalledService.nextProducts(this.nextPage, this.lang, this.categoryId,
        this.sortBy, this.searchInput, this.priceRange, this.selectedBrands).subscribe(res => {
        this.products = this.products.concat(res.products);
        this.fetchedUrl = this.nextPage;
        this.nextPage = res.nextPageUrl;

      });
    }
  }

  onScrollDown() {
    this.getProductsByPage();
  }

  ngAfterViewInit() {


    this.previewProduct.subscribe(val => {
      if (val) {
        this.productPreview();
      }
    });
    this.imagesSwiper.changes.subscribe(t => {
      this.productImagesSwiper = new Swiper('.products-images-swiper', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        pagination: {
          el: '.product-pagination',
          clickable: true,
        },
      });
    });
    this.globals.getBasket().subscribe(val => {
      if (val) {
        this.basket = val;
      }


    });
    this.globals.getUser().subscribe(val => {
      this.user = val;
    });
  }

  trackById(i) {
    return i;
  }

  sortByFn(sort) {
    this.sortBy = sort;
    this.sortByText = this.translate.instant('Locale.' + sort);
    this.getProducts();
  }

  allCategories() {
    this.products = [];
    this.categoryName = '';
    this.categoryId = '';
    this.getBrands();
    this.getProducts();
  }

  searchByText(event) {
    this.totalProducts = 0;
    this.customInput.next(event);
  }

  getBrands() {
    this.apiCalledService.getBrands(this.lang, this.categoryId).subscribe(res => {
      this.brands = res;
    });
  }

  public updatePriceRange(event) {

    this.priceDebounce.next(event);

  }

  selectBrand(index) {
    this.products = [];
    this.selectedBrands = '';
    this.selectedBrandsString = '';
    this.brands[index].check =  !this.brands[index].check;
    this.brands.map(val => {

      if (val.check) {

        if (this.selectedBrands === '') {
          this.selectedBrands = '' + val.id;
          this.selectedBrandsString = val.name;
        } else {
          this.selectedBrands += '-' + val.id;
          this.selectedBrandsString += ', ' + val.name;

        }

      }
    });
    this.getProducts();
  }

  productPreview() {
    this.apiCalledService.getProduct(this.lang, this.productId).subscribe(res => {
        this.product = res;
        this.product.quantity = 1;
        this.modalService.open(this.productModal, {
          centered: true,
          size: 'lg',
          backdropClass: 'product-backdrop',
          windowClass: 'product-modal',
          beforeDismiss: () => {
            if (this.categoryName) {
              this.router.navigate(['/' + this.lang + '/products/' + this.categoryId + '-' + this.categoryName]);

            } else {
              this.router.navigate(['/' + this.lang + '/products/']);

            }
            return true;
          }
        });
        this.spinner.hide();
      },
      error => {
      });

  }

  increaseQuantity() {
    this.product.quantity++;
  }

  decreaseQuantity() {
    if (this.product.quantity !== 1) {
      this.product.quantity--;
    }

  }

  showMenu(event) {
    event.stopImmediatePropagation();
    this.animatedMenu = 'animate-menu';
  }

  closeMenu() {
    this.animatedMenu = '';
  }

  addToCart() {
    let productFound = false;
    this.basket.products.forEach(item => {
      if (item.id === this.product.id) {
        item.quantity += this.product.quantity;
        productFound = true;
      }
    });
    if (!productFound) {
      this.basket.products.push(this.product);
    }

    this.globals.setBasket(this.basket);
    if (this.user) {
      this.apiCalledService.addToBasket(this.product, this.user.api_token).subscribe(res => {
          if (res.message === 'success') {
            this.modalService.open(this.successModal, {
              centered: true,
              size: 'lg',
              backdropClass: 'product-backdrop',
              windowClass: 'success-modal',
              beforeDismiss: () => {
                return true;
              }
            });
          }
          this.spinner.hide();
        },
        error => {

        }
      );
    } else {
      localStorage.setItem('basket', JSON.stringify(this.basket));
    }

  }

  Collaps(type, index) {
    if (type === 'parent') {
      this.expandedIndex1 = index ;
      this.expandedIndex = -1 ;
    } else {
      this.expandedIndex = index ;
    }
  }
}
class PriceRange {
  constructor(
    public lower: number,
    public upper: number
  ) {
  }
}
