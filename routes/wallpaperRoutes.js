import express from "express";
import {
  createWallpaper,
  getWallpapers,
} from "../controllers/wallpaperController.js";

const router = express.Router();

router.post("/", createWallpaper);
router.get("/wallpaper", getWallpapers);

export default router;