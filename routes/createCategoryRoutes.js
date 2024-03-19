import express from "express";
import Category from "../models/createCategoryModel.js";

const router = express.Router();

// POST route to create a new category with subcategories and subsubcategories
router.post("/categories", async (req, res) => {
  try {
    const { categoryName, subCategoryName, subSubCategoryName } = req.body;

    // Check if category already exists
    let category = await Category.findOne({ categoryName });

    // If category doesn't exist, create a new one
    if (!category) {
      category = new Category({ categoryName });
    }

    // Check if subcategory already exists in the category
    let subCategory = category.subCategories.find(
      (sub) => sub.subCategoryName === subCategoryName
    );

    // If subcategory doesn't exist, create a new one
    if (!subCategory) {
      subCategory = { subCategoryName, subSubCategories: [] };
      category.subCategories.push(subCategory);
    }

    // Check if subsubcategory already exists in the subcategory
    const subSubCategoryExists = subCategory.subSubCategories.find(
      (sub) => sub.subSubCategoryName === subSubCategoryName
    );

    if (subSubCategoryExists) {
      return res
        .status(400)
        .json({ error: "Subsubcategory already exists in the subcategory." });
    }

    // Add new subsubcategory to the subcategory
    subCategory.subSubCategories.push({ subSubCategoryName });

    // Save the changes to the category
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
router.get("/get-categories", async (req, res) => {
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

export default router;
