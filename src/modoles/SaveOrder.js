import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Saveorder = new mongoose.Schema(
  {
    id_user: {
      type: ObjectId,
      ref: "users",
    },
    id_pro: {
      type: ObjectId,
      ref: "products",
    },
    amount: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    id_table: {
      type: ObjectId,
      ref: "tables", //
    },
    floor_id: {
      type: ObjectId,
      ref: "floors", //
    },
    photo: {
      type: String,
    },
    weight: {
      type: Number,
    },
    dvt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("saveorder", Saveorder);
