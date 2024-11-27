import fs from "fs/promises";

// Función para leer el archivo JSON
export const readJSON = async (filePath) => {
	try {
		const data = await fs.readFile(filePath, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error al leer el archivo:", error);
		return []; // En caso de error, devolvemos un array vacío
	}
};

// Función para escribir en el archivo JSON
export const writeJSON = async (filePath, data) => {
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
	} catch (error) {
		console.error("Error al escribir el archivo:", error);
	}
};
