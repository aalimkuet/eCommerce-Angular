export interface IProduct {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public description: string,
    public price: number,
    public discountPercentage: number,
    public rating: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string,
    public images: string[],
    public quantity: number
  ) {}
}
