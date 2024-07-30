import ProductModel from "../model/Product.js";
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
  try {
    const images = req?.files?.map((item) => item.filename) || [];
    const productData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty,
      images: images,
      price: req.body.price,
      categoryId: req.body.categoryId,
      coverTypeId: req.body.coverTypeId,
    });
    res.status(201).send({ message: "Product created" });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Product ID" });
    }

    // Extract images
    const images = req.files ? req.files.map(file => file.filename) : [];

    // Update product
    const productData = await ProductModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        description: req.body.description,
        qty: req.body.qty,
        images: images,
        price: req.body.price,
        categoryId: req.body.categoryId,
        coverTypeId: req.body.coverTypeId,
      },
      { new: true } // Return the updated document
    );

    // Check if product was found and updated
    if (!productData) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Send updated product data
    res.status(200).send({ message: "Product updated", product: productData });
  } catch (e) {
    // Send error message
    res.status(500).send({ error: e.message });
  }
};
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Covertype ID" });
    }
    try {
      const deletedCovertype = await ProductModel.findByIdAndDelete(id);
      if (!deletedCovertype) return res.status(404).send({ message: "Covertype not found" });
      res.json({ message: "Covertype deleted", deletedCovertype });
    } catch (error) {
      res.status(500).send({ message: "Error deleting Covertype", error: error.message });
    }
};


export const productDetail = async (req, res) => {
  try {
    let productData = await ProductModel.findOne({
      _id: req.query.id,
    })
    res.status(200).send({ productData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getAllProductsByDepartmentId = async (req, res) => {
  try {
    const productData = await ProductModel.find({
      categoryId: req.query.categoryId,
      coverTypeId: req.query.coverTypeId,
    }).populate('categoryId')
      .populate('coverTypeId');
    res.status(200).send({ productData });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const updateProductQty = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const updatedQty = product.qty - req.body.qty;
    const active = updatedQty > 0;
    const productData = await ProductModel.findByIdAndUpdate(
      req.body.id,
      {
        qty: updatedQty,
        active: active,
      },
      { new: true }
    );
    res.status(200).send({ message: "Product updated", productData });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
export const productget = async (req, res) => {
  try {
    const productData = await ProductModel.find();
    res.status(200).send({ productData: productData });
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error: error.message });
  
  
  
  }

 
 // };
};

