/* =========================================================
   MENÚ LATERAL
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  const menuBtn = document.querySelector(".menu-btn");
  const menuPanel = document.querySelector(".menu-panel");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuClose = document.querySelector(".menu-close");


  // Verifica que exista el menú en la página

  if (!menuBtn || !menuPanel || !menuOverlay || !menuClose) {
    return;
  }



  /* =========================
     ABRIR MENÚ
     ========================= */

  menuBtn.addEventListener("click", () => {

    menuPanel.classList.add("active");
    menuOverlay.classList.add("active");

  });



  /* =========================
     CERRAR CON X
     ========================= */

  menuClose.addEventListener("click", () => {

    menuPanel.classList.remove("active");
    menuOverlay.classList.remove("active");

  });



  /* =========================
     CERRAR AL TOCAR AFUERA
     ========================= */

  menuOverlay.addEventListener("click", () => {

    menuPanel.classList.remove("active");
    menuOverlay.classList.remove("active");

  });



  /* =========================
     CERRAR CON ESC
     ========================= */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      menuPanel.classList.remove("active");
      menuOverlay.classList.remove("active");

    }

  });


});

/* =========================
   AVISO FLOTANTE - REGISTRO
   ========================= */

const registroFlotante = document.querySelector(".registro-flotante");
const registroCerrar = document.querySelector(".registro-flotante-cerrar");
const registroAhoraNo = document.querySelector(".registro-flotante-no");

// Mostrar el aviso únicamente en la página de Inicio
const esInicio =
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html";

const vieneDeNuevasPiezas =
  window.location.hash === "#novedades";

// Ocultar el aviso si venimos desde "Nuevas piezas"
if (registroFlotante && esInicio && vieneDeNuevasPiezas) {
  registroFlotante.style.display = "none";
}

// Cerrar el aviso con la X
if (registroCerrar && registroFlotante) {
  registroCerrar.addEventListener("click", () => {
    registroFlotante.style.display = "none";
  });
}

// Cerrar el aviso con "Ahora no"
if (registroAhoraNo && registroFlotante) {
  registroAhoraNo.addEventListener("click", () => {
    registroFlotante.style.display = "none";
  });
}
/* =========================
   FORMULARIO DE REGISTRO
   ========================= */

const registroFlotanteBtn = document.querySelector(".registro-flotante-btn");
const registroModal = document.querySelector(".registro-modal");
const registroModalCerrar = document.querySelector(".registro-modal-cerrar");

if (registroFlotanteBtn && registroModal) {

  registroFlotanteBtn.addEventListener("click", (e) => {

    e.preventDefault();

    if (registroFlotante) {
      registroFlotante.style.display = "none";
    }

    registroModal.classList.add("activo");

  });

}

if (registroModalCerrar && registroModal) {

  registroModalCerrar.addEventListener("click", () => {

    registroModal.classList.remove("activo");

  });

}
/* =========================
   REGISTRARSE DESDE EL MENÚ
   ========================= */

const menuLinkRegistro = document.querySelector(".menu-link-registro");

if (menuLinkRegistro && registroModal) {

  menuLinkRegistro.addEventListener("click", (e) => {

    e.preventDefault();

    if (registroFlotante) {
      registroFlotante.style.display = "none";
    }

    registroModal.classList.add("activo");

  });

}
/* =========================
   CREAR CUENTA
   ========================= */

const registroForm = document.querySelector(".registro-form");
const registroExito = document.querySelector(".registro-exito");
const registroExitoCerrar = document.querySelector(".registro-exito-cerrar");
const registroExitoContinuar = document.querySelector(".registro-exito-continuar");

if (registroForm) {

  registroForm.addEventListener("submit", async (e) => {

    e.preventDefault();

  const datos = {
  nombre: registroForm.nombre.value,
  apellido: registroForm.apellido.value,
  correo: registroForm.correo.value,
  celular: registroForm.celular.value,
  contrasena: registroForm.contrasena.value
};

    try {

      const respuesta = await fetch("/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (resultado.ok) {

        registroForm.reset();

        registroModal.classList.remove("activo");

        registroExito.classList.add("activo");

      } else {

        alert(resultado.mensaje);

      }

    } catch (error) {

      console.error("Error al registrar:", error);

      alert(
        "No fue posible completar el registro. Inténtalo nuevamente."
      );

    }

  });

}

/* =========================
   REGISTRO EXITOSO
   ========================= */

if (registroExito) {

  registroExitoCerrar.addEventListener("click", () => {

    registroExito.classList.remove("activo");

  });

  registroExitoContinuar.addEventListener("click", () => {

    registroExito.classList.remove("activo");

  });

}

 /* =========================
    INICIAR SESIÓN
    ========================= */

