import Categories from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    let { page , limit , keyword = '' } = req.query;
    // if add page and limit
    if(!isNaN(page) && !isNaN(limit)){
      page = parseInt(page);
      limit = parseInt(limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      results.categories = await Categories.find().limit(limit).skip(startIndex).exec();
      res.status(200).json({
        results: await Categories.countDocuments().exec(),
        metaData: {
          currentPage: page,
          totalPages: await Categories.countDocuments().exec() / limit,
          limit,
          next: endIndex < await Categories.countDocuments().exec() ? page + 1 : null,
        },
        categories: results.categories,
      });
    }else if(keyword !== ''){ 
      // if add keyword
      const categories = await Categories.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { slug: { $regex: keyword, $options: "i" } },
        ],
      }).exec();
      res.status(200).json({ message: `Search result for "${keyword}"` ,categories });
    }else if(page === undefined && limit === undefined){
      // if no page and limit get all
      const categories = await Categories.find().exec();
      res.status(200).json({ categories });
    } else {
      res.status(400).json({ message: "Invalid query params passed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      res.status(200).json({ data: category });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}