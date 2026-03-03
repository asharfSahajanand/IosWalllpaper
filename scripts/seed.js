import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connect
await mongoose.connect(process.env.MONGO_URI);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Schema
const wallpaperSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

// Folder path (local)
const folderPath = "./wallpapers";

const files = fs.readdirSync(folderPath);

for (const file of files) {
  const filePath = path.join(folderPath, file);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "wallpapers",
  });

  await Wallpaper.create({
    title: file,
    imageUrl: result.secure_url,
  });

  console.log("Uploaded:", file);
}

console.log("All images uploaded 🚀");
process.exit();