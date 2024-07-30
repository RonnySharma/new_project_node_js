//import CoverTypeModel from '../model/Covertype.js';
import Covertype from'../model/Covertype.js'
import mongoose from "mongoose";

export const createCovertype = async (req, res) => {
  try {
    const univData = await Covertype.create({ name: req.body.name });
    res.status(201).send({ message: "Covertype Created", univData });
  } catch (e) {
    res.status(500).send({ message: "Unable to create Covertype", error: e.message });
  }
};

export const updateCovertype = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Covertype ID" });
  }
  try {
    const updatedCovertype = await Covertype.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCovertype) return res.status(404).send({ message: "Covertype not found" });
    res.json(updatedCovertype);
  } catch (error) {
    res.status(500).send({ message: "Error updating Covertype", error: error.message });
  }
};

export const deleteCovertype = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid Covertype ID" });
  }
  try {
    const deletedCovertype = await Covertype.findByIdAndDelete(id);
    if (!deletedCovertype) return res.status(404).send({ message: "Covertype not found" });
    res.json({ message: "Covertype deleted", deletedCovertype });
  } catch (error) {
    res.status(500).send({ message: "Error deleting Covertype", error: error.message });
  }
};

export const getCovertype = async (req, res) => {
  try {
    const univData = await Covertype.find();
    res.status(200).send({ univData });
  } catch (e) {
    res.status(500).send({ message: "Error fetching Covertype", error: e.message });
  }
};