const menuLinkLogin = document.querySelector(".menu-link-login");
const loginModal = document.querySelector(".login-modal");
const loginModalCerrar = document.querySelector(".login-modal-cerrar");

if (menuLinkLogin && loginModal) {

  menuLinkLogin.addEventListener("click", (e) => {

    e.preventDefault();

    loginModal.classList.add("activo");

  });

}

if (loginModalCerrar && loginModal) {

  loginModalCerrar.addEventListener("click", () => {

    loginModal.classList.remove("activo");

  });

}

/* =========================
   RECUPERAR CONTRASEÑA
   ========================= */

const loginOlvido =
  document.querySelector(".login-olvido");

const recuperarModal =
  document.querySelector(".recuperar-modal");

const recuperarModalCerrar =
  document.querySelector(".recuperar-modal-cerrar");

const recuperarVolverLogin =
  document.querySelector(".recuperar-volver-login");


/* Abrir recuperación desde el login */

if (loginOlvido && loginModal && recuperarModal) {

  loginOlvido.addEventListener("click", () => {

    loginModal.classList.remove("activo");

    recuperarModal.classList.add("activo");

  });

}


/* Cerrar recuperación con la X */

if (recuperarModalCerrar && recuperarModal) {

  recuperarModalCerrar.addEventListener("click", () => {

    recuperarModal.classList.remove("activo");

  });

}


/* Volver al inicio de sesión */

if (
  recuperarVolverLogin &&
  recuperarModal &&
  loginModal
) {

  recuperarVolverLogin.addEventListener("click", () => {

    recuperarModal.classList.remove("activo");

    loginModal.classList.add("activo");

  });

}

/* =========================
   FORMULARIO - RECUPERAR CONTRASEÑA
   ========================= */

const recuperarForm =
  document.querySelector(".recuperar-form");

if (recuperarForm) {

  recuperarForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo =
      recuperarForm.correo.value.trim();

    try {

      const respuesta = await fetch("/recuperar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: correo
        })
      });

      const resultado = await respuesta.json();

      if (resultado.ok) {

        alert(resultado.mensaje);

        recuperarForm.reset();

      } else {

        alert(resultado.mensaje);

      }

    } catch (error) {

      console.error(
        "Error al recuperar contraseña:",
        error
      );

      alert(
        "No fue posible procesar la solicitud. Inténtalo nuevamente."
      );

    }

  });

}

/* =========================
   IR A REGISTRO DESDE LOGIN
   ========================= */

const loginIrRegistro =
  document.querySelector(".login-ir-registro");

if (loginIrRegistro && loginModal && registroModal) {

  loginIrRegistro.addEventListener("click", () => {

    loginModal.classList.remove("activo");

    registroModal.classList.add("activo");

  });

}

/* =========================
   FORMULARIO - INICIAR SESIÓN
   ========================= */

const loginForm = document.querySelector(".login-form");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const datos = {
      correo: loginForm.correo.value,
      contrasena: loginForm.contrasena.value
    };

    try {

      const respuesta = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (resultado.ok) {

        alert(
          "¡Bienvenida, " +
          resultado.cliente.nombre +
          "!"
        );

        loginForm.reset();

        loginModal.classList.remove("activo");

      } else {

        alert(resultado.mensaje);

      }

    } catch (error) {

      console.error("Error al iniciar sesión:", error);

      alert(
        "No fue posible iniciar sesión. Inténtalo nuevamente."
      );

    }

  });

}

// ========================================
// CARRITO MINTTA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const botonesTalla = document.querySelectorAll(".talla");
  const botonesAgregar = document.querySelectorAll(".btn-agregar");

  // Selección de talla
  botonesTalla.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const producto = boton.closest(".producto");

      // Quitar selección de las demás tallas
      producto.querySelectorAll(".talla").forEach(function (otraTalla) {
        otraTalla.classList.remove("selected");
      });

      // Marcar la talla seleccionada
      boton.classList.add("selected");

    });

  });


  // Agregar producto al carrito
  botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

      const producto = boton.closest(".producto");

      const tallaSeleccionada =
        producto.querySelector(".talla.selected");

      // Verificar que haya una talla seleccionada
      if (!tallaSeleccionada) {
        alert("Por favor selecciona una talla.");
        return;
      }

      const nombre = boton.dataset.producto;
      const precio = Number(boton.dataset.precio);
      const talla = tallaSeleccionada.dataset.talla;
      const imagen = boton.dataset.imagen;

      // Obtener carrito actual
      let carrito =
        JSON.parse(localStorage.getItem("minttaCarrito")) || [];

      // Buscar si ya existe el mismo producto con la misma talla
      const productoExistente = carrito.find(function (item) {
        return item.nombre === nombre && item.talla === talla;
      });

      if (productoExistente) {

        productoExistente.cantidad += 1;

      } else {

        carrito.push({
          nombre: nombre,
          precio: precio,
          talla: talla,
          imagen: imagen,
          cantidad: 1
        });

      }

      // Guardar carrito
      localStorage.setItem(
        "minttaCarrito",
        JSON.stringify(carrito)
      );

      // Actualizar contador
      actualizarContadorCarrito();

      // Quitar el resaltado de la talla después de agregar
      tallaSeleccionada.classList.remove("selected");

      alert("Producto agregado al carrito.");

    });

  });

});



