export interface User {
  api_token: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  city_id: number;
}

export interface Product {
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
  images: string[];
  quantity: number;
  uniqueId: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  categories?: Category[];
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  check?: boolean;
}

export interface City {
  id: number;
  name: string;
}

export interface Basket {
  products: Product[];
  subTotal: number;
  tax: number;
  total: number;
}

export interface Settings {
  facebook: string;
  instagram: string;
  twitter: string;
  linkIn: string;
  email: string;
  address: string;
  phone: string;
}

export interface MainContent {
  icon: string;
  image: string;
  title: string;
  paragraph: string;
}

export interface SwiperSlide {
  banner: string;
  link: string;
}

export interface Feature {
  id: number;
  name: string;
  value?: boolean;
}

export interface Solution {
  id: number;
  name: string;
  price: number;
  features: {
    name: string;
    state: boolean;
  }[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  city_id: number;
  api_token: string;
}

export interface PriceRange {
  lower: number;
  upper: number;
}