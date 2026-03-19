import express from "express";
import {
  getContactPosters,
} from "../controllers/contactPosterController.js";

const router = express.Router();

router.get("/contact-poster", getContactPosters);

export default router;