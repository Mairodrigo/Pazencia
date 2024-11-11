import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "../manager/errorManager.js";

export default class CartManager {
	#jsonFilename;
	#carts;

	constructor() {
		this.#jsonFilename = "carrito.json";
	}

	// Busca un carrito por su ID
	async #findOneById(id) {
		this.#carts = await this.getAll();
		const cartFound = this.#carts.find((item) => item.id === Number(id));

		if (!cartFound) {
			throw new ErrorManager("ID de carrito no encontrado", 404);
		}

		return cartFound;
	}

	// Obtiene todos los carritos
	async getAll() {
		try {
			this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
			return this.#carts;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Obtiene un carrito específico por su ID
	async getOneById(id) {
		try {
			const cartFound = await this.#findOneById(id);
			return cartFound;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Inserta un nuevo carrito
	async insertOne(data) {
		try {
			const cart = {
				id: generateId(await this.getAll()),
				products: data.products || [],
			};

			this.#carts.push(cart);
			await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

			return cart;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Agrega un producto a un carrito o incrementa la cantidad de un producto existente
	async addProductToCart(cartId, productId, quantity = 1) {
		try {
			const cartFound = await this.#findOneById(cartId);
			const productIndex = cartFound.products.findIndex(
				(item) => item.product === Number(productId)
			);

			if (productIndex >= 0) {
				cartFound.products[productIndex].quantity += quantity;
			} else {
				cartFound.products.push({ product: Number(productId), quantity });
			}

			const index = this.#carts.findIndex((item) => item.id === Number(cartId));
			this.#carts[index] = cartFound;
			await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

			return cartFound;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}

	// Elimina un producto de un carrito por su ID
	async removeProductFromCart(cartId, productId) {
		try {
			const cartFound = await this.#findOneById(cartId);
			cartFound.products = cartFound.products.filter(
				(item) => item.product !== Number(productId)
			);

			const index = this.#carts.findIndex((item) => item.id === Number(cartId));
			this.#carts[index] = cartFound;
			await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

			return cartFound;
		} catch (error) {
			throw new ErrorManager(error.message, error.code);
		}
	}
}
