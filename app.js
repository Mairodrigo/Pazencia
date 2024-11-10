import express from "express";
import routerProducts from "./routes/products.js";
import routerCart from "./routes/carts.js";

const app = express();


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
