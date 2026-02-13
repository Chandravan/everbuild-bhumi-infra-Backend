import Route from "../models/Route.js";

export const routeController = {
  // 1. Saare routes fetch karne ke liye (Dropdown list ke liye)
  getAllRoutes: async (req, res) => {
    try {
      const routes = await Route.find().select("toCity").sort({ toCity: 1 }); // Alphabetical order mein sort
      res.status(200).json({ success: true, data: routes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};