import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    truckNumber: {
      type: String,
      required: [true, "Truck number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      // Validation for MH-12-AB-1234 format
      match: [/^[A-Z]{2}-\d{2}-[A-Z]{1,2}-\d{4}$/, "Please fill a valid truck number"],
    },
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Truck = mongoose.model("Truck", truckSchema);
export default Truck;