Para el manejo de Productos:

Para traer todos los productos:
GET * http://localhost:8080/api/products

Para traer con limit
GET * http://localhost:8080/api/products?limit=5

Para traer las paginas
GET * http://localhost:8080/api/products/pages?page=4

*** Para traer una query Este punto al final se me complico, aunque logre lo siguiente:
GET
** http://localhost:8080/api/products?order=Desc
** http://localhost:8080/api/products?limit=7
** http://localhost:8080/api/products?order=Desc&limit=5


Para el manejo de Carritos

Para ver todos los carritos
* GET http://localhost:8080/carts    // Arreglado, gracias!

Para colocar un arreglo de items al carrito
* PUT http://localhost:8080/carts/640f80f963939665c5f75f97
** Body: {"productos": [
  {
  "_id": "6407a288c87e558118ed2811" ,
  "cant": 4
},
{
  "_id": "6407a289c87e558118ed2818",
  "cant": 7
},
{
  "_id": "6407a289c87e558118ed2816",
  "cant": 2
}
]
}

Actualizar las cantidades de un producto en un carrito
PUT * http://localhost:8080/carts/640c64da42ec328aa651810e/products/6407a288c87e558118ed2811
Body {
  "cant": 6
}


Borrar todos los elementos de un carrito
DELETE * http://localhost:8080/carts/640c64da42ec328aa651810e

PUT 

* PUT http://localhost:8080/carts/640c64da42ec328aa651810e/products/6407a289c87e558118ed2813    - Agrega el producto 'pid', al carrito 'cid', la cantidad 'cant' pasada por body
    body:
    {
      "cant": 7

}


* DELETE http://localhost:8080/carts/640c64da42ec328aa651810e   - Esto borra todos los productos del carrito, vacia el carrito


Para JWT utilizamos la ruta /jwt

Logearse al siguiente link:
POST: http://localhost:8080/jwt/login

Body: 
{
"email": "nicosca@gmail.com",
"password": "12345"
}

Devuelve el token

Para verificar:

GET http://localhost:8080/jwt/login

Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MzU0ZGQyYWQ4MDZjMzM2N2UzZGZlYiIsImZpcnN0TmFtZSI6Ik5pY28iLCJsYXN0TmFtZSI6IlNjYSIsImVtYWlsIjoibmljb3NjYUBnbWFpbC5jb20iLCJkbmkiOjMyNzMzMTk4LCJwYXNzd29yZCI6IiQyYiQxMCRDR0c3RWExQXVvZVUwUksxbzhmVHBlMHdCY2JXczFzakh1cDQwRlREanYuZkpTREwvUG56MiIsIl9fdiI6MH0sImlhdCI6MTY4MTIxNjQwNywiZXhwIjoxNjgxMjIwMDA3fQ.GyTk1PtZVlE2lZDK2A9cp_HAwh_lVsHhjO7eQZJoC2g

Luego se puede probar que el token valido con el boton PROBAR en el jwt.handlebars