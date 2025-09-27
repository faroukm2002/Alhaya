import axios from 'axios';
import { 
  User, 
  Product, 
  Category, 
  Brand, 
  City, 
  Basket, 
  Settings, 
  MainContent, 
  SwiperSlide,
  Solution,
  ContactForm,
  LoginForm,
  SignUpForm,
  CheckoutForm,
  PriceRange
} from '@/types';

const baseURL = process.env.API_URL || 'https://cp.alhayatsmart.com/api/';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Home Page API
export const getHome = async (lang: string) => {
  const response = await apiClient.get(`/homePage?lang=${lang}`);
  return response.data;
};

// Categories API
export const getCategories = async (lang: string) => {
  const response = await apiClient.get(`/getCategories?lang=${lang}`);
  return response.data;
};

// Products API
export const getProducts = async (
  lang: string,
  categoryId: string = '',
  sortBy: string = '',
  search: string = '',
  priceRange: PriceRange,
  brands: string = ''
) => {
  const response = await apiClient.get(
    `/getProducts?lang=${lang}&category=${categoryId}&sort=${sortBy}&search=${search}&price=${priceRange.lower}-${priceRange.upper}&brands=${brands}`
  );
  return response.data;
};

export const getProduct = async (lang: string, productId: number) => {
  const response = await apiClient.post('/getProductDetails', {
    lang,
    productId
  });
  return response.data;
};

// Brands API
export const getBrands = async (lang: string, categoryId: string = '') => {
  const response = await apiClient.post(`/getBrands?lang=${lang}`, {
    lang,
    categoryId
  });
  return response.data;
};

// Cities API
export const getCities = async (lang: string) => {
  const response = await apiClient.get(`/getCities?lang=${lang}`);
  return response.data;
};

// Settings API
export const getSettings = async () => {
  const response = await apiClient.get('/setting');
  return response.data;
};

// Authentication API
export const loginUser = async (credentials: LoginForm) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const signUpUser = async (userData: SignUpForm) => {
  const response = await apiClient.post('/signup', userData);
  return response.data;
};

export const loginFacebook = async (facebookData: any) => {
  const response = await apiClient.post('/loginFacebook', facebookData);
  return response.data;
};

// Profile API
export const editProfile = async (userData: any) => {
  const response = await apiClient.post('/editUserData', userData);
  return response.data;
};

export const changeProfileImage = async (formData: FormData) => {
  const response = await apiClient.post('/changeUserImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Basket API
export const getBasket = async (lang: string, apiToken: string) => {
  const response = await apiClient.post('/basket', {
    lang,
    api_token: apiToken
  });
  return response.data;
};

export const addToBasket = async (product: Product, apiToken: string) => {
  const response = await apiClient.post('/addToBasket', {
    product_id: product.id,
    quantity: product.quantity,
    api_token: apiToken
  });
  return response.data;
};

export const changeQuantity = async (productId: number, apiToken: string, quantity: number) => {
  const response = await apiClient.post('/changeQuantity', {
    product_id: productId,
    api_token: apiToken,
    quantity
  });
  return response.data;
};

export const deleteFromBasket = async (productId: number, apiToken: string) => {
  const response = await apiClient.post('/deleteFromBasket', {
    product_id: productId,
    api_token: apiToken
  });
  return response.data;
};

// Checkout API
export const checkOut = async (checkoutData: CheckoutForm) => {
  const response = await apiClient.post('/checkOut', checkoutData);
  return response.data;
};

// Contact API
export const contactUs = async (contactData: ContactForm) => {
  const response = await apiClient.post('/contactUs', contactData);
  return response.data;
};

// Solutions API
export const startQuotation = async (data: any) => {
  const response = await apiClient.post('/StartQoutation', data);
  return response.data;
};

export const quotationFinalStep = async (data: any) => {
  const response = await apiClient.post('/finalStep', data);
  return response.data;
};

// About API
export const getAbout = async (lang: string) => {
  const response = await apiClient.get(`/aboutUs?lang=${lang}`);
  return response.data;
};

// Partners API
export const getPartners = async () => {
  const response = await apiClient.get('/getPartners');
  return response.data;
};