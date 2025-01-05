import express from "express";
import { categories, duas, homeSlider } from "./dua.constants";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(duas);
});
router.get("/categories", (req, res) => {
  res.status(200).json(categories);
});
router.get("/sliders", (req, res) => {
  res.status(200).json(homeSlider);
});

export const DuaRoutes = router;
