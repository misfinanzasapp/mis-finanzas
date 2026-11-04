"use strict";

/* =========================================================
   MIS FINANZAS 2.0
   Moneda principal inicial: CRC
   Tipos de cambio: automático + manual
   Idiomas: español e inglés
   ========================================================= */

const CLAVES = {
  movimientos: "mf_movimientos_v2",
  metas: "mf_metas_v2",
  operacionesAhorro: "mf_operaciones_ahorro_v2",
  presupuestos: "mf_presupuestos_v2",
  recurrentes: "mf_recurrentes_v2",
  configuracion: "mf_configuracion_v2"
};

const MONEDAS = {
  CRC: "Colón costarricense",
  USD: "Dólar estadounidense",
  EUR: "Euro",
  MXN: "Peso mexicano",
  GBP: "Libra esterlina",
  BRL: "Real brasileño",
  COP: "Peso colombiano",
  CAD: "Dólar canadiense"
};

const TASAS_INICIALES = {
  CRC: 1,
  USD: 500,
  EUR: 540,
  MXN: 29,
  GBP: 630,
  BRL: 95,
  COP: 0.125,
  CAD: 360
};

const TEXTOS = {
  es: {
    income: "Ingreso",
    expense: "Gasto",
    deposit: "Depósito",
    withdrawal: "Retiro",
    delete: "Eliminar",
    edit: "Editar",
    noMovements: "Todavía no tienes movimientos registrados.",
    noGoals: "Todavía no tienes metas de ahorro.",
    noBudgets: "Todavía no tienes presupuestos.",
    noRecurring: "Todavía no tienes gastos recurrentes.",
    noChart: "No hay datos suficientes para mostrar el gráfico.",
    saved: "Cambios guardados correctamente.",
    deleted: "Registro eliminado.",
    confirmDelete: "¿Deseas eliminar este registro?",
    invalidAmount: "Ingresa un monto válido mayor que cero.",
    goalCreated: "Meta de ahorro creada.",
    movementSaved: "Movimiento guardado.",
    budgetSaved: "Presupuesto guardado.",
    recurringSaved: "Gasto recurrente guardado.",
    exchangeUpdated: "Tipos de cambio actualizados.",
    exchangeError: "No fue posible actualizar los tipos de cambio. Se conservarán las tasas guardadas.",
    manualRatesSaved: "Tipos de cambio manuales guardados.",
    missingRate: "No hay una tasa disponible para esta moneda.",
    automatic: "Automático",
    manual: "Manual",
    available: "Disponible",
    accumulated: "Acumulado",
    progress: "Progreso",
    remaining: "Restante",
    spent: "Gastado",
    limit: "Límite",
    overBudget: "Presupuesto excedido",
    onTrack: "Dentro del presupuesto",
    goal: "Meta",
    date: "Fecha",
    category: "Categoría",
    description: "Descripción",
    amount: "Monto",
    currency: "Moneda",
    frequency: "Frecuencia",
    monthly: "Mensual",
    weekly: "Semanal",
    yearly: "Anual",
    daily: "Diaria",
    savings: "Ahorros",
    incomePlural: "Ingresos",
    expenses: "Gastos",
    balance: "Balance",
    total: "Total",
    other: "Otros",
    food: "Alimentación",
    housing: "Vivienda",
    transport: "Transporte",
    health: "Salud",
    education: "Educación",
    entertainment: "Entretenimiento",
    services: "Servicios",
    shopping: "Compras",
    debt: "Deudas",
    salary: "Salario",
    business: "Negocio",
    investment: "Inversión",
    gift: "Regalo",
    emergency: "Fondo de emergencia",
    savingGoal: "Meta de ahorro",
    noData: "Sin datos",
    chooseGoal: "Selecciona una meta",
    exportSuccess: "Respaldo descargado correctamente.",
    importSuccess: "Datos importados correctamente.",
    importError: "No se pudo importar el archivo. Verifica que sea un respaldo válido.",
    selectFile: "Selecciona un archivo de respaldo.",
    today: "Hoy",
    mainCurrency: "Moneda principal",
    exchangeRates: "Tipos de cambio",
    updated: "Última actualización",
    notUpdated: "Todavía no se han actualizado",
    rateUnavailable: "Tasa no disponible"
  },
  en: {
    income: "Income",
    expense: "Expense",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    delete: "Delete",
    edit: "Edit",
    noMovements: "You have no transactions yet.",
    noGoals: "You have no savings goals yet.",
    noBudgets: "You have no budgets yet.",
    noRecurring: "You have no recurring expenses yet.",
    noChart: "There is not enough data to display the chart.",
    saved: "Changes saved successfully.",
    deleted: "Record deleted.",
    confirmDelete: "Do you want to delete this record?",
    invalidAmount: "Enter a valid amount greater than zero.",
    goalCreated: "Savings goal created.",
    movementSaved: "Transaction saved.",
    budgetSaved: "Budget saved.",
    recurringSaved: "Recurring expense saved.",
    exchangeUpdated: "Exchange rates updated.",
    exchangeError: "Exchange rates could not be updated. Saved rates will be kept.",
    manualRatesSaved: "Manual exchange rates saved.",
    missingRate: "No exchange rate is available for this currency.",
    automatic: "Automatic",
    manual: "Manual",
    available: "Available",
    accumulated: "Accumulated",
    progress: "Progress",
    remaining: "Remaining",
    spent: "Spent",
    limit: "Limit",
    overBudget: "Over budget",
    onTrack: "Within budget",
    goal: "Goal",
    date: "Date",
    category: "Category",
    description: "Description",
    amount: "Amount",
    currency: "Currency",
    frequency: "Frequency",
    monthly: "Monthly",
    weekly: "Weekly",
    yearly: "Yearly",
    daily: "Daily",
    savings: "Savings",
    incomePlural: "Income",
    expenses: "Expenses",
    balance: "Balance",
    total: "Total",
    other: "Other",
    food: "Food",
    housing: "Housing",
    transport: "Transport",
    health: "Health",
    education: "Education",
    entertainment: "Entertainment",
    services: "Services",
    shopping: "Shopping",
    debt: "Debt",
    salary: "Salary",
    business: "Business",
    investment: "Investment",
    gift: "Gift",
    emergency: "Emergency fund",
    savingGoal: "Savings goal",
    noData: "No data",
    chooseGoal: "Choose a goal",
    exportSuccess: "Backup downloaded successfully.",
    importSuccess: "Data imported successfully.",
    importError: "The file could not be imported. Check that it is a valid backup.",
    selectFile: "Select a backup file.",
    today: "Today",
    mainCurrency: "Main currency",
    exchangeRates: "Exchange rates",
    updated: "Last updated",
    notUpdated: "Not updated yet",
    rateUnavailable: "Rate unavailable"
  }
};

