import mongoose  from "mongoose";

const cartCollection = "cart";

const itemCartSchema = new mongoose.Schema({
  productId: { type: String, required: true, max : 100},
  title: { type: String, required: true, max : 100 },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  products: [itemCartSchema],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);