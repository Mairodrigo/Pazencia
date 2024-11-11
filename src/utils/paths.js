// Módulo 'path': proporciona utilidades para trabajar con rutas de archivos y directorios
import path from "path";

// Define la ruta raíz del proyecto, es decir, el directorio donde se ejecuta el proyecto
const ROOT_PATH = path.resolve(); // Devuelve la ruta absoluta al directorio actual

// Define la ruta al directorio 'src' dentro del proyecto
const SRC_PATH = path.join(ROOT_PATH, "src");

// Define las rutas clave del proyecto para facilitar su uso
const paths = {
	root: ROOT_PATH, // Ruta al directorio raíz del proyecto
	src: SRC_PATH, // Ruta al directorio "src" que contiene el código fuente
	public: path.join(SRC_PATH, "public"), // Ruta al directorio "public" donde se guardan archivos estáticos
	images: path.join(SRC_PATH, "public", "images"), // Ruta al directorio de imágenes dentro de "public"
	files: path.join(SRC_PATH, "files"), // Ruta al directorio para archivos privados que no se sirven al público
};

export default paths;
