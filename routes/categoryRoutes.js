import express from "express";
const router = express.Router();
import Category from "../models/categoryModel.js";

// Create a new category
router.post("/create-category", async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new Category({ categoryName });
    await category.save();
    res.status(201).send({
      success: true,
      message: "category created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
});

// Get all categories
router.get("/getAllCategories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).send({
      success: true,
      message: "category Fetched Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching category",
      error,
    });
  }
});

// Create a new subcategory within a category
router.post("/create-subcategory", async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    category.subCategories.push({ subCategoryName });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Sub-category created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Sub-category",
      error,
    });
  }
});

// Create a new subsubcategory within a subcategory
router.post("/create-subsubcategory", async (req, res) => {
  try {
    const { subSubCategoryName, link, subCategoryId, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }
    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).send({ error: "Subcategory not found" });
    }
    subCategory.subSubCategories.push({ subSubCategoryName, link });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Sub-Sub-category created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Sub-Sub-category",
      error,
    });
  }
});

export default router;
