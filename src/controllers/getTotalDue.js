import Trip from "../models/Trip.js";

// Get the sum of 'due' from all trip documents
export const getTotalDue = async (req, res) => {
  try {
    const result = await Trip.aggregate([
      {
        $group: {
          _id: null,
          totalDue: { $sum: "$due" } 
        }
      }
    ]);

    const totalDue = result[0]?.totalDue || 0;
    res.status(200).json({ totalDue });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total due", error: error.message });
  }
};


