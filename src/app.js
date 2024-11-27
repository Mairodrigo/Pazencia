import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";

// Importar enrutadores
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/views.router.js";

// Importar las funciones de manejo de archivos
import { readJSON, writeJSON } from "./utils/fileHandler.js";

// Llamado a la función de instanciación de express
const app = express();

// Definir __dirname en entorno de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Puerto en el que el servidor escuchará las request
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine(
	"handlebars",
	handlebars.engine({
		defaultLayout: false, // Desactiva el uso de layouts
	})
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

// Endpoint raíz
app.get("/", (req, res) => {
	res.send(
		"Bienvenido a la API de Pazencia. Utilice /api/products o /api/carts para acceder a los datos."
	);
});

// Servidor HTTP
const httpServer = app.listen(PORT, async () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
	// Cargar los productos desde el archivo JSON cuando el servidor arranca
	products = await readJSON("./src/files/products.json");
});

// Servidor de Websockets
const io = new Server(httpServer);

let products = []; // Array de productos en memoria, que se actualiza desde el archivo

io.on("connection", (socket) => {
	console.log("¡Cliente conectado!");

	// Enviar lista inicial de productos al cliente
	socket.emit("updateProducts", products);

	// Escuchar cuando se agregue un producto
	socket.on("newProduct", async (product) => {
		products.push(product);
		await writeJSON("./src/files/products.json", products); // Actualizar archivo
		io.emit("updateProducts", products); // Actualizar a todos los clientes
	});

	// Escuchar cuando se elimine un producto
	socket.on("deleteProduct", async (productId) => {
		products = products.filter((p) => p.id !== productId);
		await writeJSON("./src/files/products.json", products); // Actualizar archivo
		io.emit("updateProducts", products); // Actualizar a todos los clientes
	});
});

export { products, io };
