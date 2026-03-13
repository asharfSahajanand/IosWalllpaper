import mongoose from "mongoose";
import dotenv from "dotenv";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

dotenv.config();
console.log("URI:", process.env.MONGODB_URI);
console.log(process.env.MONGODB_USERNAME);
console.log(process.env.MONGODB_PASSWORD);
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_URI}:25060/${process.env.MONGODB_DATABASE}?tls=true&authSource=admin`;

await mongoose.connect(uri);

console.log("✅ MongoDB Connected");

const wallpaperSchema = new mongoose.Schema({
  title: String,
  category: String,
  imageUrl: String,
});

const Wallpaper = mongoose.model("Wallpaper", wallpaperSchema);

// DigitalOcean Spaces client
const s3 = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const bucket = process.env.DO_SPACES_BUCKET;

const categories = [
  "1. Cars",
  "2. Space",
  "3. Lord",
  "4. Samurai",
  "5. Art Gallery",
  "6. Nature",
  "7. Minimal",
  "8. Emoji",
  "9. Animals",
  "10. Sport",
  "11. Anime",
  "12. Pop Culture",
  "13. Aesthetic",
  "14. Love",
  "15. Neon",
  "16. Bike"
];

for (const category of categories) {

  const command = new ListObjectsV2Command({
    Bucket: bucket,
   Prefix: `WallPaperAppImages/wallpaper/${category}/`
  });

  const result = await s3.send(command);

  if (!result.Contents) continue;

 let index = 1;

result.Contents.sort((a, b) => a.Key.localeCompare(b.Key));
const cleanCategory = category.split(". ")[1];

for (const file of result.Contents) { 

    if (!file.Key.endsWith(".jpg") && !file.Key.endsWith(".png")) continue;

    const imageUrl = `https://${bucket}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${file.Key}`;

  await Wallpaper.updateOne(
  { imageUrl },
  {
    title: file.Key.split("/").pop(),
    category: cleanCategory,
    imageUrl,
    order: index
  },
  { upsert: true }
);

index++;

    console.log("Saved:", imageUrl);
  }
}

console.log("✅ All images imported from Spaces");
process.exit();