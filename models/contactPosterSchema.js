import mongoose from "mongoose";

const contactPosterSchema = new mongoose.Schema({
  title: String,
  category: String,
  previewImage: String,
  downloadImage: String,
  order: Number
}, { timestamps: true });

export default mongoose.model("ContactPoster", contactPosterSchema);