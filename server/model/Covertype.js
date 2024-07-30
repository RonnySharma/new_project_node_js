
import mongoose from 'mongoose';

const CoverTypeSchema = new mongoose.Schema({
  // Define your schema fields for CoverType
  name: String,
  // Other fields as needed
});

const CoverTypeModel = mongoose.model('coverType', CoverTypeSchema);

export default CoverTypeModel;
