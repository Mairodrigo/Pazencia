// Genera un nuevo ID incrementando el ID máximo actual o asignando 1 si la colección está vacía
export const generateId = (collection) => {
	// Verifica si la colección es un array
	if (!Array.isArray(collection)) {
		throw new Error("Colección no válida");
	}

	// Si la colección está vacía, devuelve 1
	if (collection.length === 0) {
		return 1;
	}

	// Encuentra el ID máximo de los elementos en la colección
	const maxId = collection.reduce(
		(max, item) => (item.id > max ? item.id : max),
		0
	);

	return maxId + 1;
};
