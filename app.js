const express = require("express");
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Servidor escuchando en el puerto 8080
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});