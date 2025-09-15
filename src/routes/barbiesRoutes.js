import express from "express";
import { createBarbie, deleteBarbie, getAllBarbies, getBarbiesById, updateBarbie } from "../controllers/barbiesController.js";

const router = express.Router();

router.get("/", getAllBarbies);
router.get("/:id", getBarbiesById);
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie);
router.put("/:id", updateBarbie);

export default router;