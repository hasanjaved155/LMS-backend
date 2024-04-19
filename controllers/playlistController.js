import playlistModel from "../models/playlistModel.js";

export const createPlaylistController = async (req, res) => {
    try {
        const { path, listId, name, lecId, role } = req.body;

        if (!path) {
            return res.send({ message: 'Path is Required' })
        }
        if (!listId) {
            return res.send({ message: 'listId is Required' })
        }
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!lecId) {
            return res.send({ message: 'lecId is Required' })
        }
        if (!role || !role.length) {
            return res.status(400).send({ message: "At least one role is required" });
        }


        const existingPlaylist = await playlistModel.findOne({ path })
        //existing dashboard
        if (existingPlaylist) {
            return res.status(200).send({
                success: false,
                message: 'Playlist already exist'
            })
        }

        const playlist = new playlistModel({ path, listId, name, lecId, role });
        await playlist.save();

        res.status(201).send({
            success: true,
            message: 'Playlist created Successfully',
            playlist
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while playlist dashboard',
            error
        })
    }
};


export const getAllPlaylist = async (req, res) => {
    try {
        // Add logic here to fetch the dashboard data from the database
        const playlist = await playlistModel.find();

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