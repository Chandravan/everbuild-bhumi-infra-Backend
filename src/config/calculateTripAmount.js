import Route from "../models/Route.js";

const RATE_PER_TON = 1;

export const calculateTripAmount = async (tonMaterial, destination) => {
  if (!tonMaterial || tonMaterial <= 0) {
    throw new Error("Invalid ton material");
  }

  if (!destination) {
    throw new Error("Destination required");
  }

  const toCity = destination.trim().toUpperCase();

  const route = await Route.findOne({ toCity });

  if (!route) {
    throw new Error(`Rate not found for destination: ${toCity}`);
  }

  const baseAmount = tonMaterial * RATE_PER_TON;
  return Math.round(baseAmount * route.rate);
};
