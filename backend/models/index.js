import db from "../config/db.js";
import Admin from "./AdminModel.js";
import Contact from "./ContactModel.js";

const syncDb = async () => {
  try {
    await db.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};

syncDb();

export { Admin, Contact };