// ========================================
// ACTUALIZAR CONTADOR DEL CARRITO
// ========================================
// IMPORTANTE:
// Esta función está fuera del DOMContentLoaded
// para que también pueda ser utilizada por
// los botones +, -, y Eliminar.

function actualizarContadorCarrito() {

  const contador =
    document.getElementById("contador-carrito");

  if (!contador) {
    return;
  }

  const carrito =
    JSON.parse(localStorage.getItem("minttaCarrito")) || [];

  const cantidadTotal = carrito.reduce(function (total, item) {
    return total + item.cantidad;
  }, 0);

  contador.textContent = cantidadTotal;

}

document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
});

// ========================================
// MOSTRAR PRODUCTOS DEL CARRITO
// ========================================

function mostrarCarrito() {

  const contenedor = document.getElementById("carrito-contenido");
  const carritoVacio = document.getElementById("carrito-vacio");
  const carritoResumen = document.getElementById("carrito-resumen");
  const totalElemento = document.getElementById("carrito-total");

  // Si no estamos en la página del carrito, no hacemos nada
  if (!contenedor) {
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("minttaCarrito")) || [];

  // Carrito vacío
  if (carrito.length === 0) {

    contenedor.innerHTML = "";

    carritoVacio.style.display = "block";
    carritoResumen.style.display = "none";

    return;
  }

  carritoVacio.style.display = "none";
  carritoResumen.style.display = "block";

  let total = 0;

  contenedor.innerHTML = "";

  carrito.forEach(function (item, indice) {

    const subtotal = item.precio * item.cantidad;

    total += subtotal;

    // Se crea el elemento del producto (antes faltaba esta línea)
    const productoHTML = document.createElement("div");
    productoHTML.classList.add("carrito-producto");

    productoHTML.innerHTML = `
      <div class="carrito-producto-imagen">
        <img
          src="${item.imagen || ''}"
          alt="${item.nombre}"
        >
      </div>

      <div class="carrito-producto-info">

        <h3>${item.nombre}</h3>

        <p>
          Talla: ${item.talla}
        </p>

        <p>
          $ ${item.precio.toLocaleString("es-CO")}
        </p>

      </div>

      <div class="carrito-cantidad">

        <button
          type="button"
          class="btn-cantidad"
          data-indice="${indice}"
          data-accion="restar"
        >
          −
        </button>

        <span>
          ${item.cantidad}
        </span>

        <button
          type="button"
          class="btn-cantidad"
          data-indice="${indice}"
          data-accion="sumar"
        >
          +
        </button>

      </div>

      <div class="carrito-subtotal">

        <strong>
          $ ${subtotal.toLocaleString("es-CO")}
        </strong>

        <button
          type="button"
          class="btn-eliminar"
          data-indice="${indice}"
        >
          Eliminar
        </button>

      </div>
    `;

    contenedor.appendChild(productoHTML);

  });

  totalElemento.textContent =
    "$ " + total.toLocaleString("es-CO");

}


// ========================================
// MOSTRAR CARRITO AL CARGAR LA PÁGINA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  mostrarCarrito();

});


// ========================================
// BOTONES DEL CARRITO
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const contenedorCarrito = document.getElementById("carrito-contenido");

  if (!contenedorCarrito) {
    return;
  }


  contenedorCarrito.addEventListener("click", function (e) {

    const botonCantidad = e.target.closest(".btn-cantidad");
    const botonEliminar = e.target.closest(".btn-eliminar");


    // ========================================
    // SUMAR / RESTAR CANTIDAD
    // ========================================

    if (botonCantidad) {

      const indice = Number(botonCantidad.dataset.indice);
      const accion = botonCantidad.dataset.accion;

      const carrito =
        JSON.parse(localStorage.getItem("minttaCarrito")) || [];


      if (!carrito[indice]) {
        return;
      }


      // SUMAR
      if (accion === "sumar") {

        carrito[indice].cantidad += 1;

      }


      // RESTAR
      if (accion === "restar") {

        if (carrito[indice].cantidad > 1) {

          carrito[indice].cantidad -= 1;

        }

      }


      // Guardar cambios
      localStorage.setItem(
        "minttaCarrito",
        JSON.stringify(carrito)
      );


      // Actualizar contador y carrito
      actualizarContadorCarrito();
      mostrarCarrito();

      return;

    }


    // ========================================
    // ELIMINAR PRODUCTO
    // ========================================

    if (botonEliminar) {

      const indice = Number(botonEliminar.dataset.indice);

      const carrito =
        JSON.parse(localStorage.getItem("minttaCarrito")) || [];


      if (!carrito[indice]) {
        return;
      }


      carrito.splice(indice, 1);


      // Guardar cambios
      localStorage.setItem(
        "minttaCarrito",
        JSON.stringify(carrito)
      );


      // Actualizar contador y carrito
      actualizarContadorCarrito();
      mostrarCarrito();

    }

  });

});

