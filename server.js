import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import wallpaperRoutes from "./routes/wallpaperRoutes.js";
import contactPosterRotes from "./routes/contactPosterRoute.js";
dotenv.config();

const app = express();
app.use("/images", express.static("/var/www/html/wallpapers"));
// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/wallpapers", wallpaperRoutes);
app.use("/api/poster", contactPosterRotes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});