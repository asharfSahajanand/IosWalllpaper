import Wallpaper from "../models/wallpaperShema.js";

// CREATE Wallpaper
export const createWallpaper = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.create(req.body);
    res.status(201).json(wallpaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Wallpapers (Pagination + Filter)
export const getWallpapers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.type === "new") filter.isNew = true;
    if (req.query.type === "popular") filter.isPopular = true;
    if (req.query.type === "premium") filter.isPremium = true;

    const totalItems = await Wallpaper.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const wallpapers = await Wallpaper.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages,
      totalItems,
      data: wallpapers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};