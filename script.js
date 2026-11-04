
"use strict";

/* =========================================================
   MIS FINANZAS 2.0
   Moneda principal inicial: CRC
   Tipos de cambio: automático + manual
   ========================================================= */

const MONEDAS = {
  CRC: { nombre: "Colón costarricense", simbolo: "₡" },
  USD: { nombre: "Dólar estadounidense", simbolo: "$" },
  EUR: { nombre: "Euro", simbolo: "€" },
  MXN: { nombre: "Peso mexicano", simbolo: "$" },
  GBP: { nombre: "Libra esterlina", simbolo: "£" },
  BRL: { nombre: "Real brasileño", simbolo: "R$" },
  COP: { nombre: "Peso colombiano", simbolo: "$" },
  CAD: { nombre: "Dólar canadiense", simbolo: "C$" }
};

const CLAVES = {
  movimientos: "mf_movimientos_v2",
  metas: "mf_metas_v2",
  operacionesAhorro: "mf_operaciones_ahorro_v2",
  presupuestos: "mf_presupuestos_v2",
  recurrentes: "mf_recurrentes_v2",
  configuracion: "mf_configuracion_v2"
};

const $ = id => document.getElementById(id);

function leer(clave, defecto) {
  try {
    const dato = localStorage.getItem(clave);
    return dato ? JSON.parse(dato) : defecto;
  } catch {
    return defecto;
  }
}

function guardar(clave, dato) {
  localStorage.setItem(clave, JSON.stringify(dato));
}

let movimientos = leer(CLAVES.movimientos, []);
let metas = leer(CLAVES.metas, []);
let operacionesAhorro = leer(CLAVES.operacionesAhorro, []);
let presupuestos = leer(CLAVES.presupuestos, []);
let recurrentes = leer(CLAVES.recurrentes, []);

let configuracion = leer(CLAVES.configuracion, {
  monedaPrincipal: "CRC",
  tasas: {
    CRC: 1,
    USD: 500,
    EUR: 540,
    MXN: 29,
    GBP: 630,
    BRL: 95,
    COP: 0.125,
    CAD: 360
  },
  tasasAutomaticas: {},
  fechaActualizacion: null
});

let graficoGastos = null;
let graficoComparacion = null;

function idNuevo() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function hoy() {
  const fecha = new Date();
  const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function mesActual() {
  return hoy().slice(0, 7);
}

function monedaPrincipal() {
  return configuracion.monedaPrincipal || "CRC";
}

function formato(monto, moneda = monedaPrincipal()) {
  const simbolo = MONEDAS[moneda]?.simbolo || moneda + " ";
  return simbolo + Number(monto || 0).toLocaleString("es-CR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/*
  Las tasas representan cuántas unidades de la moneda
  principal equivalen a una unidad de la moneda indicada.
*/

function tasa(moneda) {
  if (moneda === monedaPrincipal()) return 1;

  const automaticas = configuracion.tasasAutomaticas || {};
  const manuales = configuracion.tasas || {};

  const valor = automaticas[moneda] || manuales[moneda];
  return Number(valor) > 0 ? Number(valor) : null;
}

function convertir(monto, monedaOrigen) {
  const valor = Number(monto) || 0;
  const cambio = tasa(monedaOrigen);

  if (cambio === null) return null;

  return valor * cambio;
}

function convertirDesdePrincipal(montoPrincipal, monedaDestino) {
  const cambio = tasa(monedaDestino);

  if (!cambio) return null;

  return Number(montoPrincipal) / cambio;
}

function guardarTodo() {
  guardar(CLAVES.movimientos, movimientos);
  guardar(CLAVES.metas, metas);
  guardar(CLAVES.operacionesAhorro, operacionesAhorro);
  guardar(CLAVES.presupuestos, presupuestos);
  guardar(CLAVES.recurrentes, recurrentes);
  guardar(CLAVES.configuracion, configuracion);
}

function aviso(mensaje) {
  alert(mensaje);
}

function obtenerValor(id) {
  return $(id)?.value?.trim() || "";
}

function numero(id) {
  return Number(obtenerValor(id));
}

function fechaValida(fecha) {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha);
}

function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caracter]);
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

