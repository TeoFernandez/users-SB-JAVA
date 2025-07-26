# users-SB-JAVA
User CRUD API

Descripción
Esta es una API RESTful desarrollada con Spring Boot que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una entidad User almacenada en una base de datos MySQL. La API utiliza el patrón DTO (Data Transfer Object) para separar la lógica de negocio de la representación de datos, siguiendo las mejores prácticas de desarrollo.
La entidad User tiene los siguientes campos:

id: Identificador único (autogenerado).
name: Nombre del usuario (requerido).
email: Correo electrónico único (requerido).

Tecnologías Utilizadas

Java 17
Spring Boot 3.3.1
Spring Data JPA (para la interacción con la base de datos)
MySQL 8.0 (base de datos relacional)
Lombok (para reducir código boilerplate)
Maven (gestión de dependencias)
Postman o cURL (para probar los endpoints)

Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:

JDK 17 (recomendado: Adoptium o Microsoft OpenJDK)
Maven (puedes usar la versión embebida en IntelliJ IDEA o instalarla manualmente)
MySQL 8.0 (con un servidor local corriendo)
Un IDE como IntelliJ IDEA, Eclipse o VS Code (opcional, pero recomendado)

Instalación
Sigue estos pasos para configurar y ejecutar el proyecto:

Clonar el repositorio:
git clone https://github.com/TeoFernandez/users-SB-JAVA.git
cd user-crud


Configurar la base de datos MySQL:

Crea una base de datos llamada users_db:CREATE DATABASE users_db;


Actualiza el archivo src/main/resources/application.properties con tus credenciales de MySQL:spring.datasource.url=jdbc:mysql://localhost:3306/users_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false


Compilar y ejecutar la aplicación:

Desde la terminal, en la raíz del proyecto, ejecuta:mvn spring-boot:run


Alternativamente, en IntelliJ IDEA:
Abre el proyecto.
Haz clic derecho en UserCrudApplication.java y selecciona Run.


La aplicación se iniciará en http://localhost:8080.



Documentación de la API
La API proporciona endpoints para gestionar usuarios. Todos los endpoints están bajo la ruta base /api/users.



Método
Endpoint
Descripción
Cuerpo de la Solicitud
Respuesta Esperada



POST
/api/users
Crea un nuevo usuario
JSON con name y email
JSON con el usuario creado (201 Created)


GET
/api/users
Lista todos los usuarios
Ninguno
Lista de usuarios en JSON (200 OK)


GET
/api/users/{id}
Obtiene un usuario por ID
Ninguno
JSON con el usuario (200 OK)


PUT
/api/users/{id}
Actualiza un usuario existente
JSON con name y email
JSON con el usuario actualizado (200 OK)


DELETE
/api/users/{id}
Elimina un usuario por ID
Ninguno
Sin contenido (204 No Content)


Ejemplos de Solicitudes
1. Crear un Usuario (POST)
Solicitud:
POST http://localhost:8080/api/users
Content-Type: application/json

{
    "name": "Juan",
    "email": "juan@example.com"
}

Respuesta (Código 200):
{
    "id": 1,
    "name": "Juan",
    "email": "juan@example.com"
}

2. Listar Todos los Usuarios (GET)
Solicitud:
GET http://localhost:8080/api/users

Respuesta (Código 200):
[
    {
        "id": 1,
        "name": "Juan",
        "email": "juan@example.com"
    }
]

3. Obtener un Usuario por ID (GET)
Solicitud:
GET http://localhost:8080/api/users/1

Respuesta (Código 200):
{
    "id": 1,
    "name": "Juan",
    "email": "juan@example.com"
}

4. Actualizar un Usuario (PUT)
Solicitud:
PUT http://localhost:8080/api/users/1
Content-Type: application/json

{
    "name": "Juan Perez",
    "email": "juan.perez@example.com"
}

Respuesta (Código 200):
{
    "id": 1,
    "name": "Juan Perez",
    "email": "juan.perez@example.com"
}

5. Eliminar un Usuario (DELETE)
Solicitud:
DELETE http://localhost:8080/api/users/1

Respuesta (Código 204):(Sin contenido)
Códigos de Error

400 Bad Request: El cuerpo de la solicitud es inválido (por ejemplo, JSON mal formado o campos requeridos faltantes).
404 Not Found: El usuario con el ID especificado no existe.
500 Internal Server Error: Error en el servidor, como un email duplicado (violación de la restricción unique) o problemas con la conexión a la base de datos.

Uso
Para probar la API, puedes usar Postman o cURL:

Con Postman:

Crea una nueva colección en Postman.
Agrega solicitudes para cada endpoint (POST, GET, PUT, DELETE) como se muestra en los ejemplos anteriores.
Configura el método HTTP, la URL y el cuerpo (si aplica).
Envía las solicitudes y verifica las respuestas.


Con cURL:
# Crear un usuario
curl -X POST http://localhost:8080/api/users -H "Content-Type: application/json" -d '{"name":"Juan","email":"juan@example.com"}'

# Listar usuarios
curl http://localhost:8080/api/users

# Obtener un usuario por ID
curl http://localhost:8080/api/users/1

# Actualizar un usuario
curl -X PUT http://localhost:8080/api/users/1 -H "Content-Type: application/json" -d '{"name":"Juan Perez","email":"juan.perez@example.com"}'

# Eliminar un usuario
curl -X DELETE http://localhost:8080/api/users/1


Verificar en MySQL:

Conéctate a MySQL:mysql -u root -p

Consulta la tabla users:USE users_db;
SELECT * FROM users;
