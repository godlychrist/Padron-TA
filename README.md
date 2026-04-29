# 🏎️ TicoAutos - Microservicio de Padrón Electoral

## 📌 Descripción del Proyecto
Este es un microservicio autónomo y ultraligero para **TicoAutos** que actúa como un proveedor simulado de información del registro civil de Costa Rica. Su objetivo es validar números de cédula e identificar legalmente a las personas durante su registro en la plataforma.

## ⚙️ Tecnologías Utilizadas
- **Entorno:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MongoDB (mediante Mongoose)

## 🔄 Flujo de Trabajo y Arquitectura
Se trata de una API muy sencilla y desacoplada del monolito principal:

1.  **Base de Datos Dedicada**: Se conecta a su propia base de datos MongoDB dedicada exclusivamente a mantener datos de identidades.
2.  **Exposición de Ruta**: Expone un único endpoint REST GET `/api/user/:cedula`.
3.  **Proceso Transaccional**: 
    - Cuando el Frontend de TicoAutos recibe la entrada de una cédula en la vista de registro (o cuando el Backend requiere validar el dato), lanza una petición HTTP directa a este microservicio.
    - El microservicio consulta velozmente su colección y devuelve el nombre legal completo del ciudadano, confirmando su existencia.
    - Este proceso evita perfiles falsos y agiliza el *onboarding*, ya que el usuario no tiene que escribir manualmente su nombre.

## 🚀 Configuración e Instalación

### Requisitos previos
- Node.js v16+ y npm
- MongoDB en ejecución (preferiblemente poblada con la data de cédulas).

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno
Crea un archivo `.env` en el directorio:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/TicoCarsPadron
PORT=3000
```

### 3. Iniciar el servidor
```bash
npm start
```
La API del Padrón Nacional escuchará en `http://localhost:3000/`.
