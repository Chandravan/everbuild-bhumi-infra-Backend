import Truck from "../models/Truck.js";

// Get all trucks
export const getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().sort({ createdAt: -1 });
    res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trucks", error: error.message });
  }
};

// Get truck by ID
export const getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) return res.status(404).json({ message: "Truck not found" });
    res.status(200).json(truck);
  } catch (error) {
    res.status(500).json({ message: "Error fetching truck", error: error.message });
  }
};

// Create truck
export const createTruck = async (req, res) => {
  try {
    const { truckNumber } = req.body;
    
    // Check if truck already exists
    const existingTruck = await Truck.findOne({ truckNumber });
    if (existingTruck) {
      return res.status(400).json({ message: "Truck number already exists" });
    }

    const newTruck = new Truck({ truckNumber });
    await newTruck.save();
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update truck
export const updateTruck = async (req, res) => {
  try {
    const updatedTruck = await Truck.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTruck) return res.status(404).json({ message: "Truck not found" });
    res.status(200).json(updatedTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete truck
export const deleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) return res.status(404).json({ message: "Truck not found" });
    res.status(200).json({ message: "Truck deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};