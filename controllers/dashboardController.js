import dashboardModel from "../models/dashboardModel.js";

export const createdashboardController = async (req, res) => {
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
    if (!role || !role.length) {
      return res.status(400).send({ message: "At least one role is required" });
    }

    const existingDashboard = await dashboardModel.findOne({ link });
    if (existingDashboard) {
      return res.status(409).send({
        success: false,
        message: "Dashboard already exists",
      });
    }

    const dashboard = new dashboardModel({ name, link, image, role });
    await dashboard.save();

    res.status(201).send({
      success: true,
      message: "Dashboard created successfully",
      dashboard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating dashboard",
      error: error.message,
    });
  }
};

export const getDashboardController = async (req, res) => {
  try {
    let dashboards;

    // Check if there's a search term in the request query
    if (req.query.search) {
      const searchTerm = req.query.search;
      // Use a case-insensitive regular expression to search for dashboards containing the search term
      dashboards = await dashboardModel.find({
        name: { $regex: searchTerm, $options: "i" },
      });
    } else {
      // If no search term provided, fetch all dashboards
      dashboards = await dashboardModel.find();
    }

    res.status(200).send({
      success: true,
      message: "Fetched dashboards successfully",
      dashboards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching dashboards",
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
