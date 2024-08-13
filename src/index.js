const express = require("express");
const app = express();
const path = require("path");
const taskRoutes = require("./routes/task");
const PORT = 3000;

// Configuración de EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
app.use(taskRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
