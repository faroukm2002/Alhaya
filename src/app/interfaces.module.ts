
// tslint:disable-next-line:class-name
export class swiper {
    banner: string;
    link: string;
}

export  class  User {
  // tslint:disable-next-line:variable-name
  api_token: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  // tslint:disable-next-line:variable-name
  city_id: number;
}

export class MainContent {
    icon: string;
    image: string;
    title: string;
    paragraph: string;
}

export class Settings {
  facebook: string;
  instagram: string;
  twitter: string;
  linkIn: string;
  email: string;
  address: string;
  phone: string;
}



export  class Product {
  name: string;
  brand: string;
  price: number;
  discount: number;
  priceBeforeDiscount: number;
  id: number;
  image: string;
  category: string;
  description: string;
  model: string;
  images: [];
  quantity = 0;
  uniqueId: number;
}
export class City {
  id: number;
  name: string;
}

export class Brand {
  id: number;
  name: string;
  check: boolean;
}
export  class Feature {
  id: number;
  name: string;
}

export  class Basket {

  product_id: number;
  quantity: number;
  api_token: string;
  phone: string;
  subTotal: number ;
  tax: number;
  total: number;
  constructor( public products: Product[]) {
  }
}
