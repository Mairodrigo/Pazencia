import paths from "../utils/paths.js";
import {
	readJsonFile,
	writeJsonFile,
	deleteFile,
} from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./errorManager.js";


export default class ProductManager {
	#jsonFilename;
	#products;

	constructor() {
		this.#jsonFilename = "products.json";
	}

// Buscar un producto por su ID
	async #findOneById(id) {
		this.#products = await this.getAll();
		//Traer el producto elegido mediante el id desde la request. Transformar el string recibido en number.
		const productFound = this.#products.find((item) => item.id === Number(id));
		//Condicion de escape si no encuentra el producto, error 404
		if (!productFound) {
			throw new ErrorManager("ID de producto no encontrado", 404);
		}
		
		return productFound;
	}

	// Obtiene lista de productos
	async getAll() {
		try {
			this.#products = await readJsonFile(paths.files, this.#jsonFilename);
			return this.#products;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Obtiene un producto específico por su ID
	async getOneById(id) {
		try {
			const productFound = await this.#findOneById(id);
			return productFound;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Inserta un producto
	async insertOne(data, file) {
		try {
			const { title, status, stock, price } = data;

			if (!title || status === undefined || !stock || !price) {
				throw new ErrorManager("Faltan datos obligatorios", 400);
			}

			if (!file?.filename) {
				throw new ErrorManager("Falta el archivo de la imagen", 400);
			}

			const product = {
				id: generateId(await this.getAll()),
				title,
				status: convertToBoolean(status),
				stock: Number(stock),
				price: Number(price),
				thumbnail: file?.filename,
			};

			this.#products.push(product);
			await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

			return product;
		} catch (error) {
			if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Actualiza un producto específico
	async updateOneById(id, data, file) {
		try {
			const { title, status, stock, price } = data;
			const productFound = await this.#findOneById(id);
			const newThumbnail = file?.filename;

			const product = {
				id: productFound.id,
				title: title || productFound.title,
				status:
					status !== undefined ? convertToBoolean(status) : productFound.status,
				stock: stock !== undefined ? Number(stock) : productFound.stock,
				price: price !== undefined ? Number(price) : productFound.price,
				thumbnail: newThumbnail || productFound.thumbnail,
			};

			const index = this.#products.findIndex((item) => item.id === Number(id));
			this.#products[index] = product;
			await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

			// Elimina la imagen anterior si es distinta de la nueva
			if (file?.filename && newThumbnail !== productFound.thumbnail) {
				await deleteFile(paths.images, productFound.thumbnail);
			}

			return product;
		} catch (error) {
			if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Elimina un producto específico
	async deleteOneById(id) {
		try {
			const productFound = await this.#findOneById(id);

			// Si tiene thumbnail definido, entonces, elimina la imagen del producto
			if (productFound.thumbnail) {
				await deleteFile(paths.images, productFound.thumbnail);
			}

			const index = this.#products.findIndex((item) => item.id === Number(id));
			this.#products.splice(index, 1);
			await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}
}
