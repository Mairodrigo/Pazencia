//Framework para desarrollar el servidor: Express
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

// Importar enrutadores
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/views.router.js";
import path from "path";

// Llamado a la función de instanciación de express
const app = express();

// Puerto en el que el servidor escuchará las request
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

// Endpoint raíz
app.get("/", (req, res) => {
	//Mensaje de bienvenida e instrucciones
	res.send(
		"Bienvenido a la API de Pazencia. Utilice /api/products o /api/carts para acceder a los datos."
	);
});

// Servidor HTTP
const httpServer = app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Servidor de Websockets
const io = new Server(httpServer);

let products = []; // Array de productos en memoria (puedes reemplazarlo con persistencia real)

io.on("connection", (socket) => {
	console.log("¡Cliente conectado!");

	// Enviar lista inicial de productos al cliente
	socket.emit("updateProducts", products);

	// Escuchar cuando se agregue un producto
	socket.on("newProduct", (product) => {
		products.push(product);
		io.emit("updateProducts", products); // Actualizar a todos los clientes
	});

	// Escuchar cuando se elimine un producto
	socket.on("deleteProduct", (productId) => {
		products = products.filter((p) => p.id !== productId);
		io.emit("updateProducts", products); // Actualizar a todos los clientes
	});
});

export { products, io };
