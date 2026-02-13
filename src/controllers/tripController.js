import Trip from "../models/Trip.js";
import { calculateTripAmount } from "../config/calculateTripAmount.js";

// Get All Trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("truck", "truckNumber")
      .populate("driver", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trips", error: error.message });
  }
};


// Get Single Trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip nahi mili" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip", error: error.message });
  }
};

// Create New Trip

export const createTrip = async (req, res) => {
  try {
    const {
      date,
      to,
      partiesCount, 
      parties,
      tonMaterial,
      dailyExpense = 0,
      truckPayment=0,   // frontend se aayega
      advancePayment = 0,
      truck,
      driver,
      paymentBy,
                 
    } = req.body;

    // Total amount (customer)
    const totalAmount = await calculateTripAmount(tonMaterial, to);
    const rate = totalAmount/ (tonMaterial *1000);
    // Profit calculation
    const profit = totalAmount - truckPayment - dailyExpense;
     //  Due calculation
    const due = truckPayment - advancePayment;

    const trip = await Trip.create({
      date,
      from: "PATNA",
      to: to.trim().toUpperCase(),
      partiesCount, 
      parties,
      tonMaterial,
      rate,
      totalAmount,
      truckPayment,
      advancePayment,
      due,
      dailyExpense,

      profit,
      truck,
      driver,
      paymentBy,
    });

    res.status(201).json({
      success: true,
      data: trip
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


// Update Trip
export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// Get Stats
export const getTripStats = async (req, res) => {
  try {
    const stats = await Trip.aggregate([
      { $group: { _id: null, total: { $sum: 1 }, avgBudget: { $avg: "$totalAmount" } } }
    ]);
    res.status(200).json(stats[0] || { total: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};