import express from "express";
import { createPlaylistController, getAllPlaylist } from "../controllers/playlistController.js";


const router = express.Router();



router.post('/createPlaylist', createPlaylistController);
router.get('/allPlaylist', getAllPlaylist);


export default router;