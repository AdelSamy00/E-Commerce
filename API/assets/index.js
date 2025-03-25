import mongoose from "mongoose";
import Brands from "../models/Brand.js";
import Categories from "../models/Category.js";
import Products from "../models/Product.js";
import { brands } from "./BrandsData.js";
import { categories } from "./CategoriesData.js";
import { products } from "./ProductsData.js";


export const importData = async () => {
  try {
    await Brands.deleteMany();
    await Categories.deleteMany();
    await Products.deleteMany();
    const insertedBrands = await Brands.insertMany(brands);
    const insertedCategories = await Categories.insertMany(categories);
    // Map brand and category slugs to ObjectIds
    const brandMap = insertedBrands.reduce((map, brand) => {
      map[brand.slug] = brand._id;
      return map;
    }, {});
    const categoryMap = insertedCategories.reduce((map, category) => {
      map[category.slug] = category._id;
      return map;
    }, {});
    // Replace slug names with ObjectIds in products
    const updatedProducts = products.map((product) => ({
      ...product,
      brand: brandMap[product.brand],
      category: categoryMap[product.category]
    }));
    await Products.insertMany(updatedProducts);
    console.log("✅ Data Imported Successfully!");
  } catch (error) {
    console.error("❌ Error Importing Data:", error);
  }
}