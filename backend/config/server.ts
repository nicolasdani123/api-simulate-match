import app from "./app.js";
import dotenv from "dotenv";
import { init } from "../config/connectPostgree.js";
dotenv.config();

const port = Number(process.env.PORT || 3000);
console.log("Starting server on port " + port);
app.listen (port, async() => {
  try {
    await init()
  } catch (error) {
    console.error("Database init failed:", error);
  }
  console.log(`Server running on http://localhost:${port}`);
});
