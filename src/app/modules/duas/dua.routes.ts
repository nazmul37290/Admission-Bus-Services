import express from "express";
import { duas } from "./dua.constants";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(duas);
});

export const DuaRoutes = router;
