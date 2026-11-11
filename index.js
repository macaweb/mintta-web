const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function cargarProductos() {

  const data = fs.readFileSync(
    path.join(__dirname, 'data', 'productos.json')
  );

  return JSON.parse(data);

}



/* =========================
   PÁGINA PRINCIPAL
   ========================= */

app.get('/', (req, res) => {

  res.render('index');

});

/* =========================
   CATEGORÍAS
   ========================= */

app.get('/categoria/:slug', (req, res) => {


  const productos = cargarProductos();

  const slug = req.params.slug;


  const productosFiltrados = productos.filter(
    p => p.categoria === slug
  );


  if (productosFiltrados.length === 0) {

    return res.status(404).send('Categoría no encontrada');

  }


  const nombreCategoria = productosFiltrados[0].categoriaNombre;


  res.render('categoria', {

    productos: productosFiltrados,
    nombreCategoria: nombreCategoria

  });


});


/* =========================
   CARRITO
   ========================= */

app.get('/carrito', (req, res) => {

  res.render('carrito');

});


app.listen(PORT, '0.0.0.0', () => {

  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );

});


