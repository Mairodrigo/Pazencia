const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

// Importar los routers
const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);
const cartsRouter = require("./routes/carts");

// Definir las rutas
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);

app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});