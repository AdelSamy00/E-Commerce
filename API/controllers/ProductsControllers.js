import Products from "../models/Product.js";


export const getAllProducts = async (req, res) => {
    try {
      let { page = 1 , limit = 10,categoryId,brandId } = req.query;
      //console.log(page, limit);
      /* pagination */
      page = parseInt(page);
      limit = parseInt(limit);

      if(!isNaN(page) && !isNaN(limit)){
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        if(categoryId){
          results.products = await Products.find({category:categoryId}).limit(limit).skip(startIndex).exec();
        }else if(brandId){
          results.products = await Products.find({brand:brandId}).limit(limit).skip(startIndex).exec();
        }else{
          results.products = await Products.find().limit(limit).skip(startIndex).exec();
        }

        res.status(200).json({
          results: await Products.countDocuments().exec(),
          metaData:{
          currentPage: page,
          totalPages: Math.ceil(await Products.countDocuments().exec() / limit),
          limit,
          next: endIndex < await Products.countDocuments().exec() ? page + 1 : null,
        },products:results.products});
      }else{
        res.status(400).json({ message: "Invalid query params passed" });
      }
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.status(200).json({data: product});
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}