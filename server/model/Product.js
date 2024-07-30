import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: false,
    min: 0
  },
  qty: {
    type: Number,
    required: true,
    min: 0
  },
  images: {
    type: [String],

  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',  
  
  },
  coverTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coverType',  
    
  }
}, {
  timestamps: true  
});

const UniversityModel = mongoose.model("Product", ProductSchema);
export default UniversityModel;
///module.exports = mongoose.model('Product', ProductSchema);

