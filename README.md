# Proyecto "Pazencia"

###### Comienza a desarrollarse: Noviembre 2024

###### Estado: Aun en desarrollo

## Introducción
Este e-commerce está siendo desarrollado para el curso de [Programación Backend I](https://www.coderhouse.com/ar/online/programacion-backend-desarrollo-avanzado-de-backend) de [Coderhouse](https://www.coderhouse.com/ar/) en la comisión 70365.

### Consigna de 1º entrega:
Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

**Manejo de productos**
Para el manejo de productos, el cual tendra su router en /api/products/, configurar las siguientes rutas:
* Ruta raíz GET / deberá listar todos los productos de la base.
* Ruta GET /:pid deberá traer solo el producto con el id proporcionado.
* La ruta raíz POST / deberá agregar un nuevo producto con los campos:
    1. id: Number/String que se autogenera, asegurando que NUNCA se repetirán los ids en el archivo.
    2. title:String,
    3. description:String
    4. code:String
    5. price:Number
    6. status:Boolean
    7. stock:Number
    8. category:String
    9. thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
* La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o  eliminar el id al momento de hacer dicha actualización.
* La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 



**Carrito**
Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
* Ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    1. Id:Number/String (como con los productos, asegurar que nunca se dupliquen los ids y que este se autogenere).
    2. Products: Array que contendrá objetos que representen cada producto
* La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
* La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    1. product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (que no se agregue el producto completo)
    2. quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    3. Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
