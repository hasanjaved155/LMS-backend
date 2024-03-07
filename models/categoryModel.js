import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Subsubcategory Schema
const subSubCategorySchema = new Schema({
  link: {
    type: String,
    required: true,
  },
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

export default mongoose.model("Category", categorySchema);