// ========================================
// CONTINUAR CON EL PEDIDO
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const botonContinuar = document.getElementById("btn-continuar-pedido");
  const formularioPedido = document.getElementById("formulario-pedido");

  if (!botonContinuar || !formularioPedido) {
    return;
  }

  botonContinuar.addEventListener("click", function () {

    formularioPedido.style.display = "block";

    formularioPedido.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});

// ========================================
// CONTINUAR AL MEDIO DE PAGO
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const formulario = document.getElementById("pedido-form");
  const medioPago = document.getElementById("medio-pago");

  if (!formulario || !medioPago) {
    return;
  }

  formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    medioPago.style.display = "block";

    medioPago.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});

// ========================================
// ENVIAR PEDIDO POR WHATSAPP
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const botonWhatsApp = document.getElementById("btn-enviar-whatsapp");

  if (!botonWhatsApp) {
    return;
  }

  botonWhatsApp.addEventListener("click", function () {

    // ----------------------------------------
    // Verificar medio de pago
    // ----------------------------------------

    const pagoSeleccionado = document.querySelector(
      'input[name="medioPago"]:checked'
    );

    if (!pagoSeleccionado) {

      alert("Por favor selecciona un medio de pago.");

      return;

    }


    // ----------------------------------------
    // Obtener datos del cliente
    // ----------------------------------------

    const nombre = document.getElementById("pedido-nombre").value.trim();
    const celular = document.getElementById("pedido-celular").value.trim();
    const ciudad = document.getElementById("pedido-ciudad").value.trim();
    const direccion = document.getElementById("pedido-direccion").value.trim();
    const barrio = document.getElementById("pedido-barrio").value.trim();
    const observaciones = document.getElementById("pedido-observaciones").value.trim();


    // ----------------------------------------
    // Obtener carrito
    // ----------------------------------------

    const carrito =
      JSON.parse(localStorage.getItem("minttaCarrito")) || [];


    if (carrito.length === 0) {

      alert("El carrito está vacío.");

      return;

    }


    // ----------------------------------------
    // Construir productos
    // ----------------------------------------

    let total = 0;

    let productosTexto = "";


    carrito.forEach(function (item) {

      const subtotal = item.precio * item.cantidad;

      total += subtotal;

      productosTexto +=
        "• " + item.nombre + "\n" +
        "  Talla: " + item.talla + "\n" +
        "  Cantidad: " + item.cantidad + "\n" +
        "  Precio: $ " + item.precio.toLocaleString("es-CO") + "\n" +
        "  Subtotal: $ " + subtotal.toLocaleString("es-CO") + "\n\n";

    });


    // ----------------------------------------
    // Construir mensaje
    // ----------------------------------------

    const mensaje =

      "🛍️ *PEDIDO MINTTA*\n\n" +

      "🔴 *ESTADO: PENDIENTE DE PAGO*\n\n" +

      "━━━━━━━━━━━━━━━━━━\n" +
      "*PRODUCTOS*\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +

      productosTexto +

      "━━━━━━━━━━━━━━━━━━\n" +
      "*TOTAL: $ " + total.toLocaleString("es-CO") + "*\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +

      "📦 *DATOS DE ENTREGA*\n\n" +

      "Nombre: " + nombre + "\n" +
      "Celular: " + celular + "\n" +
      "Ciudad: " + ciudad + "\n" +
      "Dirección: " + direccion + "\n" +
      "Barrio: " + barrio + "\n" +
      "Observaciones: " +
      (observaciones || "Ninguna") + "\n\n" +

      "💳 *MEDIO DE PAGO*\n" +
      pagoSeleccionado.value + "\n\n" +

      "🔴 *PENDIENTE DE PAGO*";


    // ----------------------------------------
    // Abrir WhatsApp
    // ----------------------------------------

    const numeroWhatsApp = "573022061132";

    const urlWhatsApp =
      "https://wa.me/" +
      numeroWhatsApp +
      "?text=" +
      encodeURIComponent(mensaje);


    window.open(urlWhatsApp, "_blank");

  });

});