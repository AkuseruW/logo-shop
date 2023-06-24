export interface Product {
  id: string;
  name: string;
  price: number;
  publish: boolean;
  stock: number;
  cover: string;
  brand: string;
  description: string | null;
  slug: string;
}


export interface ProductCart {
  id: string;
  cover: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  image: string;
}