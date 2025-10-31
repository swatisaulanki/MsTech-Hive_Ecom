import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import axios from "axios";
import connectDB from "../config/db.js"; 
import Product from "../models/Product.js";

const run = async () => {
  try {
    await connectDB(); 
    console.log(" Connected to MongoDB");

    const res = await axios.get(process.env.FAKESTORE_API);
    const data = res.data;

    for (const item of data) {
      const doc = {
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        sourceId: String(item.id),
        sku: `FS-${item.id}`,
      };

      await Product.findOneAndUpdate(
        { sourceId: doc.sourceId },
        doc,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log(`Imported ${data.length} products successfully`);
    process.exit(0);
  } catch (err) {
    console.error("Error importing products:", err);
    process.exit(1);
  }
};

run();
