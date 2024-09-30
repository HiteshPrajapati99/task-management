import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: { type: String },

    completed: { type: Boolean },

    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const task = mongoose.model("tasks", schema);
