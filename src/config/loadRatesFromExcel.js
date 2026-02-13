import xlsx from "xlsx";
import path from "path";
import Route from "../models/Route.js";

const filePath = path.resolve("data/rate.xlsx");

// FIXED FROM CITY
const FROM_CITY = "PATNA";

export const loadDestinationRatesToDB = async () => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet);

    let successCount = 0;

    for (const row of rows) {
      const city = row["City"];

      const rateKey = Object.keys(row).find((k) =>
        k.includes("CURRENT APPROVED RATE")
      );

      const rate = row[rateKey];

      if (!city || isNaN(rate)) continue;

      const toCity = String(city).trim().toUpperCase();

      await Route.updateOne(
        {toCity},
        { $set: { rate: Number(rate) } },
        { upsert: true }
      );

      successCount++;
    }

    console.log(
      `✅ ${successCount} routes saved/updated from Excel (${sheetName})`
    );
  } catch (error) {
    console.error("❌ Excel → DB save failed:", error.message);
  }
};
