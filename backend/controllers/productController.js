const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, sku, category, quantity, price, description } = req.body;
    const image = req.file.path; // Assuming you use multer for image upload

    const product = new Product({
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
