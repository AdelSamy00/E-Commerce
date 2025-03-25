import { IProduct } from "./IProduct";

export interface ICart {
  _id: string;
  user: string;
  cart: Cart[];
  totalPrice: number;
  __v: number;
}

interface Cart {
  product: IProduct;
  quantity: number;
  _id: string;
}
