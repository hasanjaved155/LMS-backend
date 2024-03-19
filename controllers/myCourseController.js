import mycourseModel from "../models/mycourseModel.js";

export const createMyCourseController = async (req, res) => {
  try {
    const { name, link, image, role } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!link) {
      return res.status(400).send({ message: "Link is required" });
    }
    if (!image) {
      return res.status(400).send({ message: "Image is required" });
    }

    const existingMycourse = await mycourseModel.findOne({ link });
    if (existingMycourse) {
      return res.status(409).send({
        success: false,
        message: "Course already exists",
      });
    }

    const courses = new mycourseModel({ name, link, image });
    await courses.save();

    res.status(201).send({
      success: true,
      message: "course created successfully",
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating course",
      error: error.message,
    });
  }
};

export const getMyCourseController = async (req, res) => {
  try {
    let courses;

    // Check if there's a search term in the request query
    if (req.query.search) {
      const searchTerm = req.query.search;
      // Use a case-insensitive regular expression to search for dashboards containing the search term
      courses = await mycourseModel.find({
        name: { $regex: searchTerm, $options: "i" },
      });
    } else {
      // If no search term provided, fetch all dashboards
      courses = await mycourseModel.find();
    }

    res.status(200).send({
      success: true,
      message: "Fetched courses successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching courses",
      error,
    });
  }
};

// export const getSearchDashboard = async (req, res) => {
//     try {
//         const { keyword } = req.params;
//         const results = await dashboardModel
//             .find({
//                 $or: [
//                     { name: { $regex: keyword, $options: "i" } },
//                 ],
//             })
//         res.json(results);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error In Search Product API",
//             error,
//         });
//     }
// }
