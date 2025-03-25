import Brands from "../models/Brand.js";

export const getAllBrands = async (req, res) => {
  try {
    let { page , limit , keyword = '' } = req.query;
    // if add page and limit
    if(!isNaN(page) && !isNaN(limit)){
      page = parseInt(page);
      limit = parseInt(limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      results.brands = await Brands.find().limit(limit).skip(startIndex).exec();
      res.status(200).json({
        results: await Brands.countDocuments().exec(),
        metaData: {
          currentPage: page,
          totalPages: await Brands.countDocuments().exec() / limit,
          limit,
          next: endIndex < await Brands.countDocuments().exec() ? page + 1 : null,
        },
        brands: results.brands,
      });
    }else if(keyword !== ''){ 
      // if add keyword
      const brands = await Brands.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { slug: { $regex: keyword, $options: "i" } },
        ],
      }).exec();
      res.status(200).json({ message: `Search result for "${keyword}"` ,brands });
    }else if(page === undefined && limit === undefined){
      // if no page and limit get all
      const brands = await Brands.find().exec();
      res.status(200).json({ brands });
    } else {
      res.status(400).json({ message: "Invalid query params passed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const getBrandById = async (req, res) => {
  try {
    const brands = await Brands.findById(req.params.id);
    if (brands) {
      res.status(200).json({ data: brands });
    } else {
      res.status(404).json({ message: "Brands not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}