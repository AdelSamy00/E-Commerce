export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  cart: Cart;
  orders: string[];
}

interface Cart {
  _id: string;
  user: string;
  cart: CartItems[];
  totalPrice: number;
  __v: number;
}

interface CartItems {
  product: string;
  quantity: number;
  _id: string;
}