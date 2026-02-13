import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Date is required"],
    default: Date.now
  },
  from: {
    type: String,
    required: [true, "Starting location is required"],
    default: "patna",
    trim: true
  },
  to: {
    type: String,
    required: [true, "Destination is required"],
    trim: true,
    set: v => v.toUpperCase()
  },
  partiesCount: {
    type: Number,
    default: 1
  },
  parties: [
    {
      partyNo: Number,
      material: Number
    }
  ],
  tonMaterial: {
    type: Number,
    required: [true, "Material weight is required"]
  },
  rate: {
    type: Number, 
    required: [true, "City rate is required"]
  },
  totalAmount: {
    type: Number,
    required: [true, "Total amount is required"]
  },
  profit: {
    type: Number,
    required: [true, "Profit calculation is required"]
  },
  dailyExpense: {
    type: Number,
    required: [true, "Daily expense is required"],
    default: 0
  },
  truckPayment: {
    type: Number,
    required: [true, "Truck payment is required"],
    default: 0
  },
   advancePayment: {        // NEW FIELD
    type: Number,
    default: 0,
   },
    due: {                    // NEW FIELD
    type: Number,
    default: 0,
  },
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck', // Truck model se link
    required: [true, "Truck selection is required"]
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver', // Driver model se link
    required: [true, "Driver selection is required"]
  },
  paymentBy: {
    type: String,
    required: [true, "Please specify who made the payment"],
    enum: [ "Partner 2", "Rohit"] 
  }
}, {
  timestamps: true // createdAt aur updatedAt automatically manage honge
});

// Virtual field for Total (Optional: agar database level pe calculation chahiye)


export default mongoose.model('Trip', tripSchema);