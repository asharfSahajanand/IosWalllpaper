import ContactPoster from "../models/contactPosterSchema.js"

export const getContactPosters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const totalItems = await ContactPoster.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await ContactPoster.find(filter)
      .sort({ order: 1 }) // 🔥 IMPORTANT
      .skip(skip)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages,
      totalItems,
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};