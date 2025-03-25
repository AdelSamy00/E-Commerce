export interface IProduct {
  _id: string;
  sold: number;
  images: string[];
  subcategory: any[];
  ratingsQuantity: number;
  title: string;
  title_ar: string;
  slug: string;
  slug_ar: string;
  description: string;
  description_ar: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: ICategory;
  ratingsAverage: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  name_ar: string;
  image: string;
  slug: string;
  slug_ar: string;
  __v: number;
}