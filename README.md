# CRUD Estudiantes - Node.js & Joi 🟢

## 📋 Descripción

CRUD Estudiantes es una API RESTful desarrollada en Node.js que permite la gestión eficiente de estudiantes en una institución educativa. Utiliza **Express.js** como framework principal y **Joi** para la validación robusta de datos.

**Tecnologías principales:**  
- Node.js
- Express.js
- Joi (validación de esquemas)
- dotenv (gestión de variables de entorno)

**Funcionalidades clave:**  
- CRUD de estudiantes
- Validación de datos con Joi

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 16.x
- npm >= 8.x

### Pasos de instalación

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/sacom14/node_gestion_alumnos.git
    cd NODE_UA2_AA
    ```

2. **Instala las dependencias:**
    ```bash
    npm install
    ```

3. **Configura el archivo `.env`:**  
    Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido de ejemplo:
    ```env
    PORT=3000
    ```
    > **Nota:** Ajusta los valores según tu entorno.

4. **Ejecuta el servidor:**
    ```bash
    npm run dev
    ```
    El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

| Comando         | Descripción                        |
|-----------------|------------------------------------|
| `npm start`     | Inicia el servidor en modo producción |
| `npm run dev`   | Inicia el servidor con nodemon (desarrollo) |

---

## 📁 Estructura del Proyecto

```plaintext
.
├── controllers/           # Lógica de negocio y controladores
├── routes/                # Definición de rutas y endpoints
├── schemas/               # Esquemas de validación (Joi)
│   └── studentSchema.js   # Esquema Joi para estudiantes
├── models/                # Modelos de datos (si aplica)
├── app.js                 # Configuración principal de Express
├── .env                   # Variables de entorno
├── package.json           # Dependencias y scripts
└── README.md              # Documentación del proyecto
```
> _Cada carpeta contiene archivos específicos para su responsabilidad, facilitando la escalabilidad y el mantenimiento._

---

## 📄 Descripción Detallada de Archivos

### Archivos Principales

- **server.js**  
  Configura y arranca la aplicación Express, conecta middlewares, rutas y manejo de errores.

- **routes/studentRoutes.js**  
  Define los endpoints relacionados con estudiantes (GET, POST, PUT, DELETE).

- **schemas/studentSchema.js**  
  Esquema Joi para validar los datos de estudiantes:
  ```js
  import Joi from 'joi';

  export const studentSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().integer().min(1).max(100).required(),
        email: Joi.string().email().required(),
        course: Joi.string().optional(),
        description: Joi.string().min(3).max(500).optional(),
        modified: Joi.date().default(() => new Date()),
  });
  ```

- **.env**  
  Variables de entorno para configuración sensible (puerto, URI de base de datos, etc).

### Directorios

- **controllers/**  
  Implementa la lógica de negocio para cada endpoint.

- **routes/**  
  Define las rutas y asocia cada una a su controlador correspondiente.

- **schemas/**  
  Contiene los esquemas Joi para validar los datos de entrada.

---

## 🛣️ API Routes - Documentación Detallada

### 1. Crear estudiante

- **Propósito:** Añadir un nuevo estudiante
- **Método:** `POST`
- **Endpoint:** `/students`
- **Body (JSON):**
  ```json
  {
     "name": "Juan Pérez",
     "age": 22,
     "email": "juan.perez@email.com",
     "course": "Matemáticas",
     "description": "Estudiante destacado"
  }
  ```
- **Respuesta exitosa (201):**
  ```json
  {
     "id": "abc123",
     "name": "Juan Pérez",
     "age": 22,
     "email": "juan.perez@email.com",
     "course": "Matemáticas",
     "description": "Estudiante destacado",
     "modified": "2024-06-01T12:00:00.000Z"
  }
  ```
- **Errores comunes:**
  - 400: Datos inválidos (ver validaciones de Joi)
  - 409: Email ya registrado

### 2. Obtener todos los estudiantes

- **Propósito:** Listar todos los estudiantes
- **Método:** `GET`
- **Endpoint:** `/students`
- **Respuesta exitosa (200):**
  ```json
  [
     {
        "id": "abc123",
        "name": "Juan Pérez",
        "age": 22,
        "email": "juan.perez@email.com",
        "course": "Matemáticas",
        "description": "Estudiante destacado",
        "modified": "2024-06-01T12:00:00.000Z"
     }
  ]
  ```

### 3. Obtener estudiante por ID

- **Propósito:** Consultar un estudiante específico
- **Método:** `GET`
- **Endpoint:** `/students/:id`
- **Respuesta exitosa (200):** Igual al ejemplo anterior
- **Errores comunes:**
  - 404: Estudiante no encontrado

### 4. Actualizar estudiante

- **Propósito:** Modificar datos de un estudiante
- **Método:** `PUT`
- **Endpoint:** `/students/:id`
- **Body (JSON):** Igual al de creación
- **Respuesta exitosa (200):** Estudiante actualizado
- **Errores comunes:** 400, 404

### 5. Eliminar estudiante

- **Propósito:** Eliminar un estudiante
- **Método:** `DELETE`
- **Endpoint:** `/students/:id`
- **Respuesta exitosa (204):** Sin contenido
- **Errores comunes:** 404

---

## 🔧 Funcionalidades Detalladas

- **Validación de datos:**  
  Todos los endpoints que reciben datos usan el esquema Joi (`studentSchema.js`). Ejemplo de validación:
  ```js
  const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  ```

- **Manejo de errores:**  
  Middleware centralizado para capturar y responder errores de forma uniforme.

- **Persistencia de datos:**  
  [Explica si usas base de datos o almacenamiento en memoria. Ejemplo:]
  - Por defecto, los datos se almacenan en memoria (array JS).
  - Si se configura `DB_URI`, se conecta a MongoDB.

---

## 🧪 Pruebas

### Ejemplo con cURL

- **Crear estudiante:**
  ```bash
  curl -X POST http://localhost:3000/students \
     -H "Content-Type: application/json" \
     -d '{"name":"Ana López","age":20,"email":"ana.lopez@email.com"}'
  ```

---

## 📊 Datos Iniciales

- Puedes cargar datos de ejemplo en `data/students.json`.
- Para desarrollo, se incluyen algunos estudiantes de prueba.

---

## 👤 Información del autor

- **Autor:** Samir Comas Moral
- **Fecha:** Junio 2025
- **Versión:** 1.0.0
