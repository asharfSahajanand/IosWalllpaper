
// ------------------------------------ONLY WALPPAPER CATEGORY------------------------------------------------------------------

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// dotenv.config();
// console.log("URI:", process.env.MONGODB_URI);
// console.log(process.env.MONGODB_USERNAME);
// console.log(process.env.MONGODB_PASSWORD);
// const uri = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}?tls=true&authSource=admin`;

// await mongoose.connect(uri);

// console.log("✅ MongoDB Connected");

// const wallpaperSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   imageUrl: String,
// });

// const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

// // DigitalOcean Spaces client
// const s3 = new S3Client({
//   endpoint: process.env.DO_SPACES_ENDPOINT,
//   region: process.env.DO_SPACES_REGION,
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// const bucket = process.env.DO_SPACES_BUCKET;

// const categories = [
//   "1. Cars",
//   "2. Space",
//   "3. Lord",
//   "4. Samurai",
//   "5. Art Gallery",
//   "6. Nature",
//   "7. Minimal",
//   "8. Emoji",
//   "9. Animals",
//   "10. Sport",
//   "11. Anime",
//   "12. Pop Culture",
//   "13. Aesthetic",
//   "14. Love",
//   "15. Neon",
//   "16. Bike"
// ];

// for (const category of categories) {

//   const command = new ListObjectsV2Command({
//     Bucket: bucket,
//    Prefix: `WallPaperAppImages/wallpaper/${category}/`
//   });

//   const result = await s3.send(command);

//   if (!result.Contents) continue;

//  let index = 1;

// result.Contents.sort((a, b) => a.Key.localeCompare(b.Key));
// const cleanCategory = category.split(". ")[1];

// for (const file of result.Contents) { 

//     if (!file.Key.endsWith(".jpg") && !file.Key.endsWith(".png")) continue;

//     const imageUrl = `https://${bucket}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${file.Key}`;

//   await Wallpaper.updateOne(
//   { imageUrl },
//   {
//     title: file.Key.split("/").pop(),
//     category: cleanCategory,
//     imageUrl,
//     order: index
//   },
//   { upsert: true }
// );

// index++;

//     console.log("Saved:", imageUrl);
//   }
// }

// console.log("✅ All images imported from Spaces");
// process.exit();



//----------------------------ONLY MESSAGE BG--------------------------------------------------------------------------------------------
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// dotenv.config();

// const uri = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}?tls=true&authSource=admin`;

// await mongoose.connect(uri);
// console.log("✅ MongoDB Connected");

// const wallpaperSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   imageUrl: String,
//   order: Number
// });

// const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

// // Spaces client
// const s3 = new S3Client({
//   endpoint: process.env.DO_SPACES_ENDPOINT,
//   region: process.env.DO_SPACES_REGION,
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// const bucket = process.env.DO_SPACES_BUCKET;


// const category = "MessageBG";

// const command = new ListObjectsV2Command({
//   Bucket: bucket,
//   Prefix: `WallPaperAppImages/Message BG/` 
// });

// const result = await s3.send(command);

// if (!result.Contents) {
//   console.log("No files found");
//   process.exit();
// }

// // ✅ SORT for proper order (1.png, 2.png...)
// result.Contents.sort((a, b) => a.Key.localeCompare(b.Key));

// let index = 1;

// for (const file of result.Contents) {

//   if (!file.Key.endsWith(".jpg") && !file.Key.endsWith(".png")) continue;

//   const imageUrl = `https://${bucket}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${file.Key}`;

//   await Wallpaper.updateOne(
//     { imageUrl },
//     {
//       title: file.Key.split("/").pop(),
//       category: category,
//       imageUrl,
//       order: index
//     },
//     { upsert: true }
//   );

//   console.log("Saved:", index, imageUrl);
//   index++;
// }

// console.log("✅ Message BG images imported");
// process.exit();


//--------------------------------------------------CONTACT POSTER--------------------------------------------------------------------
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ContactPoster from "../models/contactPosterSchema.js";
dotenv.config();
// category example
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}?tls=true&authSource=admin`;

 await mongoose.connect(uri);


console.log("✅ MongoDB Connected");
console.log("reion",process.env.DO_SPACES_REGION)
const s3 = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const bucket = process.env.DO_SPACES_BUCKET;
// const ContactPoster =mongoose.model("contactPoster", contactPosterSchema);

const baseRoot = "WallPaperAppImages/Contact Poster/Contact Poster/";

const categories = [
  "1. Love",
  "2. Family _ Friends",
  "3. Anime _ Cartoon",
  "4. Aesthetic",
  "5. Funny"
];

for (const cat of categories) {

  const cleanCategory = cat.split(". ")[1];

  const previewPrefix = `${baseRoot}${cat}/preview image/`;
  const downloadPrefix = `${baseRoot}${cat}/Download image/`;

  const previewRes = await s3.send(new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: previewPrefix
  }));

  const downloadRes = await s3.send(new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: downloadPrefix
  }));

  if (!previewRes.Contents || !downloadRes.Contents) continue;

  const previewMap = {};
  const downloadMap = {};

  // 🔹 preview map
  for (const file of previewRes.Contents) {
    if (!file.Key.endsWith(".png") && !file.Key.endsWith(".jpg")) continue;

    const name = file.Key.split("/").pop(); // 1.png
    previewMap[name] = file.Key;
  }

  // 🔹 download map
  for (const file of downloadRes.Contents) {
    if (!file.Key.endsWith(".png") && !file.Key.endsWith(".jpg")) continue;

    const name = file.Key.split("/").pop();
    downloadMap[name] = file.Key;
  }

  // 🔥 correct numeric sorting
  const sortedFiles = Object.keys(previewMap).sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  let index = 1;

  for (const fileName of sortedFiles) {

    if (!downloadMap[fileName]) continue;

    const previewUrl = `https://${bucket}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${previewMap[fileName]}`;
    const downloadUrl = `https://${bucket}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${downloadMap[fileName]}`;

    await ContactPoster.updateOne(
      { previewImage: previewUrl },
      {
        title: fileName,
        category: cleanCategory,
        previewImage: previewUrl,
        downloadImage: downloadUrl,
        order: index
      },
      { upsert: true }
    );

    console.log(`✅ ${cleanCategory} - ${index} saved`);
    index++;
  }
}

console.log("🔥 All categories imported");
process.exit();