import Trip from "../models/Trip.js";

// GET /api/trips/total-profit
export const getTotalProfit = async (req, res) => {
  try {
    // MongoDB aggregate to sum profit of all trips
    const result = await Trip.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$profit" }
        }
      }
    ]);

    const totalProfit = result[0]?.totalProfit || 0;

    res.status(200).json({ totalProfit });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total profit", error: error.message });
  }
};
