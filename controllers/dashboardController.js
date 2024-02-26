import dashboardModel from "../models/dashboardModel.js";

export const createdashboardController = async (req, res) => {
    try {
        const { name, link, image } = req.body;
        //console.log(name, email, password, confirmPassword)
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!link) {
            return res.send({ message: 'link is Required' })
        }
        if (!image) {
            return res.send({ message: 'image is Required' })
        }

        const existingdashboard = await dashboardModel.findOne({ link })
        //existing dashboard
        if (existingdashboard) {
            return res.status(200).send({
                success: false,
                message: 'dashboard already exist'
            })
        }

        const dashboard = new dashboardModel({ name, link, image });
        await dashboard.save();

        res.status(201).send({
            success: true,
            message: 'dashboard created Successfully',
            dashboard
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while creating dashboard',
            error
        })
    }
};


export const getDashboardController = async (req, res) => {
    try {
        // Add logic here to fetch the dashboard data from the database
        const dashboards = await dashboardModel.find();

        res.status(200).send({
            success: true,
            message: 'Fetched dashboards successfully',
            dashboards
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching dashboards',
            error
        });
    }
};