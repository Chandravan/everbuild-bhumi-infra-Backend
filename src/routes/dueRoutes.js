import express from "express";
import { getDuePayment } from "../controllers/getTotalDue.js";

const router= express.Router();
router.get("/due-payments",getDuePayment);

export default router;