import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NgxSpinnerService} from 'ngx-spinner';

const baseUrl = 'https://cp.alhayatsmart.com/api/';

@Injectable()

export class ApiCalledService {
  constructor(private http: Http, private spinner: NgxSpinnerService) {
  }
  getHome(lang: any) {
    this.spinner.show();
    return this.http.get(baseUrl + 'homePage?lang=' + lang)
      .map(res => res.json());
  }

  getCities(lang: any) {
    this.spinner.show();
    return this.http.get(baseUrl + 'getCities?lang=' + lang)
      .map(res => res.json());
  }

  getCategories(lang: any) {
    this.spinner.show();
    return this.http.get(baseUrl + 'getCategories?lang=' + lang)
      .map(res => res.json());
  }

  getSettings() {
    this.spinner.show();
    return this.http.get(baseUrl + 'setting')
      .map(res => res.json());
  }

  changeProfileImage(selectedFile: any, api_token: string) {
    this.spinner.show();
    const uploadData = new FormData();
    uploadData.append('image', selectedFile, selectedFile.name);
    uploadData.append('api_token', api_token);
    return this.http.post(baseUrl + 'changeUserImage', uploadData);
  }

  getProducts(lang: any, categoryId: any, sortBy: any, search: any, priceRange: any, brands: string) {
    return this.http.get(baseUrl + 'getProducts?lang=' + lang + '&category=' + categoryId + '&sort=' + sortBy + '&search=' + search + '&price=' + priceRange.lower + '-' + priceRange.upper + '&brands=' + brands)
      .map(res => res.json());
  }

  nextProducts(url: string, lang: any, categoryId: any, sortBy: any, search: any, priceRange: any, brands: string) {
    return this.http.get(url + '&lang=' + lang + '&category=' + categoryId + '&sort=' + sortBy + '&search=' + search + '&price=' + priceRange.lower + '-' + priceRange.upper + '&brands=' + brands)
      .map(res => res.json());
  }

  getBrands(lang: any, categoryId: any) {
    const obj = {
      lang,
      categoryId
    };
    return this.http.post(baseUrl + `getBrands?lang=${lang}`, obj).map(res => res.json());
  }

  getProduct(lang: any, productId: any) {
    this.spinner.show();
    const obj = {
      lang,
      productId
    };
    return this.http.post(baseUrl + 'getProductDetails', obj).map(res => res.json());

  }

  // tslint:disable-next-line:variable-name
  addToBasket(basket: any, api_token: any) {
    const obj = {
      product_id: basket.id,
      quantity: basket.quantity,
      api_token
    };
    this.spinner.show();
    return this.http.post(baseUrl + 'addToBasket', obj).map(res => res.json());

  }

  // tslint:disable-next-line:variable-name
  getBasket(lang: any, api_token: any) {
    this.spinner.show();
    const obj = {
      lang,
      api_token
    };
    return this.http.post(baseUrl + 'basket', obj).map(res => res.json());

  }

  changeQuantity(product_id: number, api_token: any, quantity: number) {
    this.spinner.show();
    const obj = {
      product_id,
      api_token,
      quantity
    };
    return this.http.post(baseUrl + 'changeQuantity', obj).map(res => res.json());
  }

  deleteFromBasket(product_id: number, api_token: any) {
    this.spinner.show();
    const obj = {
      product_id,
      api_token
    };
    return this.http.post(baseUrl + 'deleteFromBasket', obj).map(res => res.json());
  }

  checkOut(data: any) {
    this.spinner.show();
    return this.http.post(baseUrl + 'checkOut', data);
  }

  startQoutation(data: any) {
    this.spinner.show();
    return this.http.post(baseUrl + 'StartQoutation', data).map(res => res.json());
  }
  qoutationFinalStep(data: any) {
    this.spinner.show();
    return this.http.post(baseUrl + 'finalStep', data).map(res => res.json());
  }

  getAbout(lang: string) {
    this.spinner.show();
    return this.http.get(baseUrl + `aboutUs?lang=${lang}`).map(res => res.json());
  }
  getPartners() {
    this.spinner.show();
    return this.http.get(baseUrl + 'getPartners').map(res => res.json());
  }
}
