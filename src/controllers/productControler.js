import { getDB } from "../config/db.js";
const getCollection = () => getDB().collection("products");

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, price, category)",
      });
    }

    const newProduct = {
      name: String(name).trim(),
      price: Number(price),
      category: String(category).trim(),
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      createdAt: new Date(),
    };

    const result = await getCollection().insertOne(newProduct);

    res.status(201).json({
      success: true,
      data: {
        _id: result.insertedId,
        ...newProduct,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
