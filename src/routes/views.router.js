// src/routes/views.router.js
import { Router } from "express";
import { products } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
	res.render("home", { products }); // Renderizar la vista con los productos actuales
});

router.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts"); // Renderizar la vista en tiempo real
});

export default router;
