import xlsx from "xlsx";
import path from "path";
import Route from "../models/Route.js";
import mongoose from "mongoose";

const filePath = path.resolve(process.cwd(), "data/rate.xlsx")



export const loadDestinationRatesToDB = async () => {
  try {
    //1
    console.log(" DB Status:", mongoose.connection.readyState); 
    console.log(" File Path:", filePath);

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(sheet);
    //2
    console.log(` Total rows found in Excel: ${rows.length}`);
    if (rows.length > 0) {
      console.log("🔍 Sample of first row:", JSON.stringify(rows[0]));
    }

    

    let successCount = 0;
    let skipCount = 0;
    for (const row of rows) {
      const city = row["City"];

      const rateKey = Object.keys(row).find((k) =>
        k.includes("CURRENT APPROVED RATE")
      );

      const rate = row[rateKey];

      if (!city || isNaN(rate)){
        skipCount++;
        continue;
      }

      const toCity = String(city).trim().toUpperCase();

      await Route.updateOne(
        {toCity},
        { $set: { rate: Number(rate) } },
        { upsert: true }
      );

      successCount++;
    }
    //2
    console.log(`SUCCESS: ${successCount} routes updated.`);
    console.log(` SKIPPED: ${skipCount} rows (missing city or invalid rate).`);

    console.log(
      `${successCount} routes saved/updated from Excel (${sheetName})`
    );
  } catch (error) {
    console.error("Excel → DB save failed:", error.message);
  }
};