const CATEGORIAS = [
  "Alimentación",
  "Vivienda",
  "Transporte",
  "Salud",
  "Educación",
  "Entretenimiento",
  "Servicios",
  "Compras",
  "Deudas",
  "Salario",
  "Negocio",
  "Inversión",
  "Regalo",
  "Otros"
];

function leer(clave, defecto) {
  try {
    const valor = localStorage.getItem(clave);
    return valor === null ? defecto : JSON.parse(valor);
  } catch (error) {
    console.warn("No se pudo leer:", clave, error);
    return defecto;
  }
}

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function escapar(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function hoy() {
  const fecha = new Date();
  const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function mesActual() {
  return hoy().slice(0, 7);
}

let movimientos = leer(CLAVES.movimientos, []);
let metas = leer(CLAVES.metas, []);
let operacionesAhorro = leer(CLAVES.operacionesAhorro, []);
let presupuestos = leer(CLAVES.presupuestos, []);
let recurrentes = leer(CLAVES.recurrentes, []);

let configuracion = {
  monedaPrincipal: "CRC",
  idioma: "es",
  tasasManuales: { ...TASAS_INICIALES },
  tasasAutomaticas: {},
  fechaActualizacion: null,
  ...(leer(CLAVES.configuracion, {}) || {})
};

if (!MONEDAS[configuracion.monedaPrincipal]) {
  configuracion.monedaPrincipal = "CRC";
}

if (!["es", "en"].includes(configuracion.idioma)) {
  configuracion.idioma = "es";
}

if (!configuracion.tasasManuales) {
  configuracion.tasasManuales = { ...TASAS_INICIALES };
}

function guardarTodo() {
  guardar(CLAVES.movimientos, movimientos);
  guardar(CLAVES.metas, metas);
  guardar(CLAVES.operacionesAhorro, operacionesAhorro);
  guardar(CLAVES.presupuestos, presupuestos);
  guardar(CLAVES.recurrentes, recurrentes);
  guardar(CLAVES.configuracion, configuracion);
}

function t(clave) {
  return TEXTOS[configuracion.idioma]?.[clave] || TEXTOS.es[clave] || clave;
}

function formatoMoneda(monto, moneda = configuracion.monedaPrincipal) {
  const idioma = configuracion.idioma === "en" ? "en-US" : "es-CR";

  try {
    return new Intl.NumberFormat(idioma, {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 2
    }).format(Number(monto) || 0);
  } catch {
    return `${moneda} ${(Number(monto) || 0).toFixed(2)}`;
  }
}

/*
  Las tasas automáticas representan cuántas unidades de otra
  moneda equivalen a una unidad de la moneda principal.
  Las tasas manuales representan cuántas unidades de la
  moneda principal vale una unidad de la moneda extranjera.
*/

function convertirAMonedaPrincipal(monto, moneda) {
  const cantidad = Number(monto) || 0;
  const principal = configuracion.monedaPrincipal;

  if (moneda === principal) return cantidad;

  const tasaAuto = Number(configuracion.tasasAutomaticas?.[moneda]);

  if (tasaAuto > 0) {
    return cantidad / tasaAuto;
  }

  const tasaManual = Number(configuracion.tasasManuales?.[moneda]);

  if (tasaManual > 0) {
    return cantidad * tasaManual;
  }

  return cantidad;
}

function convertirMoneda(monto, origen, destino) {
  if (origen === destino) return Number(monto) || 0;

  const enPrincipal = convertirAMonedaPrincipal(monto, origen);

  if (destino === configuracion.monedaPrincipal) {
    return enPrincipal;
  }

  const unidadDestino = convertirAMonedaPrincipal(1, destino);

  if (unidadDestino > 0) {
    return enPrincipal / unidadDestino;
  }

  return Number(monto) || 0;
}

function obtenerFechaMes(fecha) {
  return String(fecha || "").slice(0, 7);
}

function obtenerOperacionesMeta(metaId) {
  return operacionesAhorro.filter(op => op.metaId === metaId);
}

function totalMeta(meta) {
  return obtenerOperacionesMeta(meta.id).reduce((total, op) => {
    const valor = convertirMoneda(
      Number(op.monto) || 0,
      op.moneda || meta.moneda || configuracion.monedaPrincipal,
      meta.moneda || configuracion.monedaPrincipal
    );

    return total + (op.tipo === "retiro" ? -valor : valor);
  }, 0);
}

function totalAhorrosPrincipal() {
  return metas.reduce((total, meta) => {
    return total + convertirAMonedaPrincipal(
      totalMeta(meta),
      meta.moneda || configuracion.monedaPrincipal
    );
  }, 0);
}

function movimientosDelMes(mes = mesActual()) {
  return movimientos.filter(m => obtenerFechaMes(m.fecha) === mes);
}

function sumaMovimientos(tipo, lista = movimientosDelMes()) {
  return lista
    .filter(m => m.tipo === tipo)
    .reduce((total, m) => {
      return total + convertirAMonedaPrincipal(
        m.monto,
        m.moneda || configuracion.monedaPrincipal
      );
    }, 0);
}

function obtenerNombreCategoria(categoria) {
  const mapa = {
    "Alimentación": "food",
    "Vivienda": "housing",
    "Transporte": "transport",
    "Salud": "health",
    "Educación": "education",
    "Entretenimiento": "entertainment",
    "Servicios": "services",
    "Compras": "shopping",
    "Deudas": "debt",
    "Salario": "salary",
    "Negocio": "business",
    "Inversión": "investment",
    "Regalo": "gift",
    "Otros": "other"
  };

  return t(mapa[categoria] || "other");
}

function aplicarIdioma() {
  const idioma = configuracion.idioma;
  document.documentElement.lang = idioma;

  document.querySelectorAll("[data-i18n]").forEach(elemento => {
    const clave = elemento.dataset.i18n;
    if (TEXTOS[idioma]?.[clave]) {
      elemento.textContent = TEXTOS[idioma][clave];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(elemento => {
    const clave = elemento.dataset.i18nPlaceholder;
    if (TEXTOS[idioma]?.[clave]) {
      elemento.placeholder = TEXTOS[idioma][clave];
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach(elemento => {
    const clave = elemento.dataset.i18nTitle;
    if (TEXTOS[idioma]?.[clave]) {
      elemento.title = TEXTOS[idioma][clave];
    }
  });

  const selector = document.getElementById("idioma-aplicacion");
  if (selector) selector.value = idioma;

  renderizarTodo();
}

function cambiarIdioma(idioma) {
  if (!["es", "en"].includes(idioma)) return;
  configuracion.idioma = idioma;
  guardarTodo();
  aplicarIdioma();
}

function llenarSelectorMonedas() {
  document.querySelectorAll(
    "#mov-moneda, #ahorro-moneda, #ahorro-moneda-movimiento, " +
    "#presupuesto-moneda, #recurrente-moneda, #filtro-moneda-movimientos, #moneda-principal"
  ).forEach(selector => {
    if (!selector) return;

    const valorAnterior = selector.value;
    const esFiltro = selector.id === "filtro-moneda-movimientos";
    const esPrincipal = selector.id === "moneda-principal";

    selector.innerHTML = "";

    if (esFiltro) {
      const opcion = document.createElement("option");
      opcion.value = "";
      opcion.textContent = configuracion.idioma === "en" ? "All currencies" : "Todas las monedas";
      selector.appendChild(opcion);
    }

    Object.keys(MONEDAS).forEach(moneda => {
      const opcion = document.createElement("option");
      opcion.value = moneda;
      opcion.textContent = `${moneda} - ${MONEDAS[moneda]}`;
      selector.appendChild(opcion);
    });

    if (esPrincipal) {
      selector.value = configuracion.monedaPrincipal;
    } else if (valorAnterior && [...selector.options].some(o => o.value === valorAnterior)) {
      selector.value = valorAnterior;
    }
  });
}

function llenarCategorias() {
  const ids = ["mov-categoria", "presupuesto-categoria", "recurrente-categoria"];

  ids.forEach(id => {
    const selector = document.getElementById(id);
    if (!selector) return;

    const anterior = selector.value;
    selector.innerHTML = "";

    CATEGORIAS.forEach(categoria => {
      const opcion = document.createElement("option");
      opcion.value = categoria;
      opcion.textContent = obtenerNombreCategoria(categoria);
      selector.appendChild(opcion);
    });

    if (anterior) selector.value = anterior;
  });
}

function renderizarInicio() {
  const mes = document.getElementById("filtro-mes-inicio")?.value || mesActual();
  const lista = movimientos.filter(m => obtenerFechaMes(m.fecha) === mes);

  const ingresos = sumaMovimientos("ingreso", lista);
  const gastos = sumaMovimientos("gasto", lista);
  const ahorro = totalAhorrosPrincipal();
  const disponible = ingresos - gastos;

  const poner = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor;
  };

  poner("fecha-actual", new Date().toLocaleDateString(
    configuracion.idioma === "en" ? "en-US" : "es-CR",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  ));

  poner("balance-total", formatoMoneda(disponible));
  poner("inicio-ingresos", formatoMoneda(ingresos));
  poner("inicio-gastos", formatoMoneda(gastos));
  poner("resumen-ingresos", formatoMoneda(ingresos));
  poner("resumen-gastos", formatoMoneda(gastos));
  poner("resumen-ahorros", formatoMoneda(ahorro));
  poner("resumen-disponible", formatoMoneda(disponible));

  const recientes = document.getElementById("movimientos-recientes");

  if (recientes) {
    const ultimos = [...movimientos]
      .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
      .slice(0, 5);

    recientes.innerHTML = ultimos.length
      ? ultimos.map(m => tarjetaMovimiento(m)).join("")
      : `<div class="empty-state">${t("noMovements")}</div>`;
  }
}

function tarjetaMovimiento(m) {
  const ingreso = m.tipo === "ingreso";
  const clase = ingreso ? "green" : "red";
  const signo = ingreso ? "+" : "−";
  const tipo = ingreso ? t("income") : t("expense");

  return `
    <div class="summary-card" style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <div style="min-width:0;">
        <strong>${escapar(m.descripcion || tipo)}</strong>
        <div class="muted">${escapar(obtenerNombreCategoria(m.categoria || "Otros"))} · ${escapar(m.fecha || "")}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <strong style="color:${clase === "green" ? "var(--green)" : "var(--red)"}">
          ${signo}${formatoMoneda(m.monto, m.moneda || configuracion.monedaPrincipal)}
        </strong>
        <div class="muted">${escapar(tipo)}</div>
      </div>
    </div>`;
}

function renderizarMovimientos() {
  const contenedor = document.getElementById("lista-movimientos");
  if (!contenedor) return;

  const tipoFiltro = document.getElementById("filtro-tipo-movimiento")?.value || "";
  const mesFiltro = document.getElementById("filtro-mes-movimientos")?.value || "";
  const monedaFiltro = document.getElementById("filtro-moneda-movimientos")?.value || "";

  const lista = [...movimientos]
    .filter(m => !tipoFiltro || m.tipo === tipoFiltro)
    .filter(m => !mesFiltro || obtenerFechaMes(m.fecha) === mesFiltro)
    .filter(m => !monedaFiltro || m.moneda === monedaFiltro)
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));

  contenedor.innerHTML = lista.length
    ? lista.map(m => `
      <div class="summary-card" style="display:flex;justify-content:space-between;gap:10px;align-items:center;">
        <div style="min-width:0;">
          <strong>${escapar(m.descripcion)}</strong>
          <div class="muted">${escapar(obtenerNombreCategoria(m.categoria))} · ${escapar(m.fecha)}</div>
          <div class="small-note">${escapar(m.moneda || configuracion.monedaPrincipal)}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <strong style="color:${m.tipo === "ingreso" ? "var(--green)" : "var(--red)"}">
            ${m.tipo === "ingreso" ? "+" : "−"}${formatoMoneda(m.monto, m.moneda)}
          </strong>
          <button class="text-button" data-eliminar-movimiento="${escapar(m.id)}">${t("delete")}</button>
        </div>
      </div>`).join("")
    : `<div class="empty-state">${t("noMovements")}</div>`;
}

function renderizarAhorros() {
  const total = document.getElementById("total-ahorros");
  if (total) total.textContent = formatoMoneda(totalAhorrosPrincipal());

  const lista = document.getElementById("lista-metas-ahorro");
  if (!lista) return;

  if (!metas.length) {
    lista.innerHTML = `<div class="empty-state">${t("noGoals")}</div>`;
  } else {
    lista.innerHTML = metas.map(meta => {
      const acumulado = totalMeta(meta);
      const objetivo = Number(meta.objetivo) || 0;
      const porcentaje = objetivo > 0
        ? Math.min(100, Math.max(0, acumulado / objetivo * 100))
        : 0;

      return `
        <div class="form-card">
          <div style="display:flex;justify-content:space-between;gap:10px;">
            <div>
              <h3>${escapar(meta.nombre)}</h3>
              <p class="muted">${t("goal")}: ${formatoMoneda(objetivo, meta.moneda)}</p>
            </div>
            <button class="text-button" data-eliminar-meta="${escapar(meta.id)}">${t("delete")}</button>
          </div>
          <h3 style="color:var(--green);margin:12px 0;">${formatoMoneda(acumulado, meta.moneda)}</h3>
          <div style="height:9px;background:var(--border);border-radius:20px;overflow:hidden;">
            <div style="height:100%;width:${porcentaje}%;background:var(--green);border-radius:20px;"></div>
          </div>
          <p class="small-note">${t("progress")}: ${porcentaje.toFixed(1)}% · ${t("remaining")}: ${formatoMoneda(Math.max(0, objetivo - acumulado), meta.moneda)}</p>
          <button class="text-button" data-ver-operaciones="${escapar(meta.id)}">${configuracion.idioma === "en" ? "View savings activity" : "Ver movimientos de ahorro"}</button>
        </div>`;
    }).join("");
  }

  const selector = document.getElementById("ahorro-meta-seleccionada");
  if (selector) {
    const anterior = selector.value;
    selector.innerHTML = `<option value="">${t("chooseGoal")}</option>`;
    metas.forEach(meta => {
      const opcion = document.createElement("option");
      opcion.value = meta.id;
      opcion.textContent = meta.nombre;
      selector.appendChild(opcion);
    });
    if (metas.some(m => m.id === anterior)) selector.value = anterior;
  }
}

function renderizarPresupuestos() {
  const lista = document.getElementById("lista-presupuestos");
  if (!lista) return;

  if (!presupuestos.length) {
    lista.innerHTML = `<div class="empty-state">${t("noBudgets")}</div>`;
    return;
  }

  const mes = mesActual();

  lista.innerHTML = presupuestos.map(p => {
    const limite = convertirAMonedaPrincipal(p.monto, p.moneda);
    const gastado = movimientos
      .filter(m => m.tipo === "gasto")
      .filter(m => m.categoria === p.categoria)
      .filter(m => obtenerFechaMes(m.fecha) === mes)
      .reduce((suma, m) => suma + convertirAMonedaPrincipal(m.monto, m.moneda), 0);

    const porcentaje = limite > 0 ? gastado / limite * 100 : 0;
    const excedido = gastado > limite;

    return `
      <div class="summary-card">
        <div style="display:flex;justify-content:space-between;gap:8px;">
          <strong>${escapar(obtenerNombreCategoria(p.categoria))}</strong>
          <button class="text-button" data-eliminar-presupuesto="${escapar(p.id)}">${t("delete")}</button>
        </div>
        <p class="muted">${t("spent")}: ${formatoMoneda(gastado)} / ${t("limit")}: ${formatoMoneda(limite)}</p>
        <div style="height:9px;background:var(--border);border-radius:20px;overflow:hidden;">
          <div style="height:100%;width:${Math.min(100, porcentaje)}%;background:${excedido ? "var(--red)" : "var(--blue)"};"></div>
        </div>
        <p class="small-note" style="color:${excedido ? "var(--red)" : "var(--green)"}">
          ${excedido ? t("overBudget") : t("onTrack")} · ${porcentaje.toFixed(1)}%
        </p>
      </div>`;
  }).join("");
}

function renderizarRecurrentes() {
  const lista = document.getElementById("lista-recurrentes");
  if (!lista) return;

  lista.innerHTML = recurrentes.length
    ? recurrentes.map(r => `
      <div class="summary-card" style="display:flex;justify-content:space-between;gap:10px;">
        <div>
          <strong>${escapar(r.descripcion)}</strong>
          <div class="muted">${escapar(obtenerNombreCategoria(r.categoria))} · ${escapar(t(r.frecuencia) || r.frecuencia)}</div>
          <div class="small-note">${configuracion.idioma === "en" ? "Day" : "Día"}: ${escapar(r.dia || "—")}</div>
        </div>
        <div style="text-align:right;">
          <strong>${formatoMoneda(r.monto, r.moneda)}</strong>
          <button class="text-button" data-eliminar-recurrente="${escapar(r.id)}">${t("delete")}</button>
        </div>
      </div>`).join("")
    : `<div class="empty-state">${t("noRecurring")}</div>`;
}

function renderizarEstadisticas() {
  const mes = document.getElementById("estadisticas-mes")?.value || mesActual();
  const lista = movimientos.filter(m => obtenerFechaMes(m.fecha) === mes);

  const ingresos = sumaMovimientos("ingreso", lista);
  const gastos = sumaMovimientos("gasto", lista);

  const poner = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor;
  };

  poner("estadistica-ingresos", formatoMoneda(ingresos));
  poner("estadistica-gastos", formatoMoneda(gastos));
  poner("estadistica-ahorros", formatoMoneda(totalAhorrosPrincipal()));
  poner("estadistica-balance", formatoMoneda(ingresos - gastos));

  const porCategoria = {};

  lista.filter(m => m.tipo === "gasto").forEach(m => {
    const categoria = m.categoria || "Otros";
    porCategoria[categoria] = (porCategoria[categoria] || 0) +
      convertirAMonedaPrincipal(m.monto, m.moneda);
  });

  const sinDatos = document.getElementById("sin-datos-grafico");
  if (sinDatos) {
    sinDatos.hidden = Object.keys(porCategoria).length > 0;
  }

  const canvas = document.getElementById("grafico-gastos");
  if (canvas && window.Chart) {
    if (canvas._chart) canvas._chart.destroy();

    if (Object.keys(porCategoria).length) {
      canvas._chart = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: Object.keys(porCategoria).map(obtenerNombreCategoria),
          datasets: [{
            data: Object.values(porCategoria)
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: "bottom" }
          }
        }
      });
    }
  }

  const comparacion = document.getElementById("grafico-comparacion");
  if (comparacion && window.Chart) {
    if (comparacion._chart) comparacion._chart.destroy();

    comparacion._chart = new Chart(comparacion, {
      type: "bar",
      data: {
        labels: [t("incomePlural"), t("expenses")],
        datasets: [{
          label: t("total"),
          data: [ingresos, gastos]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  const distribucion = document.getElementById("distribucion-financiera");
  if (distribucion) {
    distribucion.innerHTML = `
      <div class="summary-grid">
        <div class="summary-card"><span>${t("incomePlural")}</span><strong>${formatoMoneda(ingresos)}</strong></div>
        <div class="summary-card"><span>${t("expenses")}</span><strong>${formatoMoneda(gastos)}</strong></div>
        <div class="summary-card"><span>${t("savings")}</span><strong>${formatoMoneda(totalAhorrosPrincipal())}</strong></div>
        <div class="summary-card"><span>${t("available")}</span><strong>${formatoMoneda(ingresos - gastos)}</strong></div>
      </div>`;
  }
}

function renderizarConsejos() {
  const contenedor = document.getElementById("consejos");
  if (!contenedor) return;

  const ingles = configuracion.idioma === "en";

  const consejos = ingles ? [
    ["🎯", "Set a savings goal", "Choose a specific amount and deadline. A clear goal makes it easier to stay consistent."],
    ["🛟", "Build an emergency fund", "Start with a small amount and work toward saving three to six months of essential expenses."],
    ["📊", "Use a monthly budget", "Set a limit for each spending category and review it throughout the month."],
    ["🛒", "Reduce unnecessary expenses", "Review subscriptions, impulse purchases and small recurring costs."],
    ["💳", "Prioritize expensive debt", "Focus on debts with the highest interest rates while keeping up with minimum payments."],
    ["💰", "Save when you receive income", "Set aside a percentage as soon as you receive your salary instead of waiting until the end of the month."],
    ["🌱", "Make savings automatic", "Schedule a recurring transfer to your savings account, even if the amount is small."],
    ["🔎", "Review your progress", "Check your income and expenses weekly to spot problems early."]
  ] : [
    ["🎯", "Define una meta de ahorro", "Elige una cantidad específica y una fecha. Tener un objetivo claro ayuda a mantener la constancia."],
    ["🛟", "Construye un fondo de emergencia", "Comienza con una cantidad pequeña y avanza hacia un ahorro equivalente a tres o seis meses de gastos esenciales."],
    ["📊", "Utiliza un presupuesto mensual", "Establece un límite para cada categoría de gastos y revísalo durante el mes."],
    ["🛒", "Reduce gastos innecesarios", "Revisa suscripciones, compras impulsivas y pequeños gastos recurrentes."],
    ["💳", "Prioriza las deudas más caras", "Concéntrate en las deudas con mayores intereses y mantén al día los pagos mínimos."],
    ["💰", "Ahorra cuando recibas tus ingresos", "Separa un porcentaje apenas recibas tu salario, en lugar de esperar hasta final de mes."],
    ["🌱", "Automatiza tus ahorros", "Programa una transferencia recurrente a tu cuenta de ahorro, aunque sea por un monto pequeño."],
    ["🔎", "Revisa tu progreso", "Comprueba tus ingresos y gastos semanalmente para detectar problemas a tiempo."]
  ];

  contenedor.innerHTML = consejos.map(c => `
    <div class="tip-card">
      <span>${c[0]}</span>
      <h3>${c[1]}</h3>
      <p>${c[2]}</p>
    </div>`).join("");
}

function renderizarTasas() {
  const contenedor = document.getElementById("lista-tipos-cambio");
  if (!contenedor) return;

  const principal = configuracion.monedaPrincipal;

  contenedor.innerHTML = Object.keys(MONEDAS)
    .filter(moneda => moneda !== principal)
    .map(moneda => `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:center;margin-bottom:10px;">
        <label for="tasa-${moneda}">${moneda}</label>
        <input
          id="tasa-${moneda}"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          value="${Number(configuracion.tasasManuales?.[moneda] ?? TASAS_INICIALES[moneda] ?? 0)}"
          aria-label="${escapar(moneda)}"
        >
      </div>`).join("");

  const fecha = document.getElementById("fecha-actualizacion-tasas");
  if (fecha) {
    fecha.textContent = configuracion.fechaActualizacion
      ? new Date(configuracion.fechaActualizacion).toLocaleString(
        configuracion.idioma === "en" ? "en-US" : "es-CR"
      )
      : t("notUpdated");
  }

  const estado = document.getElementById("estado-tipo-automatico");
  if (estado) {
    estado.textContent = Object.keys(configuracion.tasasAutomaticas || {}).length
      ? t("automatic")
      : t("manual");
  }
}

async function actualizarTasasAutomaticas() {
  const boton = document.getElementById("actualizar-tasas");
  const estado = document.getElementById("estado-tipo-automatico");

  if (boton) {
    boton.disabled = true;
    boton.textContent = configuracion.idioma === "en" ? "Updating..." : "Actualizando...";
  }

  if (estado) estado.textContent = configuracion.idioma === "en" ? "Connecting..." : "Conectando...";

  try {
    const base = configuracion.monedaPrincipal;
    const respuesta = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      cache: "no-store"
    });

    if (!respuesta.ok) throw new Error("Error de conexión");

    const datos = await respuesta.json();

    if (datos.result !== "success" || !datos.rates) {
      throw new Error("Respuesta de tasas no válida");
    }

    const tasas = {};

    Object.keys(MONEDAS).forEach(moneda => {
      if (moneda !== base && Number(datos.rates[moneda]) > 0) {
        tasas[moneda] = Number(datos.rates[moneda]);
      }
    });

    configuracion.tasasAutomaticas = tasas;
    configuracion.fechaActualizacion = new Date().toISOString();

    guardarTodo();
    renderizarTodo();

    alert(t("exchangeUpdated"));
  } catch (error) {
    console.error(error);
    if (estado) estado.textContent = t("manual");
    alert(t("exchangeError"));
  } finally {
    if (boton) {
      boton.disabled = false;
      boton.textContent = configuracion.idioma === "en" ? "Update rates" : "Actualizar tasas";
    }
  }
}

function guardarTasasManuales() {
  const principal = configuracion.monedaPrincipal;
  const nuevas = { ...(configuracion.tasasManuales || {}) };
  nuevas[principal] = 1;

  Object.keys(MONEDAS).forEach(moneda => {
    if (moneda === principal) return;

    const campo = document.getElementById(`tasa-${moneda}`);
    if (!campo) return;

    const valor = Number(campo.value);

    if (valor > 0 && Number.isFinite(valor)) {
      nuevas[moneda] = valor;
    }
  });

  configuracion.tasasManuales = nuevas;
  guardarTodo();
  renderizarTodo();
  alert(t("manualRatesSaved"));
}

function cambiarMonedaPrincipal() {
  const selector = document.getElementById("moneda-principal");
  if (!selector) return;

  const nueva = selector.value;
  if (!MONEDAS[nueva]) return;

  configuracion.monedaPrincipal = nueva;

  // Las tasas automáticas anteriores corresponden a otra moneda base.
  configuracion.tasasAutomaticas = {};
  configuracion.fechaActualizacion = null;

  guardarTodo();
  renderizarTodo();
}

function renderizarTodo() {
  llenarSelectorMonedas();
  llenarCategorias();
  renderizarInicio();
  renderizarMovimientos();
  renderizarAhorros();
  renderizarPresupuestos();
  renderizarRecurrentes();
  renderizarEstadisticas();
  renderizarConsejos();
  renderizarTasas();

  const principal = document.getElementById("moneda-principal");
  if (principal) principal.value = configuracion.monedaPrincipal;
}

function mostrarSeccion(nombre) {
  if (!nombre) return;

  document.querySelectorAll(".page-section").forEach(seccion => {
    seccion.classList.toggle("active", seccion.id === nombre);
  });

  document.querySelectorAll(".nav-button").forEach(boton => {
    boton.classList.toggle("active", boton.dataset.section === nombre);
  });

  const menu = document.querySelector(".more-menu");
  if (menu) menu.hidden = true;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (nombre === "estadisticas") renderizarEstadisticas();
}

function configurarNavegacion() {
  document.querySelectorAll("[data-section]").forEach(boton => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.section);
    });
  });

  document.querySelectorAll("[data-go]").forEach(boton => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.go);
    });
  });

  const botonMas = document.getElementById("menu-mas");
  const menu = document.querySelector(".more-menu");

  if (botonMas && menu) {
    botonMas.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
    });
  }

  const ajustes = document.getElementById("btn-settings");
  if (ajustes) {
    ajustes.addEventListener("click", () => mostrarSeccion("configuracion"));
  }

  document.addEventListener("click", evento => {
    if (!menu || menu.hidden) return;
    if (menu.contains(evento.target) || botonMas?.contains(evento.target)) return;
    menu.hidden = true;
  });
}

