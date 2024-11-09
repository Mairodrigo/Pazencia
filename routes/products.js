const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const productosPath = "./data/productos.json";

// Ruta GET / para listar todos los productos (con limitación opcional ?limit)
router.get("/", async (req, res) => {
	try {
		// Leer el archivo JSON
		const data = await fs.readFile(productosPath, "utf-8");
		const productos = JSON.parse(data);

		// Limitar resultados si existe ?limit en los parámetros de la solicitud
		const limit = parseInt(req.query.limit);
		if (limit && limit > 0) {
			return res.json(productos.slice(0, limit));
		}

		// Enviar todos los productos si no se especifica limit
		res.json(productos);
	} catch (error) {
		res.status(500).send("Error al leer los productos.");
	}
});

// Ruta GET /:pid para obtener un producto específico por ID
router.get("/:pid", async (req, res) => {
	try {
		const data = await fs.readFile(productosPath, "utf-8");
		const productos = JSON.parse(data);

		// Buscar el producto por ID
		const producto = productos.find((p) => p.id === req.params.pid);
		if (producto) {
			res.json(producto);
		} else {
			res.status(404).send("Producto no encontrado.");
		}
	} catch (error) {
		res.status(500).send("Error al leer los productos.");
	}
});

module.exports = router;