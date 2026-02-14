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

export const getDuePayment = async(req,res) =>{
  try{
    const dueTrip= await Trip.aggregate([
      {
        $match:{due : {$gt:0}}
      },
      {
        $lookup: {
          from:"trucks",
          localField: "truck",
          foreignField: "_id",
          as:"truck"
        }
      },
      {$unwind: "$truck"},
      {
        // --- SIRF ZAROORI DATA YAHAN SELECT KAREIN ---
        $project: {
          _id: 1,
          date: 1,
          from: 1,
          to: 1,
          due: 1,
          truckNumber: "$truck.truckNumber" // Truck object se sirf number nikala
        }
      },
      {$sort: {date: -1}}
    ]);

    res.status(200).json({dueTrip})

  } catch(error){
    res.status(500).json({message:"internal server error"})
  }
};



