const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const productosPath = "./files/productos.json"; // Ruta al archivo de productos

// Función para obtener el próximo ID único
async function obtenerNuevoId() {
	const data = await fs.readFile(productosPath, "utf-8");
	const productos = JSON.parse(data);

	// Encontrar el ID máximo en el archivo y sumar 1
	const maxId = productos.reduce(
		(max, product) => Math.max(max, parseInt(product.id)),
		0
	);
	return (maxId + 1).toString(); // Convertimos a string para mantener consistencia
}



// Ruta POST / para agregar un nuevo producto
router.post("/", async (req, res) => {
	const {
		title,
		description,
		status = true,
		stock,
		category,
		thumbnails = [],
		code,
		price,
	} = req.body;

	// Verificar campos obligatorios
	if (!title || !description || !stock || !category || !code || !price) {
		return res.status(400).json({
			error: "Todos los campos son obligatorios, excepto thumbnails.",
		});
	}

	try {
		// Generar un nuevo ID único
		const newId = await obtenerNuevoId();

		// Crear el nuevo producto
		const nuevoProducto = {
			id: newId,
			title,
			description,
			status,
			stock,
			category,
			thumbnails,
			code,
			price,
		};

		// Leer el archivo, añadir el nuevo producto y guardar los cambios
		const data = await fs.readFile(productosPath, "utf-8");
		const productos = JSON.parse(data);
		productos.push(nuevoProducto);

		await fs.writeFile(productosPath, JSON.stringify(productos, null, 2));
		res.status(201).json(nuevoProducto);
	} catch (error) {
		res.status(500).send("Error al guardar el producto.");
	}
});

// Ruta PUT /:pid para actualizar un producto existente
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
        const data = await fs.readFile(productosPath, 'utf-8');
        const productos = JSON.parse(data);

        const productIndex = productos.findIndex(p => p.id === pid);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        delete updatedFields.id;

        productos[productIndex] = { ...productos[productIndex], ...updatedFields };

        await fs.writeFile(productosPath, JSON.stringify(productos, null, 2));
        res.json(productos[productIndex]);
    } catch (error) {
        res.status(500).send('Error al actualizar el producto.');
    }
});


// Ruta DELETE /:pid para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        // Leer el archivo de productos
        const data = await fs.readFile(productosPath, 'utf-8');
        const productos = JSON.parse(data);

        // Filtrar los productos para excluir el producto con el pid dado
        const productosFiltrados = productos.filter(p => p.id !== pid);
        
        // Verificar si el producto existía
        if (productos.length === productosFiltrados.length) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        // Guardar el nuevo array de productos sin el producto eliminado
        await fs.writeFile(productosPath, JSON.stringify(productosFiltrados, null, 2));
        res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).send('Error al eliminar el producto.');
    }
});


module.exports = router;