function configurarFormularios() {
  const formMovimiento = document.getElementById("form-movimiento");

  if (formMovimiento) {
    formMovimiento.addEventListener("submit", evento => {
      evento.preventDefault();

      const monto = Number(document.getElementById("mov-monto")?.value);
      if (!(monto > 0)) return alert(t("invalidAmount"));

      movimientos.push({
        id: generarId(),
        tipo: document.getElementById("mov-tipo")?.value || "gasto",
        descripcion: document.getElementById("mov-descripcion")?.value.trim() || t("other"),
        monto,
        moneda: document.getElementById("mov-moneda")?.value || configuracion.monedaPrincipal,
        categoria: document.getElementById("mov-categoria")?.value || "Otros",
        fecha: document.getElementById("mov-fecha")?.value || hoy()
      });

      guardarTodo();
      formMovimiento.reset();

      const fecha = document.getElementById("mov-fecha");
      if (fecha) fecha.value = hoy();

      renderizarTodo();
      alert(t("movementSaved"));
    });
  }

  const formMeta = document.getElementById("form-meta-ahorro");

  if (formMeta) {
    formMeta.addEventListener("submit", evento => {
      evento.preventDefault();

      const objetivo = Number(document.getElementById("ahorro-objetivo")?.value);
      const nombre = document.getElementById("ahorro-nombre")?.value.trim();

      if (!(objetivo > 0)) return alert(t("invalidAmount"));
      if (!nombre) return;

      metas.push({
        id: generarId(),
        nombre,
        objetivo,
        moneda: document.getElementById("ahorro-moneda")?.value || configuracion.monedaPrincipal,
        fecha: document.getElementById("ahorro-fecha-meta")?.value || ""
      });

      guardarTodo();
      formMeta.reset();
      renderizarTodo();
      alert(t("goalCreated"));
    });
  }

  const formOperacionAhorro = document.getElementById("form-movimiento-ahorro");

  if (formOperacionAhorro) {
    formOperacionAhorro.addEventListener("submit", evento => {
      evento.preventDefault();

      const metaId = document.getElementById("ahorro-meta-seleccionada")?.value;
      const monto = Number(document.getElementById("ahorro-monto")?.value);

      if (!metaId) {
        alert(t("chooseGoal"));
        return;
      }

      if (!(monto > 0)) return alert(t("invalidAmount"));

      operacionesAhorro.push({
        id: generarId(),
        metaId,
        tipo: document.getElementById("ahorro-tipo")?.value || "deposito",
        monto,
        moneda: document.getElementById("ahorro-moneda-movimiento")?.value || configuracion.monedaPrincipal,
        fecha: document.getElementById("ahorro-fecha-movimiento")?.value || hoy()
      });

      guardarTodo();
      formOperacionAhorro.reset();

      const fecha = document.getElementById("ahorro-fecha-movimiento");
      if (fecha) fecha.value = hoy();

      renderizarTodo();
      alert(t("saved"));
    });
  }

  const formPresupuesto = document.getElementById("form-presupuesto");

  if (formPresupuesto) {
    formPresupuesto.addEventListener("submit", evento => {
      evento.preventDefault();

      const monto = Number(document.getElementById("presupuesto-monto")?.value);
      if (!(monto > 0)) return alert(t("invalidAmount"));

      const categoria = document.getElementById("presupuesto-categoria")?.value || "Otros";

      presupuestos = presupuestos.filter(p => p.categoria !== categoria);

      presupuestos.push({
        id: generarId(),
        categoria,
        monto,
        moneda: document.getElementById("presupuesto-moneda")?.value || configuracion.monedaPrincipal
      });

      guardarTodo();
      formPresupuesto.reset();
      renderizarTodo();
      alert(t("budgetSaved"));
    });
  }

  const formRecurrente = document.getElementById("form-recurrente");

  if (formRecurrente) {
    formRecurrente.addEventListener("submit", evento => {
      evento.preventDefault();

      const monto = Number(document.getElementById("recurrente-monto")?.value);
      if (!(monto > 0)) return alert(t("invalidAmount"));

      recurrentes.push({
        id: generarId(),
        descripcion: document.getElementById("recurrente-descripcion")?.value.trim() || t("expense"),
        monto,
        moneda: document.getElementById("recurrente-moneda")?.value || configuracion.monedaPrincipal,
        categoria: document.getElementById("recurrente-categoria")?.value || "Otros",
        frecuencia: document.getElementById("recurrente-frecuencia")?.value || "mensual",
        dia: document.getElementById("recurrente-dia")?.value || ""
      });

      guardarTodo();
      formRecurrente.reset();
      renderizarTodo();
      alert(t("recurringSaved"));
    });
  }
}

