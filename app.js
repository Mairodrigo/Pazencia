import express from "express";

// Importación de enrutadores
import productsRouter from "./src/routes/productsRouter.js";
import cartRouter from "./src/routes/cartRouter.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

// Declaración de rutas para los productos y carritos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

// Ruta raíz para mensaje de bienvenida
app.get("/", (req, res) => {
	res.send(
		"Bienvenido a la API de Pazencia. Usa /api/products o /api/carts para acceder a los datos."
	);
});

// Se levanta el servidor oyendo en el puerto solicitado
app.listen(PORT, () => {
	console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
