import { Router } from "express";
import { 
  getAllTrips, 
  getTripById, 
  createTrip, 
  updateTrip, 
  deleteTrip, 
  getTripStats ,
  
} from "../controllers/tripController.js";
import { getTotalProfit } from "../controllers/getTotalProfit.js";
import { getTotalByPartner } from "../controllers/getTotalByPartner.js";
import { getTotalDue } from "../controllers/getTotalDue.js";
const router = Router();

// Routes definition
router.get("/", getAllTrips);
router.get("/stats", getTripStats); // Yeh /:id se upar hona chahiye
router.get("/total-profit", getTotalProfit); 
router.get("/total-by-partner",getTotalByPartner ),
router.get("/total-due", getTotalDue) 
router.get("/:id", getTripById);
router.post("/create", createTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);



export default router;