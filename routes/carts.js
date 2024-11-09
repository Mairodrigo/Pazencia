const express = require("express");
const router = express.Router();

// Endpoint para obtener el carrito
router.get("/", (req, res) => {
	res.send("Aquí se mostrará el contenido del carrito.");
});

// Endpoint para agregar un producto al carrito
router.post("/", (req, res) => {
	const item = req.body;
	// Aquí agregarías el item a "carrito.json" (detallaremos este proceso luego)
	res.send(`Producto agregado al carrito: ${JSON.stringify(item)}`);
});

module.exports = router;
