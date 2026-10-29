const fs = require("fs");
const path = require("path");

const root = __dirname;
const output = path.join(root, "dist");
const pages = [
  "index.html",
  "catalogo.html",
  "categoria.html",
  "carrito.html",
  "politicas-envio.html",
  "politicas-devolucion.html",
  "terminos-condiciones.html"
];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const page of pages) {
  fs.copyFileSync(path.join(root, page), path.join(output, page));
}

for (const folder of ["css", "js", "img"]) {
  fs.cpSync(path.join(root, folder), path.join(output, folder), { recursive: true });
}

fs.mkdirSync(path.join(output, "data"), { recursive: true });
fs.copyFileSync(
  path.join(root, "data", "productos.json"),
  path.join(output, "data", "productos.json")
);

console.log("Mintta static site built in ./dist");
