import Product from "../models/Product.js";
import axios from "axios";

export const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, q, category, minPrice, maxPrice, sortBy = "createdAt", sortDir = "desc" } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page-1)*limit)
      .limit(Number(limit))
      .sort({ [sortBy]: sortDir === "desc" ? -1 : 1 });

    res.json({ total, page: Number(page), limit: Number(limit), products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const prod = new Product(req.body);
    await prod.save();
    res.status(201).json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prod) return res.status(404).json({ message: "Not found" });
    res.json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const importFromAPI = async (req, res) => {
  try {
    const apiUrl = process.env.FAKESTORE_API;
    const { data } = await axios.get(apiUrl);
    for (const item of data) {
      const doc = {
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        sourceId: String(item.id)
      };
      await Product.findOneAndUpdate({ sourceId: doc.sourceId }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    res.json({ message: "Imported", count: data.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Import failed" });
  }
};
