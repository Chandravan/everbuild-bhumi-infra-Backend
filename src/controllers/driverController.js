import Driver from "../models/Driver.js";

// Get all drivers with truck details
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate("assignedTruck", "truckNumber") // Only get truckNumber from Truck model
      .sort({ createdAt: -1 });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error: error.message });
  }
};

// Get single driver
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("assignedTruck");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create driver
export const createDriver = async (req, res) => {
  try {
    const { name, mobile, assignedTruck } = req.body;
    
    const existingDriver = await Driver.findOne({ mobile });
    if (existingDriver) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    const newDriver = new Driver({ name, mobile, assignedTruck });
    await newDriver.save();
    
    // Return populated data so UI updates correctly
    const populatedDriver = await Driver.findById(newDriver._id).populate("assignedTruck", "truckNumber");
    res.status(201).json(populatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update driver
export const updateDriver = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("assignedTruck", "truckNumber");

    if (!updatedDriver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete driver
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};