function configurarEventosDeListas() {
  document.addEventListener("click", evento => {
    const objetivo = evento.target.closest("button");
    if (!objetivo) return;

    const eliminarMovimiento = objetivo.dataset.eliminarMovimiento;
    const eliminarMeta = objetivo.dataset.eliminarMeta;
    const eliminarPresupuesto = objetivo.dataset.eliminarPresupuesto;
    const eliminarRecurrente = objetivo.dataset.eliminarRecurrente;
    const verOperaciones = objetivo.dataset.verOperaciones;

    if (eliminarMovimiento) {
      if (!confirm(t("confirmDelete"))) return;
      movimientos = movimientos.filter(m => m.id !== eliminarMovimiento);
      guardarTodo();
      renderizarTodo();
      return;
    }

    if (eliminarMeta) {
      if (!confirm(t("confirmDelete"))) return;
      metas = metas.filter(m => m.id !== eliminarMeta);
      operacionesAhorro = operacionesAhorro.filter(op => op.metaId !== eliminarMeta);
      guardarTodo();
      renderizarTodo();
      return;
    }

    if (eliminarPresupuesto) {
      if (!confirm(t("confirmDelete"))) return;
      presupuestos = presupuestos.filter(p => p.id !== eliminarPresupuesto);
      guardarTodo();
      renderizarTodo();
      return;
    }

    if (eliminarRecurrente) {
      if (!confirm(t("confirmDelete"))) return;
      recurrentes = recurrentes.filter(r => r.id !== eliminarRecurrente);
      guardarTodo();
      renderizarTodo();
      return;
    }

    if (verOperaciones) {
      const lista = obtenerOperacionesMeta(verOperaciones);
      const texto = lista.length
        ? lista.map(op =>
          `${op.fecha}: ${op.tipo === "retiro" ? t("withdrawal") : t("deposit")} ${formatoMoneda(op.monto, op.moneda)}`
        ).join("\n")
        : t("noData");

      alert(texto);
    }
  });
}

