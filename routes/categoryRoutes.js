import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/CategoryController.js";
import {
  createSubCategory,
  getSubCategory,
} from "../controllers/SubCategoryController.js";
import {
  createSubSubCategory,
  getSubSubCategory,
} from "../controllers/SubSubCategoryController.js";

const router = express.Router();

router.post("/createCategory", createCategory);

// Get all categories
router.get("/getCategory", getCategory);

//create sub category
router.post("/createSubCategory", createSubCategory);
router.get("/getSubCategory/:categoryId", getSubCategory);

// create subsub category

router.post("/createSubSubCategory", createSubSubCategory);
router.get("/getSubSubCategory/:subcategoryId", getSubSubCategory);

export default router;
