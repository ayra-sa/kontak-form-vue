import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ContactRoutes from "./routes/ContactRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
// import { createContactsTable } from "./models/contactModel.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.get("/", (res, req) => {
//     res.send("Hello world!")
// })
app.use(ContactRoutes);
app.use(AdminRoutes);

app.listen(5000, () => {
  console.log(`Server running at https://localhost:5000`);
});
