import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Category Schema
const subSubCategorySchema = new Schema({
  subSubCategoryName: {
    type: String,
    required: true,
  },
});

// Subcategory Schema
const subCategorySchema = new Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  subSubCategories: [subSubCategorySchema],
});

// Category Schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subCategories: [subCategorySchema],
});
export default mongoose.model("createCategory", categorySchema);
