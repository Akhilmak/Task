const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
//instance of Express
const app = express();
//create databse
mongoose.connect("mongodb://127.0.0.1:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date },
});
//model
const Product = mongoose.model("Product", productSchema);
async function initializeDatabase() {
  try {
    // Fetching data
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    await Product.insertMany(data);
    console.log("Database updated with data");
  } catch (error) {
    console.error(error);
  }
}
initializeDatabase();
app.get("/products", async (req, res) => {
  try {
    // Fetch data from the database
    const products = await Product.find();

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch " });
  }
});
//Start
app.listen(2007, () => {
  console.log("Server started on port 2007");
});
