import Category from '../model/Category.js';
import mongoose from "mongoose";



export const createCategory = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).send({ message: "Category created", category });
  } catch (error) {
    res.status(500).send({ message: "Error creating category", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Category ID" });
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) return res.status(404).send({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).send({ message: "Error updating category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Category ID" });
  }
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).send({ message: "Category not found" });
    res.json({ message: "Category deleted", deletedCategory });
  } catch (error) {
    res.status(500).send({ message: "Error deleting category", error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ univData: categories });
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories", error: error.message });
  }
};
