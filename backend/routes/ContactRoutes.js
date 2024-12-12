import express from "express";
import { deleteContact, getContacts, postContact } from "../controllers/ContactController.js";
// import { getContacts, postContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", postContact);
router.get("/contact", getContacts);
router.delete("/contact/:id", deleteContact);

export default router;
