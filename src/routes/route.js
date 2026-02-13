import express from "express";
import { routeController } from "../controllers/routeControlle.js";

const router= express.Router();
router.get("/",routeController.getAllRoutes);

export default router;