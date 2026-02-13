import express from "express";
import tripRoutes from "./routes/tripRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import router from "./routes/route.js";
import authMiddleware from "./middleware/authMiddleware.js";
import cors from "cors"
import { loadDestinationRatesToDB } from "./config/loadRatesFromExcel.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(cors());

// middleware

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/trucks",authMiddleware, truckRoutes );
app.use("/api/drivers",authMiddleware, driverRoutes);
app.use("/api/trips",authMiddleware, tripRoutes);
app.use("/api/location",authMiddleware, router);

app.post("/api/sync-rates", async (req, res) => {
  await loadDestinationRatesToDB();
  res.json({ success: true, message: "Excel data synced to DB" });
});



export default app;
