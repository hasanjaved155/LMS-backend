import CategoryModel from "../models/CategoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new CategoryModel({
      categoryName,
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Category",
      error,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send({
      success: true,
      message: "Fetched categories successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching categories",
      error,
    });
  }
};
