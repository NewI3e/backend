import express from "express";
import { createProduct } from "../controllers/productControler.js";

const router = express.Router();

// Route: /api/products

router.get("/", (req, res) => {
  res.send("Get all products");
});

router.post("/",createProduct );

export const productsRouter = router;