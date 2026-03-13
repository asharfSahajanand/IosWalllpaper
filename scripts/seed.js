
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

await mongoose.connect(process.env.MONGO_URI);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const wallpaperSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
});

const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

const categories = [
  "Cars",
  "Space",
  "Lord",
  "samurai",
  "Art Gallery",
  "Nature",
  "Minimal",
  "Emoji",
  "Animals",
  "Sport",
  "Anime",
  "Pop Culture",
  "Aesthetic",
  "Love",
  "Neon",
  "Bike"
];

for (const category of categories) {

  const result = await cloudinary.search
  .expression(`folder="wallpaper/${category}"`)
  .max_results(500)
  .execute();

  for (const img of result.resources) {

    await Wallpaper.create({
      title: img.public_id.split("/").pop(),
      category: category,
      imageUrl: img.secure_url
    });

    console.log("Saved:", img.secure_url);

 }
}

console.log("All images imported ??");
process.exit();

// import dotenv from "dotenv";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Wallpaper from "../models/wallpaperShema";

// dotenv.config({ path: "../.env" });

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });

// const seedMessageBG = async () => {
//   try {

//     await mongoose.connect(process.env.MONGO_URI);

//     const result = await cloudinary.v2.search
//       .expression("folder=MessageBG")
//       .max_results(500)
//       .execute();

//     for (const img of result.resources) {

//       const wallpaper = new Wallpaper({
//         title: "Message Background",
//         imageUrl: img.secure_url,
//         category: "messageBG",
//         isNew: true,
//         isPopular: false,
//         isPremium: false,
//       });

//       await wallpaper.save();

//       console.log("Saved:", img.secure_url);
//     }

//     console.log("✅ MessageBG Images Imported");

//     process.exit();

//   } catch (error) {
//     console.log(error);
//   }
// };

// seedMessageBG();