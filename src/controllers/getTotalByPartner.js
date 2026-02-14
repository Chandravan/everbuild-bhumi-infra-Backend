import Trip from "../models/Trip.js";

// Get Total Payments divided by Partners
export const getTotalByPartner = async (req, res) => {
  try {
    const result = await Trip.aggregate([
      {
        $group: {
          _id: "$paymentBy", // Schema mein 'paymentBy' field hai
          totalAmount: { $sum: "$advancePayment" }
        }
      }
    ]);

    // Format results to match frontend state
    const totals = {
      RohitTotal: result.find(r => r._id === "Rohit")?.totalAmount || 0,
      RajGautamTotal: result.find(r => r._id === "Raj Gautam")?.totalAmount || 0
    };

    res.status(200).json(totals);
  } catch (error) {
    res.status(500).json({ message: "Error calculating partner totals", error: error.message });
  }
};