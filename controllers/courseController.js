import courseModel from "../models/courseModel.js";

export const createCourseController = async (req, res) => {
    try {
        const { path, listId, courseName, playlistName, image, lecId, courseTitle, role } = req.body;

        if (!path) {
            return res.send({ message: 'Path is Required' })
        }
        if (!listId) {
            return res.send({ message: 'listId is Required' })
        }
        if (!courseName) {
            return res.send({ message: 'Course Name is Required' })
        }
        if (!playlistName) {
            return res.send({ message: 'Playlist Name is Required' })
        }
        if (!image) {
            return res.send({ message: 'Image is Required' })
        }
        if (!lecId) {
            return res.send({ message: 'lecId is Required' })
        }
        if (!courseTitle) {
            return res.send({ message: 'courseTitle is Required' })
        }
        if (!role || !role.length) {
            return res.status(400).send({ message: "At least one role is required" });
        }


        const existingCourse = await courseModel.findOne({ path })
        //existing dashboard
        if (existingCourse) {
            return res.status(200).send({
                success: false,
                message: 'Course already exist'
            })
        }

        const course = new courseModel({ path, listId, courseName, playlistName, image, lecId, courseTitle, role });
        await course.save();

        res.status(201).send({
            success: true,
            message: 'Course Created Successfully',
            course
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while creating course',
            error
        })
    }
};


export const getAllCourse = async (req, res) => {
    try {
        // Add logic here to fetch the dashboard data from the database
        const playlist = await courseModel.find();

        res.status(200).send({
            success: true,
            message: 'Fetched playlist successfully',
            playlist
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching playlist',
            error
        });
    }
};


export const getCourseController = async (req, res) => {
    try {
        let dashboards;

        // Check if there's a search term in the request query
        if (req.query.search) {
            const searchTerm = req.query.search;
            // Use a case-insensitive regular expression to search for dashboards containing the search term
            dashboards = await courseModel.find({
                courseName: { $regex: searchTerm, $options: "i" },
            });
        } else {
            // If no search term provided, fetch all dashboards
            dashboards = await courseModel.find();
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