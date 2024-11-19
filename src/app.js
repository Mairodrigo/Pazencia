//Framework para desarrollar el servidor: Express
import express from "express";

// Importar enrutadores
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";

// Llamado a la función de instanciación de express
const app = express();

// Puerto en el que el servidor escuchará las request
const PORT = 8080;

// Middleware para acceder al contenido JSON de las request
app.use(express.json());

// Declaración de rutas para los productos y carritos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

// Endpoint raíz
app.get("/", (req, res) => {
	//Mensaje de bienvenida e instrucciones
	res.send(
		"Bienvenido a la API de Pazencia. Utilice /api/products o /api/carts para acceder a los datos."
	);
});

// Levanto el servidor en puerto 8080
app.listen(PORT, () => {
	console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});