function configurarFiltros() {
  [
    "filtro-tipo-movimiento",
    "filtro-mes-movimientos",
    "filtro-moneda-movimientos",
    "filtro-mes-inicio",
    "estadisticas-mes"
  ].forEach(id => {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    elemento.addEventListener("change", () => {
      renderizarInicio();
      renderizarMovimientos();
      renderizarEstadisticas();
    });
  });
}

function exportarDatos() {
  const respaldo = {
    version: 2,
    fechaExportacion: new Date().toISOString(),
    movimientos,
    metas,
    operacionesAhorro,
    presupuestos,
    recurrentes,
    configuracion
  };

  const archivo = new Blob(
    [JSON.stringify(respaldo, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = `mis-finanzas-respaldo-${hoy()}.json`;
  enlace.click();

  URL.revokeObjectURL(url);
  alert(t("exportSuccess"));
}

function importarDatos(archivo) {
  if (!archivo) {
    alert(t("selectFile"));
    return;
  }

  const lector = new FileReader();

  lector.onload = () => {
    try {
      const datos = JSON.parse(lector.result);

      if (
        !datos ||
        !Array.isArray(datos.movimientos) ||
        !Array.isArray(datos.metas)
      ) {
        throw new Error("Respaldo no válido");
      }

      movimientos = datos.movimientos;
      metas = datos.metas;
      operacionesAhorro = Array.isArray(datos.operacionesAhorro) ? datos.operacionesAhorro : [];
      presupuestos = Array.isArray(datos.presupuestos) ? datos.presupuestos : [];
      recurrentes = Array.isArray(datos.recurrentes) ? datos.recurrentes : [];

      if (datos.configuracion && typeof datos.configuracion === "object") {
        configuracion = { ...configuracion, ...datos.configuracion };
      }

      guardarTodo();
      aplicarIdioma();
      alert(t("importSuccess"));
    } catch (error) {
      console.error(error);
      alert(t("importError"));
    }
  };

  lector.readAsText(archivo);
}

function configurarConfiguracion() {
  const selectorIdioma = document.getElementById("idioma-aplicacion");

  if (selectorIdioma) {
    selectorIdioma.value = configuracion.idioma;
    selectorIdioma.addEventListener("change", () => cambiarIdioma(selectorIdioma.value));
  }

  const selectorMoneda = document.getElementById("moneda-principal");

  if (selectorMoneda) {
    selectorMoneda.value = configuracion.monedaPrincipal;

    selectorMoneda.addEventListener("change", () => {
      cambiarMonedaPrincipal();
    });
  }

  const guardarMoneda = document.getElementById("guardar-moneda");

  if (guardarMoneda) {
    guardarMoneda.addEventListener("click", cambiarMonedaPrincipal);
  }

  const actualizar = document.getElementById("actualizar-tasas");

  if (actualizar) {
    actualizar.addEventListener("click", actualizarTasasAutomaticas);
  }

  const guardarTasas = document.getElementById("guardar-tasas");

  if (guardarTasas) {
    guardarTasas.addEventListener("click", guardarTasasManuales);
  }

  const exportar = document.getElementById("exportar-datos");

  if (exportar) {
    exportar.addEventListener("click", exportarDatos);
  }

  const importar = document.getElementById("importar-datos");
  const archivo = document.getElementById("archivo-importar");

  if (importar && archivo) {
    importar.addEventListener("click", () => archivo.click());

    archivo.addEventListener("change", () => {
      if (archivo.files && archivo.files[0]) {
        importarDatos(archivo.files[0]);
        archivo.value = "";
      }
    });
  }
}

function inicializarFechas() {
  [
    "mov-fecha",
    "ahorro-fecha-movimiento"
  ].forEach(id => {
    const campo = document.getElementById(id);
    if (campo && !campo.value) campo.value = hoy();
  });

  [
    "filtro-mes-inicio",
    "filtro-mes-movimientos",
    "estadisticas-mes"
  ].forEach(id => {
    const campo = document.getElementById(id);
    if (campo && !campo.value) campo.value = mesActual();
  });
}

function iniciarAplicacion() {
  configurarNavegacion();
  configurarFormularios();
  configurarEventosDeListas();
  configurarFiltros();
  configurarConfiguracion();
  inicializarFechas();

  aplicarIdioma();
  renderizarTodo();

  // Registrar el service worker para permitir el uso como PWA.
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .catch(error => console.warn("No se pudo registrar el service worker:", error));
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
  iniciarAplicacion();
   }
