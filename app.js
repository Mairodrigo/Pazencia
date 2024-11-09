const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

// Middleware para procesar JSON
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;
app.get("/", (req, res) => {
	res.send(
		"Bienvenido a la API de Pazencia. Usa /api/products o /api/carts para acceder a los datos."
	);
});
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
