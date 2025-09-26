import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs-compat/Subscription';
import {Globals} from '../servicesApi/globals';
import {ApiCalledService} from '../servicesApi/api-called.service';
import {Basket, City, User} from '../interfaces.module';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  checkOutForm: FormGroup;
  check = false;
  lang = 'en';
  rtl: string;
  city: City;
  user: User;
  total: number;
  langSubscription: ISubscription;
  basketSubscription: ISubscription;
  userSubscription: ISubscription;
  basket = new Basket([]);
  @ViewChild('signUpModal', {static: false}) signUpModal;
  @ViewChild('checkOutModal', {static: false}) checkOutModal;
  @ViewChild('successModal', {static: false}) successModal;

  constructor(public translate: TranslateService, private route: ActivatedRoute, private globals: Globals,
              private apiCalledService: ApiCalledService, private spinner: NgxSpinnerService, private router: Router,
              private modalService: NgbModal,   public formBuilder: FormBuilder,  private titleService: Title) {

  }
  get getCheckOutForm() {
    return this.checkOutForm.controls;
  }
  ngOnInit() {
    this.langSubscription = this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | سلة المشتريات');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Shopping Cart');
      }
      });

    this.basketSubscription = this.globals.getBasket().subscribe(val => {
      this.total = 0;
      if (val) {
        this.basket = val;
        this.basket.products.forEach(item => {
          this.total += item.quantity * item.price;
        });
      }
    });

    this.userSubscription = this.globals.getUser().subscribe(val => {
      this.user = val;
    });

    this.checkOutForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      city_id: [this.user.city_id, [Validators.required]],
      api_token: [this.user.api_token, [Validators.required]],
    });


  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
    this.basketSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  increaseQuantity(index) {
    this.basket.products[index].quantity++;
    this.globals.setBasket(this.basket);
    if (this.user) {
      this.apiCalledService.changeQuantity(this.basket.products[index].id, this.user.api_token,
        this.basket.products[index].quantity).subscribe(res => {
          if (res.message === 'success') {
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

  decreaseQuantity(index) {
    if (this.basket.products[index].quantity !== 1) {
      this.basket.products[index].quantity--;
      this.globals.setBasket(this.basket);
      if (this.user) {
        this.apiCalledService.changeQuantity(this.basket.products[index].id,
          this.user.api_token, this.basket.products[index].quantity).subscribe(res => {
            if (res.message === 'success') {
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

  }

  removeProduct(index) {
    this.basket.products.splice(index, 1);
    this.globals.setBasket(this.basket);
    if (this.user) {
      this.apiCalledService.deleteFromBasket(this.basket.products[index].id, this.user.api_token).subscribe(res => {
          if (res.message === 'success') {
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

  checkOut() {
    if (!this.user) {
      this.modalService.open(this.signUpModal, {
        centered: true,
        size: 'lg',
        backdropClass: 'product-backdrop',
        windowClass: 'signUpModal',
        beforeDismiss: () => {
          return true;
        }
      });
    } else {
      this.apiCalledService.getCities(this.lang).subscribe(
        data => {
          this.city = data;
          this.spinner.hide();
        });
      this.modalService.open(this.checkOutModal, {
        centered: true,
        size: 'lg',
        backdropClass: 'product-backdrop',
        windowClass: 'signUpModal',
        beforeDismiss: () => {
          return true;
        }
      });
    }
  }
  submitCheckOut() {
    this.check = true;
    if (!this.checkOutForm.invalid) {
      this.apiCalledService.checkOut(this.checkOutForm.value).subscribe(
        data => {
          this.spinner.hide();
          this.globals.setBasket(new Basket([]));
          this.modalService.open(this.successModal, {
            centered: true,
            size: 'lg',
            backdropClass: 'product-backdrop',
            windowClass: 'signUpModal',
            beforeDismiss: () => {
              return true;
            }
          });
        });
    }
  }
}