const secciones = [
  "inicio",
  "movimientos",
  "ahorros",
  "presupuestos",
  "recurrentes",
  "estadisticas",
  "consejos",
  "configuracion"
];

function navegar(nombre) {
  const menu = $("menu-mas");

  if (nombre === "mas") {
    menu.hidden = !menu.hidden;
    return;
  }

  if (!secciones.includes(nombre)) return;

  secciones.forEach(id => {
    $(id)?.classList.toggle("active", id === nombre);
  });

  document.querySelectorAll(".nav-button").forEach(boton => {
    boton.classList.toggle("active", boton.dataset.section === nombre);
  });

  if (menu) menu.hidden = true;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (nombre === "estadisticas") actualizarEstadisticas();
  if (nombre === "inicio") actualizarInicio();
}

document.querySelectorAll(".nav-button").forEach(boton => {
  boton.addEventListener("click", () => navegar(boton.dataset.section));
});

document.querySelectorAll("#menu-mas button").forEach(boton => {
  boton.addEventListener("click", () => navegar(boton.dataset.section));
});

document.querySelectorAll("[data-go]").forEach(boton => {
  boton.addEventListener("click", () => {
    navegar(boton.dataset.go);

    if (boton.dataset.action) {
      $("mov-tipo").value = boton.dataset.action;
      $("mov-descripcion").focus();
    }
  });
});

$("btn-settings")?.addEventListener("click", () => navegar("configuracion"));

/* =========================================================
   MOVIMIENTOS
   ========================================================= */

$("mov-fecha").value = hoy();

$("form-movimiento").addEventListener("submit", evento => {
  evento.preventDefault();

  const tipo = obtenerValor("mov-tipo");
  const descripcion = obtenerValor("mov-descripcion");
  const monto = numero("mov-monto");
  const moneda = obtenerValor("mov-moneda");
  const categoria = obtenerValor("mov-categoria");
  const fecha = obtenerValor("mov-fecha");

  if (!descripcion || monto <= 0 || !MONEDAS[moneda] || !fechaValida(fecha)) {
    aviso("Revisa los datos del movimiento.");
    return;
  }

  movimientos.push({
    id: idNuevo(),
    tipo,
    descripcion,
    monto,
    moneda,
    categoria,
    fecha,
    creado: new Date().toISOString()
  });

  guardarTodo();
  evento.target.reset();
  $("mov-fecha").value = hoy();

  actualizarTodo();
  aviso("Movimiento guardado correctamente.");
});

function movimientosDelMes(mes) {
  return movimientos.filter(m => m.fecha.startsWith(mes));
}

function sumarMovimientos(lista, tipo) {
  return lista
    .filter(m => m.tipo === tipo)
    .reduce((total, m) => {
      const convertido = convertir(m.monto, m.moneda);
      return convertido === null ? total : total + convertido;
    }, 0);
}

function actualizarInicio() {
  const mes = $("filtro-mes-inicio").value || mesActual();
  const lista = movimientosDelMes(mes);

  const ingresos = sumarMovimientos(lista, "ingreso");
  const gastos = sumarMovimientos(lista, "gasto");
  const ahorrado = totalAhorrosPrincipal();

  $("inicio-ingresos").textContent = formato(ingresos);
  $("inicio-gastos").textContent = formato(gastos);
  $("balance-total").textContent = formato(ingresos - gastos - ahorrado);

  $("resumen-ingresos").textContent = formato(ingresos);
  $("resumen-gastos").textContent = formato(gastos);
  $("resumen-ahorros").textContent = formato(ahorrado);
  $("resumen-disponible").textContent = formato(ingresos - gastos - ahorrado);

  const recientes = [...movimientos]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 5);

  $("movimientos-recientes").innerHTML = recientes.length
    ? recientes.map(htmlMovimiento).join("")
    : '<p class="empty-state">Todavía no tienes movimientos.</p>';
}

