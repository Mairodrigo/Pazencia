const express = require("express");
const app = express();
const productsRouter = require("./routes/products"); // Importar el router de productos

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use("/api/products", productsRouter); // Usar las rutas de productos

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
