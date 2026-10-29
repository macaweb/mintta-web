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
   REGISTRO DE CLIENTES
   ========================= */

app.post('/registro', (req, res) => {

  const {
    nombre,
    apellido,
    correo,
    celular,
    contrasena
  } = req.body;

  if (!nombre || !apellido || !correo || !celular || !contrasena) {

    return res.status(400).json({
      ok: false,
      mensaje: 'Todos los campos son obligatorios.'
    });

  }

  const rutaClientes = path.join(
    __dirname,
    'data',
    'clientes.json'
  );

  let clientes = [];

  if (fs.existsSync(rutaClientes)) {

    const data = fs.readFileSync(
      rutaClientes,
      'utf8'
    );

    if (data.trim()) {
      clientes = JSON.parse(data);
    }

  }

  const correoExiste = clientes.some(
    cliente =>
      cliente.correo.toLowerCase() ===
      correo.trim().toLowerCase()
  );

  if (correoExiste) {

    return res.status(409).json({
      ok: false,
      mensaje: 'Este correo ya está registrado.'
    });

  }

  const contrasenaSegura = crypto
    .createHash('sha256')
    .update(contrasena)
    .digest('hex');

  const nuevoCliente = {

    id: Date.now(),

    nombre: nombre.trim(),

    apellido: apellido.trim(),

    correo: correo.trim().toLowerCase(),

    celular: celular.trim(),

    contrasena: contrasenaSegura,

    primeraCompra: true,

    descuentoPrimeraCompra: 5

  };

  clientes.push(nuevoCliente);

  fs.writeFileSync(
    rutaClientes,
    JSON.stringify(clientes, null, 2)
  );

  res.json({
    ok: true,
    mensaje: '¡Registro exitoso! Has obtenido un 5% de descuento en tu primera compra.'
  });

});


/* =========================
   INICIO DE SESIÓN
   ========================= */

app.post('/login', (req, res) => {

  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {

    return res.status(400).json({
      ok: false,
      mensaje: 'Correo y contraseña son obligatorios.'
    });

  }

  const rutaClientes = path.join(
    __dirname,
    'data',
    'clientes.json'
  );

  let clientes = [];

  if (fs.existsSync(rutaClientes)) {

    const data = fs.readFileSync(
      rutaClientes,
      'utf8'
    );

    if (data.trim()) {
      clientes = JSON.parse(data);
    }

  }

  const correoNormalizado =
    correo.trim().toLowerCase();

  const cliente = clientes.find(
    cliente =>
      cliente.correo.toLowerCase() === correoNormalizado
  );

  if (!cliente) {

    return res.status(401).json({
      ok: false,
      mensaje: 'El correo o la contraseña son incorrectos.'
    });

  }

  const contrasenaSegura = crypto
    .createHash('sha256')
    .update(contrasena)
    .digest('hex');

  if (cliente.contrasena !== contrasenaSegura) {

    return res.status(401).json({
      ok: false,
      mensaje: 'El correo o la contraseña son incorrectos.'
    });

  }

  res.json({
    ok: true,
    mensaje: 'Inicio de sesión exitoso.',
    cliente: {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo
    }
  });

});

/* =========================
   RECUPERAR CONTRASEÑA
   ========================= */

app.post('/recuperar-contrasena', (req, res) => {

  const { correo } = req.body;

  if (!correo) {

    return res.status(400).json({
      ok: false,
      mensaje: 'Debes ingresar tu correo electrónico.'
    });

  }

  const rutaClientes = path.join(
    __dirname,
    'data',
    'clientes.json'
  );

  let clientes = [];

  if (fs.existsSync(rutaClientes)) {

    const data = fs.readFileSync(
      rutaClientes,
      'utf8'
    );

    if (data.trim()) {
      clientes = JSON.parse(data);
    }

  }

  const correoNormalizado =
    correo.trim().toLowerCase();

  const cliente = clientes.find(
    cliente =>
      cliente.correo.toLowerCase() === correoNormalizado
  );

  if (!cliente) {

    return res.status(404).json({
      ok: false,
      mensaje: 'No encontramos una cuenta registrada con ese correo.'
    });

  }

  // Generar token aleatorio
  const token =
    crypto.randomBytes(32).toString('hex');

  // El token tendrá una duración de 30 minutos
  const expiracion =
    Date.now() + (30 * 60 * 1000);

  // Guardar token y expiración en el cliente
  cliente.tokenRecuperacion = token;
  cliente.tokenRecuperacionExpira = expiracion;

  fs.writeFileSync(
    rutaClientes,
    JSON.stringify(clientes, null, 2)
  );

  // Crear enlace de recuperación
  const enlaceRecuperacion =
    `http://localhost:${PORT}/recuperar/${token}`;

  res.json({
    ok: true,
    mensaje: 'Solicitud de recuperación creada correctamente.',
    enlace: enlaceRecuperacion
  });

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


