import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    toCity: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// toCity unique (no duplicate destination)
routeSchema.index({ toCity: 1 }, { unique: true });

export default mongoose.model("Route", routeSchema);