function htmlMovimiento(m) {
  const esIngreso = m.tipo === "ingreso";
  const convertido = convertir(m.monto, m.moneda);
  const signo = esIngreso ? "+" : "−";

  return `
    <article class="movement-item summary-card">
      <div>
        <strong>${escapar(m.descripcion)}</strong>
        <p class="small-note">${escapar(m.categoria)} · ${escapar(m.fecha)}</p>
        <small>${formato(m.monto, m.moneda)}</small>
      </div>
      <div>
        <strong style="color:${esIngreso ? "var(--green)" : "var(--red)"}">
          ${signo}${convertido === null ? "Sin tasa" : formato(convertido)}
        </strong>
        <button type="button" class="text-button" data-eliminar-movimiento="${m.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function actualizarListaMovimientos() {
  const tipo = obtenerValor("filtro-tipo-movimiento") || "todos";
  const mes = obtenerValor("filtro-mes-movimientos");
  const moneda = obtenerValor("filtro-moneda-movimientos") || "todas";

  const lista = movimientos.filter(m => {
    return (tipo === "todos" || m.tipo === tipo) &&
      (!mes || m.fecha.startsWith(mes)) &&
      (moneda === "todas" || m.moneda === moneda);
  }).sort((a, b) => b.fecha.localeCompare(a.fecha));

  $("lista-movimientos").innerHTML = lista.length
    ? lista.map(htmlMovimiento).join("")
    : '<p class="empty-state">No hay movimientos con esos filtros.</p>';
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-eliminar-movimiento]");
  if (!boton) return;

  if (!confirm("¿Deseas eliminar este movimiento?")) return;

  movimientos = movimientos.filter(m => m.id !== boton.dataset.eliminarMovimiento);
  guardarTodo();
  actualizarTodo();
});

["filtro-tipo-movimiento", "filtro-mes-movimientos", "filtro-moneda-movimientos"]
  .forEach(id => $(id).addEventListener("change", actualizarListaMovimientos));

$("filtro-mes-inicio").value = mesActual();
$("filtro-mes-inicio").addEventListener("change", actualizarInicio);

/* =========================================================
   AHORROS Y METAS
   ========================================================= */

$("ahorro-fecha-movimiento").value = hoy();

function saldoMeta(metaId) {
  return operacionesAhorro
    .filter(o => o.metaId === metaId)
    .reduce((total, o) => {
      const valor = convertir(o.monto, o.moneda);
      if (valor === null) return total;
      return total + (o.tipo === "deposito" ? valor : -valor);
    }, 0);
}

function totalAhorrosPrincipal() {
  return metas.reduce((total, meta) => total + saldoMeta(meta.id), 0);
}

$("form-meta-ahorro").addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = obtenerValor("ahorro-nombre");
  const objetivo = numero("ahorro-objetivo");
  const moneda = obtenerValor("ahorro-moneda");
  const fecha = obtenerValor("ahorro-fecha-meta");

  if (!nombre || objetivo <= 0 || !MONEDAS[moneda]) {
    aviso("Revisa los datos de la meta.");
    return;
  }

  metas.push({
    id: idNuevo(),
    nombre,
    objetivo,
    moneda,
    fecha
  });

  guardarTodo();
  evento.target.reset();
  actualizarTodo();
  aviso("Meta de ahorro creada.");
});

$("form-movimiento-ahorro").addEventListener("submit", evento => {
  evento.preventDefault();

  const metaId = obtenerValor("ahorro-meta-seleccionada");
  const tipo = obtenerValor("ahorro-tipo");
  const monto = numero("ahorro-monto");
  const moneda = obtenerValor("ahorro-moneda-movimiento");
  const fecha = obtenerValor("ahorro-fecha-movimiento");

  if (!metas.some(m => m.id === metaId) || monto <= 0 ||
      !MONEDAS[moneda] || !fechaValida(fecha)) {
    aviso("Revisa los datos de la operación.");
    return;
  }

  const meta = metas.find(m => m.id === metaId);
  const nuevoValor = convertir(monto, moneda);
  const saldo = saldoMeta(metaId);

  if (nuevoValor === null) {
    aviso("No existe un tipo de cambio para esa moneda.");
    return;
  }

  if (tipo === "retiro" && nuevoValor > saldo) {
    aviso("No puedes retirar más dinero del que tiene esta meta.");
    return;
  }

  operacionesAhorro.push({
    id: idNuevo(),
    metaId,
    tipo,
    monto,
    moneda,
    fecha
  });

  guardarTodo();
  evento.target.reset();
  $("ahorro-fecha-movimiento").value = hoy();
  actualizarTodo();
  aviso(tipo === "deposito" ? "Ahorro registrado." : "Retiro registrado.");
});

function actualizarAhorros() {
  $("total-ahorros").textContent = formato(totalAhorrosPrincipal());

  $("ahorro-meta-seleccionada").innerHTML =
    '<option value="">Selecciona una meta</option>' +
    metas.map(m => `<option value="${m.id}">${escapar(m.nombre)}</option>`).join("");

  $("lista-metas-ahorro").innerHTML = metas.length
    ? metas.map(meta => {
      const saldo = saldoMeta(meta.id);
      const objetivo = convertir(meta.objetivo, meta.moneda);
      const porcentaje = objetivo > 0 ? Math.min(100, Math.max(0, saldo / objetivo * 100)) : 0;
      const saldoEnMonedaMeta = convertirDesdePrincipal(saldo, meta.moneda);

      return `
        <article class="form-card">
          <h3>${escapar(meta.nombre)}</h3>
          <p class="small-note">Meta: ${formato(meta.objetivo, meta.moneda)}</p>
          <p><strong>${saldoEnMonedaMeta === null ? formato(saldo) : formato(saldoEnMonedaMeta, meta.moneda)}</strong> acumulados</p>
          <div style="height:10px;background:#edf0f4;border-radius:20px;overflow:hidden;margin:12px 0">
            <div style="height:100%;width:${porcentaje}%;background:var(--green);border-radius:20px"></div>
          </div>
          <p class="small-note">${porcentaje.toFixed(1)}% de la meta · ${meta.fecha ? "Fecha objetivo: " + escapar(meta.fecha) : "Sin fecha objetivo"}</p>
          <button type="button" class="text-button" data-eliminar-meta="${meta.id}">Eliminar meta</button>
        </article>
      `;
    }).join("")
    : '<p class="empty-state">Todavía no has creado metas.</p>';
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-eliminar-meta]");
  if (!boton) return;

  const id = boton.dataset.eliminarMeta;

  if (!confirm("¿Eliminar esta meta y todas sus operaciones de ahorro?")) return;

  metas = metas.filter(m => m.id !== id);
  operacionesAhorro = operacionesAhorro.filter(o => o.metaId !== id);
  guardarTodo();
  actualizarTodo();
});

/* =========================================================
   PRESUPUESTOS
   ========================================================= */

$("form-presupuesto").addEventListener("submit", evento => {
  evento.preventDefault();

  const categoria = obtenerValor("presupuesto-categoria");
  const monto = numero("presupuesto-monto");
  const moneda = obtenerValor("presupuesto-moneda");

  if (monto <= 0 || !MONEDAS[moneda]) {
    aviso("Revisa el monto del presupuesto.");
    return;
  }

  const existente = presupuestos.find(p =>
    p.categoria === categoria && p.moneda === moneda
  );

  if (existente) {
    existente.monto = monto;
  } else {
    presupuestos.push({
      id: idNuevo(),
      categoria,
      monto,
      moneda
    });
  }

  guardarTodo();
  evento.target.reset();
  actualizarTodo();
  aviso("Presupuesto guardado.");
});

function actualizarPresupuestos() {
  const gastos = movimientosDelMes(mesActual()).filter(m => m.tipo === "gasto");

  $("lista-presupuestos").innerHTML = presupuestos.length
    ? presupuestos.map(p => {
      const limite = convertir(p.monto, p.moneda);
      const usado = gastos
        .filter(g => g.categoria === p.categoria)
        .reduce((total, g) => total + (convertir(g.monto, g.moneda) || 0), 0);

      const porcentaje = limite > 0 ? Math.min(100, usado / limite * 100) : 0;

      return `
        <article class="form-card">
          <h3>${escapar(p.categoria)}</h3>
          <p>${formato(usado)} de ${formato(limite || 0)}</p>
          <div style="height:10px;background:#edf0f4;border-radius:20px;overflow:hidden;margin:12px 0">
            <div style="height:100%;width:${porcentaje}%;background:${porcentaje >= 100 ? "var(--red)" : "var(--blue)"}"></div>
          </div>
          <p class="small-note">${porcentaje.toFixed(1)}% utilizado</p>
          <button type="button" class="text-button" data-eliminar-presupuesto="${p.id}">Eliminar presupuesto</button>
        </article>
      `;
    }).join("")
    : '<p class="empty-state">Todavía no has creado presupuestos.</p>';
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-eliminar-presupuesto]");
  if (!boton) return;

  presupuestos = presupuestos.filter(p => p.id !== boton.dataset.eliminarPresupuesto);
  guardarTodo();
  actualizarTodo();
});

/* =========================================================
   GASTOS RECURRENTES
   ========================================================= */

$("form-recurrente").addEventListener("submit", evento => {
  evento.preventDefault();

  const descripcion = obtenerValor("recurrente-descripcion");
  const monto = numero("recurrente-monto");
  const moneda = obtenerValor("recurrente-moneda");
  const categoria = obtenerValor("recurrente-categoria");
  const frecuencia = obtenerValor("recurrente-frecuencia");
  const dia = numero("recurrente-dia");

  if (!descripcion || monto <= 0 || !MONEDAS[moneda] || dia < 1 || dia > 31) {
    aviso("Revisa los datos del gasto recurrente.");
    return;
  }

  recurrentes.push({
    id: idNuevo(),
    descripcion,
    monto,
    moneda,
    categoria,
    frecuencia,
    dia,
    activo: true
  });

  guardarTodo();
  evento.target.reset();
  actualizarRecurrentes();
  aviso("Gasto recurrente guardado.");
});

function actualizarRecurrentes() {
  $("lista-recurrentes").innerHTML = recurrentes.length
    ? recurrentes.map(r => `
      <article class="form-card">
        <h3>${escapar(r.descripcion)}</h3>
        <strong>${formato(r.monto, r.moneda)}</strong>
        <p class="small-note">${escapar(r.categoria)} · ${escapar(r.frecuencia)} · Día ${r.dia}</p>
        <button type="button" class="text-button" data-eliminar-recurrente="${r.id}">Eliminar</button>
      </article>
    `).join("")
    : '<p class="empty-state">No tienes gastos recurrentes registrados.</p>';
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-eliminar-recurrente]");
  if (!boton) return;

  recurrentes = recurrentes.filter(r => r.id !== boton.dataset.eliminarRecurrente);
  guardarTodo();
  actualizarRecurrentes();
});

/* =========================================================
   ESTADÍSTICAS
   ========================================================= */

$("estadisticas-mes").value = mesActual();
$("estadisticas-mes").addEventListener("change", actualizarEstadisticas);

function actualizarEstadisticas() {
  const mes = obtenerValor("estadisticas-mes") || mesActual();
  const lista = movimientosDelMes(mes);
  const ingresos = sumarMovimientos(lista, "ingreso");
  const gastos = sumarMovimientos(lista, "gasto");

  const operacionesMes = operacionesAhorro.filter(o => o.fecha.startsWith(mes));
  const ahorroMes = operacionesMes.reduce((total, o) => {
    const valor = convertir(o.monto, o.moneda) || 0;
    return total + (o.tipo === "deposito" ? valor : -valor);
  }, 0);

  $("estadistica-ingresos").textContent = formato(ingresos);
  $("estadistica-gastos").textContent = formato(gastos);
  $("estadistica-ahorros").textContent = formato(ahorroMes);
  $("estadistica-balance").textContent = formato(ingresos - gastos - ahorroMes);

  const porCategoria = {};

  lista.filter(m => m.tipo === "gasto").forEach(m => {
    const valor = convertir(m.monto, m.moneda);
    if (valor !== null) {
      porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + valor;
    }
  });

  if (graficoGastos) graficoGastos.destroy();

  const categorias = Object.keys(porCategoria);
  $("sin-datos-grafico").hidden = categorias.length > 0;

  if (categorias.length && window.Chart) {
    graficoGastos = new Chart($("grafico-gastos"), {
      type: "doughnut",
      data: {
        labels: categorias,
        datasets: [{
          data: categorias.map(c => porCategoria[c]),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }

  if (graficoComparacion) graficoComparacion.destroy();

  if (window.Chart) {
    graficoComparacion = new Chart($("grafico-comparacion"), {
      type: "bar",
      data: {
        labels: ["Ingresos", "Gastos", "Ahorros"],
        datasets: [{
          label: monedaPrincipal(),
          data: [ingresos, gastos, ahorroMes]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  const total = ingresos + gastos + Math.max(0, ahorroMes);
  const porcentaje = (valor) => total > 0 ? valor / total * 100 : 0;

  $("distribucion-financiera").innerHTML = `
    <p>Ingresos: ${porcentaje(ingresos).toFixed(1)}%</p>
    <p>Gastos: ${porcentaje(gastos).toFixed(1)}%</p>
    <p>Ahorros netos: ${porcentaje(Math.max(0, ahorroMes)).toFixed(1)}%</p>
    <p class="small-note">Porcentajes calculados sobre la suma de ingresos, gastos y ahorro neto del mes.</p>
  `;
}

/* =========================================================
   CONFIGURACIÓN Y TIPOS DE CAMBIO
   ========================================================= */

function actualizarConfiguracion() {
  $("moneda-principal").value = monedaPrincipal();
  renderizarTasas();
  $("estado-tipo-automatico").textContent =
    configuracion.fechaActualizacion ? "Disponible" : "Pendiente de consulta";

  $("fecha-actualizacion-tasas").textContent =
    configuracion.fechaActualizacion
      ? "Última actualización: " + new Date(configuracion.fechaActualizacion).toLocaleString("es-CR")
      : "Todavía no se han consultado los tipos de cambio.";
}

$("guardar-moneda").addEventListener("click", () => {
  const nueva = obtenerValor("moneda-principal");

  if (!MONEDAS[nueva]) return;

  if (nueva !== monedaPrincipal()) {
    if (!confirm("Cambiar la moneda principal modificará la forma en que se muestran los totales. ¿Deseas continuar?")) return;

    const tasasAnteriores = { ...configuracion.tasas };
    const automaticasAnteriores = { ...configuracion.tasasAutomaticas };
    const tasaNueva = automaticasAnteriores[nueva] || tasasAnteriores[nueva];

    if (!tasaNueva || tasaNueva <= 0) {
      aviso("Primero necesitas una tasa válida para la nueva moneda principal.");
      $("moneda-principal").value = monedaPrincipal();
      return;
    }

    const tasasNuevas = {};

    Object.keys(MONEDAS).forEach(moneda => {
      const tasaAnterior = automaticasAnteriores[moneda] || tasasAnteriores[moneda];
      tasasNuevas[moneda] = tasaAnterior / tasaNueva;
    });

    tasasNuevas[nueva] = 1;

    configuracion.tasas = tasasNuevas;
    configuracion.tasasAutomaticas = {};
    configuracion.monedaPrincipal = nueva;
  }

  guardarTodo();
  actualizarTodo();
  aviso("Moneda principal actualizada.");
});

function renderizarTasas() {
  const principal = monedaPrincipal();

  $("lista-tipos-cambio").innerHTML = Object.keys(MONEDAS)
    .filter(moneda => moneda !== principal)
    .map(moneda => `
      <label for="tasa-${moneda}">1 ${moneda} equivale a ${principal}</label>
      <input
        type="number"
        id="tasa-${moneda}"
        min="0.000001"
        step="any"
        value="${configuracion.tasas[moneda] || ""}"
        placeholder="Ingresa el tipo de cambio"
      >
    `).join("");
}

$("guardar-tasas").addEventListener("click", () => {
  Object.keys(MONEDAS).forEach(moneda => {
    if (moneda === monedaPrincipal()) return;

    const valor = Number($("tasa-" + moneda).value);

    if (valor > 0 && Number.isFinite(valor)) {
      configuracion.tasas[moneda] = valor;
    }
  });

  configuracion.tasasAutomaticas = {};
  guardarTodo();
  actualizarTodo();
  aviso("Tipos de cambio manuales guardados.");
});

async function actualizarTasasAutomaticas() {
  const boton = $("actualizar-tasas");
  boton.disabled = true;
  boton.textContent = "Consultando...";

  try {
    const principal = monedaPrincipal();
    const respuesta = await fetch(
      "https://open.er-api.com/v6/latest/" + encodeURIComponent(principal),
      { cache: "no-store" }
    );

    if (!respuesta.ok) throw new Error("No se pudo consultar el servicio.");

    const datos = await respuesta.json();

    if (datos.result !== "success" || !datos.rates) {
      throw new Error("El servicio no devolvió tasas válidas.");
    }

    const tasas = {};

    Object.keys(MONEDAS).forEach(moneda => {
      const unidadesPorPrincipal = Number(datos.rates[moneda]);

      if (unidadesPorPrincipal > 0) {
        tasas[moneda] = 1 / unidadesPorPrincipal;
      }
    });

    tasas[principal] = 1;

    configuracion.tasasAutomaticas = tasas;
    configuracion.fechaActualizacion = new Date().toISOString();

    guardarTodo();
    actualizarTodo();
    aviso("Tipos de cambio automáticos actualizados.");
  } catch (error) {
    console.error(error);
    aviso("No fue posible actualizar las tasas. Revisa tu conexión o utiliza los tipos de cambio manuales.");
  } finally {
    boton.disabled = false;
    boton.textContent = "Actualizar tipos de cambio";
  }
}

$("actualizar-tasas").addEventListener("click", actualizarTasasAutomaticas);

/* =========================================================
   EXPORTAR E IMPORTAR DATOS
   ========================================================= */

$("exportar-datos").addEventListener("click", () => {
  const datos = {
    version: 2,
    fechaExportacion: new Date().toISOString(),
    movimientos,
    metas,
    operacionesAhorro,
    presupuestos,
    recurrentes,
    configuracion
  };

  const archivo = new Blob([JSON.stringify(datos, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "mis-finanzas-respaldo.json";
  enlace.click();
  URL.revokeObjectURL(url);
});

$("importar-datos").addEventListener("click", () => {
  $("archivo-importar").click();
});

$("archivo-importar").addEventListener("change", async evento => {
  const archivo = evento.target.files[0];
  if (!archivo) return;

  try {
    const texto = await archivo.text();
    const datos = JSON.parse(texto);

    if (!datos || !Array.isArray(datos.movimientos) ||
        !Array.isArray(datos.metas) ||
        !Array.isArray(datos.operacionesAhorro) ||
        !datos.configuracion) {
      throw new Error("Formato incorrecto.");
    }

    if (!confirm("Importar reemplazará los datos actuales de esta aplicación. ¿Deseas continuar?")) return;

    movimientos = datos.movimientos;
    metas = datos.metas;
    operacionesAhorro = datos.operacionesAhorro;
    presupuestos = Array.isArray(datos.presupuestos) ? datos.presupuestos : [];
    recurrentes = Array.isArray(datos.recurrentes) ? datos.recurrentes : [];
    configuracion = datos.configuracion;

    guardarTodo();
    actualizarTodo();
    aviso("Datos importados correctamente.");
  } catch (error) {
    aviso("No se pudo importar el archivo. Verifica que sea una copia válida de Mis Finanzas.");
  } finally {
    evento.target.value = "";
  }
});

/* =========================================================
   ACTUALIZACIÓN GENERAL
   ========================================================= */

function actualizarTodo() {
  actualizarInicio();
  actualizarListaMovimientos();
  actualizarAhorros();
  actualizarPresupuestos();
  actualizarRecurrentes();
  actualizarConfiguracion();

  if ($("estadisticas").classList.contains("active")) {
    actualizarEstadisticas();
  }
}

$("fecha-actual").textContent = new Date().toLocaleDateString("es-CR", {
  weekday: "long",
  day: "numeric",
  month: "long"
});

actualizarTodo();
