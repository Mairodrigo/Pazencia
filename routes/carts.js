const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const carritosPath = "./files/carritos.json"; // Ruta donde se almacenarán los carritos

//Generar carrito con ID unico y array vacio de productos. ID autogenerado
router.post("/", async (req, res) => {
	try {
		const data = await fs.readFile(carritosPath, "utf-8");
		const carritos = JSON.parse(data);

		const nuevoCarrito = {
			id: (carritos.length
				? Math.max(carritos.map((c) => c.id)) + 1
				: 1
			).toString(), // Autogenera el ID
			products: [], // Inicializa un array vacío de productos
		};

		carritos.push(nuevoCarrito);

		await fs.writeFile(carritosPath, JSON.stringify(carritos, null, 2));
		res.status(201).json(nuevoCarrito);
	} catch (error) {
		res.status(500).send("Error al crear el carrito.");
	}
});

//Ruta GET/api/carts para listar productos de un carrito en especifico
router.get("/:cid", async (req, res) => {
	const { cid } = req.params;

	try {
		const data = await fs.readFile(carritosPath, "utf-8");
		const carritos = JSON.parse(data);

		const carrito = carritos.find((c) => c.id === cid);
		if (!carrito) {
			return res.status(404).json({ error: "Carrito no encontrado." });
		}

		res.json(carrito.products);
	} catch (error) {
		res.status(500).send("Error al obtener los productos del carrito.");
	}
});

//Ruta POST/api/carts/product para agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const data = await fs.readFile(carritosPath, "utf-8");
		const carritos = JSON.parse(data);

		const carrito = carritos.find((c) => c.id === cid);
		if (!carrito) {
			return res.status(404).json({ error: "Carrito no encontrado." });
		}

		const productoExistente = carrito.products.find((p) => p.product === pid);

		if (productoExistente) {
			productoExistente.quantity += 1;
		} else {
			carrito.products.push({ product: pid, quantity: 1 });
		}

		await fs.writeFile(carritosPath, JSON.stringify(carritos, null, 2));
		res.status(200).json(carrito);
	} catch (error) {
		res.status(500).send("Error al agregar el producto al carrito.");
	}
});

module.exports = router; //para que app.js pueda usar las rutas creadas
