import { Router } from "express";
import {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
} from "../controllers/truckController.js";

const router = Router();

router.get("/", getAllTrucks);
router.get("/:id", getTruckById);
router.post("/create", createTruck);
router.put("/:id", updateTruck);
router.delete("/:id", deleteTruck);

export default router;