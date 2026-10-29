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
      const precio = boton.dataset.precio === "" ? null : Number(boton.dataset.precio);
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

      // El contador y el acceso flotante al carrito se actualizan automáticamente.

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
  const carrito = JSON.parse(localStorage.getItem("minttaCarrito")) || [];
  const cantidadTotal = carrito.reduce(function (total, item) {
    return total + Number(item.cantidad || 0);
  }, 0);
  document.querySelectorAll("[data-cart-count]").forEach(function (contador) {
    contador.textContent = cantidadTotal;
  });
  document.querySelectorAll(".cart-float").forEach(function (enlace) {
    enlace.classList.toggle("is-visible", cantidadTotal > 0);
  });
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

    const precioPendiente = item.precio === null || item.precio === undefined || item.precio === "" || !Number.isFinite(Number(item.precio));
    const subtotal = precioPendiente ? null : Number(item.precio) * item.cantidad;

    if (subtotal !== null) total += subtotal;

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
          $ ${precioPendiente ? "Por confirmar" : Number(item.precio).toLocaleString("es-CO")}
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
          ${subtotal === null ? "Por confirmar" : "$ " + subtotal.toLocaleString("es-CO")}
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

  const hayPreciosPendientes = carrito.some(function (item) { return item.precio === null || item.precio === undefined || item.precio === "" || !Number.isFinite(Number(item.precio)); });
  totalElemento.textContent = hayPreciosPendientes ? "Por confirmar" : "$ " + total.toLocaleString("es-CO");

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

      const precioPendiente = item.precio === null || item.precio === undefined || item.precio === "" || !Number.isFinite(Number(item.precio));
      const subtotal = precioPendiente ? null : Number(item.precio) * item.cantidad;
      if (subtotal !== null) total += subtotal;

      productosTexto +=
        "• " + item.nombre + "\n" +
        "  Talla: " + item.talla + "\n" +
        "  Cantidad: " + item.cantidad + "\n" +
        "  Precio: " + (precioPendiente ? "Por confirmar" : "$ " + Number(item.precio).toLocaleString("es-CO")) + "\n" +
        "  Subtotal: " + (subtotal === null ? "Por confirmar" : "$ " + subtotal.toLocaleString("es-CO")) + "\n\n";
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
      "*TOTAL: " + (carrito.some(function (item) { return item.precio === null || item.precio === undefined || item.precio === "" || !Number.isFinite(Number(item.precio)); }) ? "POR CONFIRMAR" : "$ " + total.toLocaleString("es-CO")) + "*\\n" +
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

// Permite abrir una categoría tocando también su nombre, no solo la imagen.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".categoria-contenedor").forEach(function (contenedor) {
    contenedor.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) return;
      const enlace = contenedor.querySelector("a.categoria");
      if (enlace && enlace.href) window.location.href = enlace.href;
    });
  });
});
