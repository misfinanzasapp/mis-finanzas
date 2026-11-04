
"use strict";

/* =====================================================
   MIS FINANZAS 2.0
   Compatible con index.html y style.css actuales
   CRC principal | Tasas automáticas y manuales
   Español / English
   ===================================================== */

const CLAVES = {
  movimientos: "mf_movimientos_v2",
  metas: "mf_metas_v2",
  operaciones: "mf_operaciones_ahorro_v2",
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

const TRADUCCIONES = {
  es: {
    appTitle: "Mis Finanzas",
    balance: "Balance total",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorros",
    budget: "Presupuesto",
    available: "Disponible",
    quickActions: "Acciones rápidas",
    addMovement: "+ Movimiento",
    addSavings: "+ Ahorro",
    myBudget: "Presupuesto",
    financialTips: "Consejos financieros",
    recentMovements: "Movimientos recientes",
    expenseSummary: "Resumen de gastos",
    movements: "Movimientos",
    type: "Tipo",
    description: "Descripción",
    amount: "Monto",
    currency: "Moneda",
    category: "Categoría",
    date: "Fecha",
    saveMovement: "Guardar movimiento",
    movementHistory: "Historial",
    mySavings: "Mis ahorros",
    savingsDescription: "Crea metas y registra tus aportes y retiros.",
    createGoal: "Crear meta de ahorro",
    goalName: "Nombre de la meta",
    targetAmount: "Monto objetivo",
    targetDate: "Fecha objetivo",
    recordSavings: "Registrar ahorro o retiro",
    savingsGoal: "Meta de ahorro",
    operation: "Operación",
    deposit: "Aporte",
    withdrawal: "Retiro",
    save: "Guardar",
    myGoals: "Mis metas",
    budgetAmount: "Monto del presupuesto",
    saveBudget: "Guardar presupuesto",
    budgetOverview: "Resumen del presupuesto",
    recurring: "Recurrentes",
    frequency: "Frecuencia",
    monthly: "Mensual",
    weekly: "Semanal",
    biweekly: "Quincenal",
    day: "Día",
    myRecurring: "Mis gastos recurrentes",
    statistics: "Estadísticas",
    tipsDescription: "Ideas para ahorrar, administrar tu dinero y reducir deudas.",
    settings: "Configuración",
    language: "Idioma",
    mainCurrency: "Moneda principal",
    saveCurrency: "Guardar moneda",
    exchangeRates: "Tipos de cambio",
    exchangeDescription: "Puedes actualizar las tasas automáticamente o introducirlas manualmente.",
    updateRates: "Actualizar tasas automáticas",
    saveRates: "Guardar tasas manuales",
    dataManagement: "Administrar datos",
    exportData: "Exportar datos",
    importData: "Importar datos",
    home: "Inicio",
    more: "Más"
  },

  en: {
    appTitle: "My Finances",
    balance: "Total balance",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    budget: "Budget",
    available: "Available",
    quickActions: "Quick actions",
    addMovement: "+ Transaction",
    addSavings: "+ Savings",
    myBudget: "Budget",
    financialTips: "Financial tips",
    recentMovements: "Recent transactions",
    expenseSummary: "Expense summary",
    movements: "Transactions",
    type: "Type",
    description: "Description",
    amount: "Amount",
    currency: "Currency",
    category: "Category",
    date: "Date",
    saveMovement: "Save transaction",
    movementHistory: "History",
    mySavings: "My savings",
    savingsDescription: "Create goals and record deposits and withdrawals.",
    createGoal: "Create savings goal",
    goalName: "Goal name",
    targetAmount: "Target amount",
    targetDate: "Target date",
    recordSavings: "Record deposit or withdrawal",
    savingsGoal: "Savings goal",
    operation: "Operation",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    save: "Save",
    myGoals: "My goals",
    budgetAmount: "Budget amount",
    saveBudget: "Save budget",
    budgetOverview: "Budget overview",
    recurring: "Recurring",
    frequency: "Frequency",
    monthly: "Monthly",
    weekly: "Weekly",
    biweekly: "Biweekly",
    day: "Day",
    myRecurring: "My recurring expenses",
    statistics: "Statistics",
    tipsDescription: "Ideas to save money, manage finances and reduce debt.",
    settings: "Settings",
    language: "Language",
    mainCurrency: "Main currency",
    saveCurrency: "Save currency",
    exchangeRates: "Exchange rates",
    exchangeDescription: "Update rates automatically or enter them manually.",
    updateRates: "Update automatic rates",
    saveRates: "Save manual rates",
    dataManagement: "Manage data",
    exportData: "Export data",
    importData: "Import data",
    home: "Home",
    more: "More"
  }
};

const CATEGORIAS = {
  es: {
    Salario: "Salario",
    Negocio: "Negocio",
    Alimentación: "Alimentación",
    Vivienda: "Vivienda",
    Transporte: "Transporte",
    Servicios: "Servicios",
    Salud: "Salud",
    Educación: "Educación",
    Entretenimiento: "Entretenimiento",
    Deudas: "Deudas",
    Otros: "Otros"
  },
  en: {
    Salario: "Salary",
    Negocio: "Business",
    Alimentación: "Food",
    Vivienda: "Housing",
    Transporte: "Transportation",
    Servicios: "Utilities",
    Salud: "Healthcare",
    Educación: "Education",
    Entretenimiento: "Entertainment",
    Deudas: "Debt",
    Otros: "Other"
  }
};

const CONSEJOS = {
  es: {
    ahorro: [
      "Aparta una cantidad de dinero cada vez que recibas ingresos.",
      "Intenta ahorrar entre el 5% y el 10% de tus ingresos.",
      "Automatiza una transferencia a tu cuenta de ahorro.",
      "Revisa tus suscripciones y elimina las que no utilizas.",
      "Separa tus ahorros del dinero destinado a gastos diarios."
    ],
    presupuesto: [
      "Asigna un límite mensual a cada categoría.",
      "Revisa tu presupuesto al menos una vez por semana.",
      "Prioriza vivienda, alimentación y servicios esenciales.",
      "No confundas tu saldo bancario con dinero libre para gastar."
    ],
    deudas: [
      "Haz una lista de tus deudas, tasas de interés y pagos mínimos.",
      "Prioriza las deudas con intereses más altos.",
      "Evita utilizar tarjetas para gastos que no puedes pagar.",
      "Revisa las condiciones antes de aceptar una refinanciación."
    ],
    emergencia: [
      "Construye un fondo de emergencia poco a poco.",
      "Una primera meta puede ser un mes de gastos esenciales.",
      "A largo plazo, intenta alcanzar entre tres y seis meses.",
      "Mantén este dinero separado para imprevistos reales."
    ]
  },
  en: {
    ahorro: [
      "Set aside money every time you receive income.",
      "Try to save between 5% and 10% of your income.",
      "Automate a transfer to your savings account.",
      "Review your subscriptions and cancel unused ones.",
      "Keep savings separate from your daily spending money."
    ],
    presupuesto: [
      "Set a monthly limit for each spending category.",
      "Review your budget at least once a week.",
      "Prioritize housing, food and essential utilities.",
      "Do not confuse your bank balance with money available to spend."
    ],
    deudas: [
      "List your debts, interest rates and minimum payments.",
      "Prioritize debts with the highest interest rates.",
      "Avoid using credit cards for purchases you cannot repay.",
      "Review the terms before accepting refinancing."
    ],
    emergencia: [
      "Build an emergency fund gradually.",
      "An initial goal could be one month of essential expenses.",
      "Over time, aim for three to six months of expenses.",
      "Keep this money separate for genuine emergencies."
    ]
  }
};

/* =====================================================
   CARGA Y CONSERVACIÓN DE DATOS
   ===================================================== */

function cargarArray(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function cargarObjeto(clave) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave) || "{}");
    return datos && typeof datos === "object" && !Array.isArray(datos)
      ? datos : {};
  } catch {
    return {};
  }
}

let movimientos = cargarArray(CLAVES.movimientos);
let metas = cargarArray(CLAVES.metas);
let operacionesAhorro = cargarArray(CLAVES.operaciones);
let presupuestos = cargarArray(CLAVES.presupuestos);
let recurrentes = cargarArray(CLAVES.recurrentes);

const CONFIG_DEFAULT = {
  idioma: "es",
  monedaPrincipal: "CRC",
  tasasManuales: {
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
  fechaTasas: null,
  modoTasas: "both"
};

let configuracion = {
  ...CONFIG_DEFAULT,
  ...cargarObjeto(CLAVES.configuracion)
};

configuracion.tasasManuales = {
  ...CONFIG_DEFAULT.tasasManuales,
  ...(configuracion.tasasManuales || {})
};

configuracion.tasasAutomaticas =
  configuracion.tasasAutomaticas || {};

if (!TRADUCCIONES[configuracion.idioma]) {
  configuracion.idioma = "es";
}

if (!MONEDAS[configuracion.monedaPrincipal]) {
  configuracion.monedaPrincipal = "CRC";
}

function guardarTodo() {
  localStorage.setItem(CLAVES.movimientos, JSON.stringify(movimientos));
  localStorage.setItem(CLAVES.metas, JSON.stringify(metas));
  localStorage.setItem(CLAVES.operaciones, JSON.stringify(operacionesAhorro));
  localStorage.setItem(CLAVES.presupuestos, JSON.stringify(presupuestos));
  localStorage.setItem(CLAVES.recurrentes, JSON.stringify(recurrentes));
  localStorage.setItem(CLAVES.configuracion, JSON.stringify(configuracion));
}

function t(clave) {
  return TRADUCCIONES[configuracion.idioma]?.[clave] ||
    TRADUCCIONES.es[clave] || clave;
}

function id() {
  return Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8);
}

function hoy() {
  const fecha = new Date();
  fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
  return fecha.toISOString().slice(0, 10);
}

function mesActual() {
  return hoy().slice(0, 7);
}

function numero(valor) {
  const resultado = Number(valor);
  return Number.isFinite(resultado) ? resultado : 0;
}

function escapar(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caracter]);
}

function nombreCategoria(categoria) {
  return CATEGORIAS[configuracion.idioma]?.[categoria] ||
    CATEGORIAS.es[categoria] || categoria;
}

/* =====================================================
   MONEDAS Y CONVERSIONES
   ===================================================== */

function formatoMoneda(valor, moneda = configuracion.monedaPrincipal) {
  try {
    return new Intl.NumberFormat(
      configuracion.idioma === "en" ? "en-US" : "es-CR",
      {
        style: "currency",
        currency: moneda,
        maximumFractionDigits: 2
      }
    ).format(numero(valor));
  } catch {
    return moneda + " " + numero(valor).toFixed(2);
  }
}

function obtenerTasa(moneda) {
  if (moneda === configuracion.monedaPrincipal) return 1;

  const automaticas = configuracion.tasasAutomaticas || {};
  const manuales = configuracion.tasasManuales || {};

  if (configuracion.modoTasas !== "manual") {
    const tasaAutomatica = numero(automaticas[moneda]);
    if (tasaAutomatica > 0) return tasaAutomatica;
  }

  const tasaManual = numero(manuales[moneda]);
  return tasaManual > 0 ? tasaManual : 0;
}

function convertirAMonedaPrincipal(monto, moneda) {
  monto = numero(monto);
  moneda = moneda || configuracion.monedaPrincipal;

  if (moneda === configuracion.monedaPrincipal) return monto;

  const tasa = obtenerTasa(moneda);
  return tasa > 0 ? monto * tasa : monto;
}

function llenarSelectoresMonedas() {
  const ids = [
    "mov-moneda",
    "ahorro-moneda",
    "ahorro-moneda-movimiento",
    "presupuesto-moneda",
    "recurrente-moneda"
  ];

  ids.forEach(idSelect => {
    const select = document.getElementById(idSelect);
    if (!select) return;

    const anterior = select.value || configuracion.monedaPrincipal;

    select.innerHTML = Object.keys(MONEDAS).map(codigo => {
      const nombres = {
        CRC: ["Colón costarricense", "Costa Rican Colon"],
        USD: ["Dólar estadounidense", "US Dollar"],
        EUR: ["Euro", "Euro"],
        MXN: ["Peso mexicano", "Mexican Peso"],
        GBP: ["Libra esterlina", "British Pound"],
        BRL: ["Real brasileño", "Brazilian Real"],
        COP: ["Peso colombiano", "Colombian Peso"],
        CAD: ["Dólar canadiense", "Canadian Dollar"]
      };

      const nombre = nombres[codigo][configuracion.idioma === "en" ? 1 : 0];

      return `<option value="${codigo}">${codigo} - ${nombre}</option>`;
    }).join("");

    select.value = anterior;
  }

  const principal = document.getElementById("moneda-principal");
  if (principal) principal.value = configuracion.monedaPrincipal;
}

/* =====================================================
   IDIOMA
   ===================================================== */

function traducirOpciones() {
  const idioma = configuracion.idioma;

  const categorias = [
    "mov-categoria",
    "presupuesto-categoria",
    "recurrente-categoria"
  ];

  categorias.forEach(idSelect => {
    const select = document.getElementById(idSelect);
    if (!select) return;

    [...select.options].forEach(opcion => {
      if (CATEGORIAS.es[opcion.value]) {
        opcion.textContent = nombreCategoria(opcion.value);
      }
    });
  });

  const tipo = document.getElementById("mov-tipo");
  if (tipo) {
    tipo.options[0].textContent = idioma === "en" ? "Income" : "Ingreso";
    tipo.options[1].textContent = idioma === "en" ? "Expense" : "Gasto";
  }

  const operacion = document.getElementById("ahorro-tipo");
  if (operacion) {
    operacion.options[0].textContent = idioma === "en" ? "Deposit" : "Aporte";
    operacion.options[1].textContent = idioma === "en" ? "Withdrawal" : "Retiro";
  }

  const frecuencia = document.getElementById("recurrente-frecuencia");
  if (frecuencia) {
    frecuencia.options[0].textContent = idioma === "en" ? "Monthly" : "Mensual";
    frecuencia.options[1].textContent = idioma === "en" ? "Weekly" : "Semanal";
    frecuencia.options[2].textContent = idioma === "en" ? "Biweekly" : "Quincenal";
  }
}

function aplicarIdioma() {
  document.documentElement.lang = configuracion.idioma;

  document.querySelectorAll("[data-i18n]").forEach(elemento => {
    const clave = elemento.dataset.i18n;
    elemento.textContent = t(clave);
  });

  const selector = document.getElementById("idioma-aplicacion");
  if (selector) selector.value = configuracion.idioma;

  const principal = document.getElementById("moneda-principal");
  if (principal) principal.value = configuracion.monedaPrincipal;

  const placeholders = {
    "mov-descripcion": [
      "Ej. Salario, alimentación",
      "E.g. Salary, food"
    ],
    "ahorro-nombre": [
      "Ej. Fondo de emergencia",
      "E.g. Emergency fund"
    ],
    "recurrente-descripcion": [
      "Ej. Alquiler, internet, préstamo",
      "E.g. Rent, internet, loan"
    ]
  };

  Object.entries(placeholders).forEach(([campoId, textos]) => {
    const campo = document.getElementById(campoId);
    if (campo) campo.placeholder = textos[configuracion.idioma === "en" ? 1 : 0];
  });

  llenarSelectoresMonedas();
  traducirOpciones();
  renderizarTodo();
}

/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function mostrarSeccion(nombre) {
  const destino = document.getElementById(nombre);
  if (!destino || !destino.classList.contains("page-section")) return;

  document.querySelectorAll(".page-section").forEach(seccion => {
    seccion.hidden = seccion.id !== nombre;
    seccion.classList.toggle("active", seccion.id === nombre);
  });

  document.querySelectorAll(".nav-button").forEach(boton => {
    boton.classList.toggle("active", boton.dataset.section === nombre);
  });

  const menu = document.getElementById("menu-mas");
  if (menu) menu.hidden = true;

  actualizarMenuMas();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (nombre === "estadisticas") renderizarEstadisticas();
}

function actualizarMenuMas() {
  const boton = document.getElementById("boton-mas");
  const menu = document.getElementById("menu-mas");

  if (!boton || !menu) return;

  const secciones = [
    "recurrentes",
    "estadisticas",
    "consejos",
    "configuracion"
  ];

  const activa = secciones.some(nombre =>
    document.getElementById(nombre)?.classList.contains("active")
  );

  boton.classList.toggle("active", activa);
}

function configurarNavegacion() {
  document.querySelectorAll("[data-section]").forEach(boton => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.section);
    });
  });

  const botonMas = document.getElementById("boton-mas");
  const menu = document.getElementById("menu-mas");

  if (botonMas && menu) {
    botonMas.addEventListener("click", evento => {
      evento.stopPropagation();
      menu.hidden = !menu.hidden;
    });
  }

  document.addEventListener("click", evento => {
    if (!menu || menu.hidden) return;
    if (menu.contains(evento.target)) return;
    if (botonMas?.contains(evento.target)) return;
    menu.hidden = true;
  });
}

/* =====================================================
   MOVIMIENTOS
   ===================================================== */

function registrarMovimiento(evento) {
  evento.preventDefault();

  const descripcion = document.getElementById("mov-descripcion").value.trim();
  const monto = numero(document.getElementById("mov-monto").value);
  const fecha = document.getElementById("mov-fecha").value;

  if (!descripcion || monto <= 0 || !fecha) {
    alert(configuracion.idioma === "en"
      ? "Enter a valid description, amount and date."
      : "Introduce una descripción, monto y fecha válidos.");
    return;
  }

  movimientos.unshift({
    id: id(),
    tipo: document.getElementById("mov-tipo").value,
    descripcion,
    monto,
    moneda: document.getElementById("mov-moneda").value,
    categoria: document.getElementById("mov-categoria").value,
    fecha
  });

  guardarTodo();
  evento.target.reset();

  document.getElementById("mov-fecha").value = hoy();

  llenarSelectoresMonedas();
  traducirOpciones();
  renderizarTodo();

  alert(configuracion.idioma === "en" ? "Transaction saved." : "Movimiento guardado.");
}

function renderizarMovimientos() {
  const contenedor = document.getElementById("lista-movimientos");
  const recientes = document.getElementById("lista-movimientos-inicio");

  function dibujar(lista) {
    if (!lista.length) {
      return `<p>${configuracion.idioma === "en"
        ? "No transactions recorded yet."
        : "Todavía no tienes movimientos registrados."}</p>`;
    }

    return lista.map(m => {
      const ingreso = m.tipo === "ingreso";
      const moneda = m.moneda || configuracion.monedaPrincipal;
      const valorPrincipal = convertirAMonedaPrincipal(m.monto, moneda);

      return `
        <div class="movimiento ${ingreso ? "movimiento-ingreso" : "movimiento-gasto"}">
          <div class="movimiento-header">
            <span class="movimiento-descripcion">${escapar(m.descripcion)}</span>
            <span class="movimiento-monto">
              ${ingreso ? "+" : "−"}${formatoMoneda(valorPrincipal)}
            </span>
          </div>
          <div class="movimiento-info">
            ${nombreCategoria(m.categoria)} · ${escapar(m.fecha || "")}
          </div>
          <div class="movimiento-info">
            ${formatoMoneda(m.monto, moneda)}
          </div>
          <button type="button" data-delete-movement="${escapar(m.id)}">
            ${configuracion.idioma === "en" ? "Delete" : "Eliminar"}
          </button>
        </div>`;
    }).join("");
  }

  if (contenedor) contenedor.innerHTML = dibujar(movimientos);
  if (recientes) recientes.innerHTML = dibujar(movimientos.slice(0, 5));
}

function eliminarMovimiento(idMovimiento) {
  if (!confirm(configuracion.idioma === "en"
    ? "Delete this transaction?"
    : "¿Deseas eliminar este movimiento?")) return;

  movimientos = movimientos.filter(m => String(m.id) !== String(idMovimiento));
  guardarTodo();
  renderizarTodo();
}

/* =====================================================
   AHORROS Y METAS
   ===================================================== */

function totalMeta(metaId) {
  return operacionesAhorro
    .filter(op => String(op.metaId) === String(metaId))
    .reduce((total, op) => {
      const valor = convertirAMonedaPrincipal(
        op.monto,
        op.moneda || configuracion.monedaPrincipal
      );
      return total + (op.tipo === "retiro" ? -valor : valor);
    }, 0);
}

function totalAhorros() {
  return operacionesAhorro.reduce((total, op) => {
    const valor = convertirAMonedaPrincipal(
      op.monto,
      op.moneda || configuracion.monedaPrincipal
    );
    return total + (op.tipo === "retiro" ? -valor : valor);
  }, 0);
}

function renderizarAhorros() {
  const contenedor = document.getElementById("lista-metas-ahorro");
  const selector = document.getElementById("ahorro-meta-seleccionada");
  const totalElemento = document.getElementById("ahorro-total-general");

  if (totalElemento) {
    totalElemento.textContent = formatoMoneda(totalAhorros());
  }

  if (selector) {
    const anterior = selector.value;

    selector.innerHTML = metas.map(meta =>
      `<option value="${escapar(meta.id)}">${escapar(meta.nombre)}</option>`
    ).join("");

    if (metas.some(meta => String(meta.id) === anterior)) {
      selector.value = anterior;
    }

    selector.disabled = metas.length === 0;
  }

  if (!contenedor) return;

  if (!metas.length) {
    contenedor.innerHTML = `<p>${configuracion.idioma === "en"
      ? "You have no savings goals yet."
      : "Todavía no tienes metas de ahorro."}</p>`;
    return;
  }

  contenedor.innerHTML = metas.map(meta => {
    const moneda = meta.moneda || configuracion.monedaPrincipal;
    const ahorrado = totalMeta(meta.id);
    const objetivo = convertirAMonedaPrincipal(meta.objetivo, moneda);
    const porcentaje = objetivo > 0
      ? Math.max(0, Math.min(100, ahorrado / objetivo * 100))
      : 0;

    const restante = Math.max(0, objetivo - ahorrado);

    return `
      <div class="savings-goal">
        <strong>${escapar(meta.nombre)}</strong>
        <p>${configuracion.idioma === "en" ? "Progress" : "Progreso"}: ${porcentaje.toFixed(1)}%</p>
        <div class="savings-progress">
          <div class="savings-progress-bar" style="width:${porcentaje}%"></div>
        </div>
        <p>${configuracion.idioma === "en" ? "Saved" : "Ahorrado"}: ${formatoMoneda(ahorrado)}</p>
        <p>${configuracion.idioma === "en" ? "Target" : "Objetivo"}: ${formatoMoneda(meta.objetivo, moneda)}</p>
        <p>${configuracion.idioma === "en" ? "Remaining" : "Restante"}: ${formatoMoneda(restante)}</p>
        ${meta.fecha ? `<p>${configuracion.idioma === "en" ? "Target date" : "Fecha objetivo"}: ${escapar(meta.fecha)}</p>` : ""}
        ${porcentaje >= 100 ? `<strong>${configuracion.idioma === "en" ? "Goal completed!" : "¡Meta completada!"}</strong>` : ""}
        <button type="button" data-delete-goal="${escapar(meta.id)}">
          ${configuracion.idioma === "en" ? "Delete goal" : "Eliminar meta"}
        </button>
      </div>`;
  }).join("");
}

function crearMeta(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("ahorro-nombre").value.trim();
  const objetivo = numero(document.getElementById("ahorro-objetivo").value);

  if (!nombre || objetivo <= 0) {
    alert(configuracion.idioma === "en"
      ? "Enter a valid goal and amount."
      : "Introduce una meta y un monto válidos.");
    return;
  }

  metas.unshift({
    id: id(),
    nombre,
    objetivo,
    moneda: document.getElementById("ahorro-moneda").value,
    fecha: document.getElementById("ahorro-fecha-meta").value
  });

  guardarTodo();
  evento.target.reset();
  llenarSelectoresMonedas();
  renderizarTodo();

  alert(configuracion.idioma === "en" ? "Goal created." : "Meta creada.");
}

function registrarAhorro(evento) {
  evento.preventDefault();

  const metaId = document.getElementById("ahorro-meta-seleccionada").value;
  const monto = numero(document.getElementById("ahorro-monto").value);
  const fecha = document.getElementById("ahorro-fecha-movimiento").value;

  if (!metas.length || !metaId) {
    alert(configuracion.idioma === "en"
      ? "Create a savings goal first."
      : "Primero crea una meta de ahorro.");
    return;
  }

  if (monto <= 0 || !fecha) {
    alert(configuracion.idioma === "en"
      ? "Enter a valid amount and date."
      : "Introduce un monto y fecha válidos.");
    return;
  }

  const tipo = document.getElementById("ahorro-tipo").value;

  if (tipo === "retiro" && monto > totalMeta(metaId)) {
    alert(configuracion.idioma === "en"
      ? "The withdrawal exceeds the available savings in this goal."
      : "El retiro supera el ahorro disponible en esta meta.");
    return;
  }

  operacionesAhorro.unshift({
    id: id(),
    metaId,
    tipo,
    monto,
    moneda: document.getElementById("ahorro-moneda-movimiento").value,
    fecha
  });

  guardarTodo();
  evento.target.reset();

  document.getElementById("ahorro-fecha-movimiento").value = hoy();

  renderizarTodo();
  alert(configuracion.idioma === "en" ? "Savings operation saved." : "Operación guardada.");
}

function eliminarMeta(metaId) {
  if (!confirm(configuracion.idioma === "en"
    ? "Delete this goal and its operations?"
    : "¿Eliminar esta meta y sus operaciones?")) return;

  metas = metas.filter(meta => String(meta.id) !== String(metaId));
  operacionesAhorro = operacionesAhorro.filter(
    op => String(op.metaId) !== String(metaId)
  );

  guardarTodo();
  renderizarTodo();
}

/* =====================================================
   PRESUPUESTOS
   ===================================================== */

function renderizarPresupuestos() {
  const contenedor = document.getElementById("lista-presupuestos");
  if (!contenedor) return;

  if (!presupuestos.length) {
    contenedor.innerHTML = `<p>${configuracion.idioma === "en"
      ? "No budgets recorded."
      : "No hay presupuestos registrados."}</p>`;
    return;
  }

  contenedor.innerHTML = presupuestos.map(p => {
    const moneda = p.moneda || configuracion.monedaPrincipal;
    const limite = convertirAMonedaPrincipal(p.monto, moneda);

    const gastado = movimientos
      .filter(m =>
        m.tipo === "gasto" &&
        m.categoria === p.categoria &&
        String(m.fecha || "").slice(0, 7) === mesActual()
      )
      .reduce((total, m) =>
        total + convertirAMonedaPrincipal(
          m.monto,
          m.moneda || configuracion.monedaPrincipal
        ), 0);

    const porcentaje = limite > 0 ? gastado / limite * 100 : 0;
    const restante = limite - gastado;

    return `
      <div class="card">
        <strong>${nombreCategoria(p.categoria)}</strong>
        <p>${configuracion.idioma === "en" ? "Spent" : "Gastado"}: ${formatoMoneda(gastado)}</p>
        <div class="progress-container">
          <div class="progress-bar" style="width:${Math.min(100, porcentaje)}%;background:${porcentaje > 100 ? "#dc2626" : "#22c55e"}"></div>
        </div>
        <p>${configuracion.idioma === "en" ? "Limit" : "Límite"}: ${formatoMoneda(p.monto, moneda)}</p>
        <p>${restante >= 0
          ? (configuracion.idioma === "en" ? "Available" : "Disponible") + ": " + formatoMoneda(restante)
          : (configuracion.idioma === "en" ? "Exceeded" : "Excedido") + ": " + formatoMoneda(Math.abs(restante))}
        </p>
        <button type="button" data-delete-budget="${escapar(p.id)}">
          ${configuracion.idioma === "en" ? "Delete" : "Eliminar"}
        </button>
      </div>`;
  }).join("");
}

function crearPresupuesto(evento) {
  evento.preventDefault();

  const monto = numero(document.getElementById("presupuesto-monto").value);

  if (monto <= 0) {
    alert(configuracion.idioma === "en"
      ? "Enter a valid amount."
      : "Introduce un monto válido.");
    return;
  }

  presupuestos.push({
    id: id(),
    categoria: document.getElementById("presupuesto-categoria").value,
    monto,
    moneda: document.getElementById("presupuesto-moneda").value
  });

  guardarTodo();
  evento.target.reset();
  llenarSelectoresMonedas();
  traducirOpciones();
  renderizarTodo();

  alert(configuracion.idioma === "en" ? "Budget saved." : "Presupuesto guardado.");
}

function eliminarPresupuesto(presupuestoId) {
  if (!confirm(configuracion.idioma === "en"
    ? "Delete this budget?"
    : "¿Eliminar este presupuesto?")) return;

  presupuestos = presupuestos.filter(p => String(p.id) !== String(presupuestoId));
  guardarTodo();
  renderizarTodo();
}

/* =====================================================
   GASTOS RECURRENTES
   ===================================================== */

function renderizarRecurrentes() {
  const contenedor = document.getElementById("lista-recurrentes");
  if (!contenedor) return;

  if (!recurrentes.length) {
    contenedor.innerHTML = `<p>${configuracion.idioma === "en"
      ? "No recurring expenses recorded."
      : "No hay gastos recurrentes registrados."}</p>`;
    return;
  }

  const frecuencias = {
    mensual: configuracion.idioma === "en" ? "Monthly" : "Mensual",
    semanal: configuracion.idioma === "en" ? "Weekly" : "Semanal",
    quincenal: configuracion.idioma === "en" ? "Biweekly" : "Quincenal"
  };

  contenedor.innerHTML = recurrentes.map(r => `
    <div class="recurrente">
      <strong>${escapar(r.descripcion)}</strong>
      <p>${nombreCategoria(r.categoria)}</p>
      <p>${frecuencias[r.frecuencia] || escapar(r.frecuencia)}</p>
      <p>${configuracion.idioma === "en" ? "Day" : "Día"}: ${escapar(r.dia)}</p>
      <strong>${formatoMoneda(r.monto, r.moneda || configuracion.monedaPrincipal)}</strong>
      <button type="button" data-delete-recurring="${escapar(r.id)}">
        ${configuracion.idioma === "en" ? "Delete" : "Eliminar"}
      </button>
    </div>
  `).join("");
}

function crearRecurrente(evento) {
  evento.preventDefault();

  const descripcion = document.getElementById("recurrente-descripcion").value.trim();
  const monto = numero(document.getElementById("recurrente-monto").value);
  const dia = numero(document.getElementById("recurrente-dia").value);

  if (!descripcion || monto <= 0 || dia < 1 || dia > 31) {
    alert(configuracion.idioma === "en"
      ? "Check the description, amount and day."
      : "Revisa la descripción, el monto y el día.");
    return;
  }

  recurrentes.push({
    id: id(),
    descripcion,
    monto,
    moneda: document.getElementById("recurrente-moneda").value,
    categoria: document.getElementById("recurrente-categoria").value,
    frecuencia: document.getElementById("recurrente-frecuencia").value,
    dia
  });

  guardarTodo();
  evento.target.reset();
  llenarSelectoresMonedas();
  traducirOpciones();
  renderizarTodo();

  alert(configuracion.idioma === "en" ? "Recurring expense saved." : "Gasto recurrente guardado.");
}

function eliminarRecurrente(recurrenteId) {
  if (!confirm(configuracion.idioma === "en"
    ? "Delete this recurring expense?"
    : "¿Eliminar este gasto recurrente?")) return;

  recurrentes = recurrentes.filter(r => String(r.id) !== String(recurrenteId));
  guardarTodo();
  renderizarTodo();
}

/* =====================================================
   ESTADÍSTICAS
   ===================================================== */

let graficoEstadisticas = null;

function renderizarEstadisticas() {
  const resumen = document.getElementById("resumen-estadisticas");
  const canvas = document.getElementById("grafico-estadisticas");

  const ingresos = movimientos
    .filter(m => m.tipo === "ingreso")
    .reduce((s, m) => s + convertirAMonedaPrincipal(
      m.monto, m.moneda || configuracion.monedaPrincipal
    ), 0);

  const gastos = movimientos
    .filter(m => m.tipo === "gasto")
    .reduce((s, m) => s + convertirAMonedaPrincipal(
      m.monto, m.moneda || configuracion.monedaPrincipal
    ), 0);

  if (resumen) {
    resumen.innerHTML = `
      <p>${t("income")}: <strong>${formatoMoneda(ingresos)}</strong></p>
      <p>${t("expenses")}: <strong>${formatoMoneda(gastos)}</strong></p>
      <p>${configuracion.idioma === "en" ? "Net balance" : "Balance neto"}:
        <strong>${formatoMoneda(ingresos - gastos)}</strong></p>
      <p>${t("savings")}: <strong>${formatoMoneda(totalAhorros())}</strong></p>`;
  }

  if (!canvas || typeof Chart === "undefined") return;

  const categorias = {};

  movimientos.filter(m => m.tipo === "gasto").forEach(m => {
    const categoria = m.categoria || "Otros";
    categorias[categoria] = (categorias[categoria] || 0) +
      convertirAMonedaPrincipal(
        m.monto, m.moneda || configuracion.monedaPrincipal
      );
  });

  if (graficoEstadisticas) graficoEstadisticas.destroy();

  const etiquetas = Object.keys(categorias).map(nombreCategoria);
  const valores = Object.values(categorias);

  graficoEstadisticas = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: etiquetas.length ? etiquetas : [t("expenses")],
      datasets: [{
        data: valores.length ? valores : [0],
        borderWidth: 2
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

/* =====================================================
   CONSEJOS FINANCIEROS
   ===================================================== */

function renderizarConsejos() {
  const contenedor = document.getElementById("lista-consejos");
  if (!contenedor) return;

  const consejos = CONSEJOS[configuracion.idioma];

  const grupos = [
    {
      titulo: configuracion.idioma === "en" ? "Saving tips" : "Consejos para ahorrar",
      lista: consejos.ahorro,
      clase: "success"
    },
    {
      titulo: configuracion.idioma === "en" ? "Budgeting tips" : "Consejos para presupuestar",
      lista: consejos.presupuesto,
      clase: "info"
    },
    {
      titulo: configuracion.idioma === "en" ? "Debt management" : "Consejos para manejar deudas",
      lista: consejos.deudas,
      clase: "warning"
    },
    {
      titulo: configuracion.idioma === "en" ? "Emergency fund" : "Fondo de emergencia",
      lista: consejos.emergencia,
      clase: "success"
    }
  ];

  contenedor.innerHTML = grupos.map(grupo => `
    <div class="consejo ${grupo.clase}">
      <strong>${grupo.titulo}</strong>
      <ul>${grupo.lista.map(item => `<li>${escapar(item)}</li>`).join("")}</ul>
    </div>
  `).join("");
}

/* =====================================================
   INICIO Y RESUMEN PRINCIPAL
   ===================================================== */

function renderizarInicio() {
  const mes = mesActual();

  const delMes = movimientos.filter(m =>
    String(m.fecha || "").slice(0, 7) === mes
  );

  const ingresos = delMes
    .filter(m => m.tipo === "ingreso")
    .reduce((s, m) => s + convertirAMonedaPrincipal(
      m.monto, m.moneda || configuracion.monedaPrincipal
    ), 0);

  const gastos = delMes
    .filter(m => m.tipo === "gasto")
    .reduce((s, m) => s + convertirAMonedaPrincipal(
      m.monto, m.moneda || configuracion.monedaPrincipal
    ), 0);

  const ahorros = totalAhorros();
  const balance = ingresos - gastos;

  const totalPresupuesto = presupuestos.reduce((s, p) =>
    s + convertirAMonedaPrincipal(
      p.monto, p.moneda || configuracion.monedaPrincipal
    ), 0);

  const disponibles = {
    "balance-total": balance,
    "total-ingresos": ingresos,
    "total-gastos": gastos,
    "total-ahorros": ahorros,
    "total-presupuesto": totalPresupuesto,
    "total-disponible": balance - ahorros
  };

  Object.entries(disponibles).forEach(([elementoId, valor]) => {
    const elemento = document.getElementById(elementoId);
    if (elemento) elemento.textContent = formatoMoneda(valor);
  });

  const moneda = document.getElementById("moneda-principal-resumen");
  if (moneda) moneda.textContent = configuracion.monedaPrincipal;

  const canvas = document.getElementById("grafico-resumen");

  if (canvas && typeof Chart !== "undefined") {
    if (window.graficoInicio) window.graficoInicio.destroy();

    window.graficoInicio = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: [t("income"), t("expenses")],
        datasets: [{
          data: [ingresos, gastos],
          borderWidth: 2
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

/* =====================================================
   CONFIGURACIÓN Y TIPOS DE CAMBIO
   ===================================================== */

function renderizarTasas() {
  const lista = document.getElementById("lista-tipos-cambio");
  const estado = document.getElementById("estado-tipo-automatico");
  const fecha = document.getElementById("fecha-actualizacion-tasas");

  if (!lista) return;

  lista.innerHTML = Object.keys(MONEDAS)
    .filter(moneda => moneda !== configuracion.monedaPrincipal)
    .map(moneda => `
      <div class="card">
        <label for="tasa-${moneda}">
          ${moneda} - ${configuracion.idioma === "en"
            ? "Main currency units per 1 unit"
            : "Unidades de moneda principal por 1 unidad"}
        </label>
        <input
          id="tasa-${moneda}"
          type="number"
          min="0.000001"
          step="any"
          value="${escapar(configuracion.tasasManuales[moneda] ?? "")}"
          placeholder="0.00">
      </div>
    `).join("");

  if (estado) {
    estado.textContent = configuracion.fechaTasas
      ? (configuracion.idioma === "en"
          ? "Automatic rates available"
          : "Tasas automáticas disponibles")
      : (configuracion.idioma === "en"
          ? "Using manual rates until automatic update"
          : "Se utilizan tasas manuales hasta actualizar automáticamente");
  }

  if (fecha) {
    fecha.textContent = configuracion.fechaTasas
      ? (configuracion.idioma === "en" ? "Last update: " : "Última actualización: ") +
        new Date(configuracion.fechaTasas).toLocaleString(
          configuracion.idioma === "en" ? "en-US" : "es-CR"
        )
      : "";
  }
}

function guardarTasasManuales() {
  if (!configuracion.tasasManuales) configuracion.tasasManuales = {};

  Object.keys(MONEDAS).forEach(moneda => {
    if (moneda === configuracion.monedaPrincipal) return;

    const campo = document.getElementById("tasa-" + moneda);
    if (!campo) return;

    const valor = numero(campo.value);

    if (valor > 0) {
      configuracion.tasasManuales[moneda] = valor;
    }
  });

  configuracion.modoTasas = "manual";
  guardarTodo();
  renderizarTodo();

  alert(configuracion.idioma === "en"
    ? "Manual exchange rates saved."
    : "Tipos de cambio manuales guardados.");
}

async function actualizarTasasAutomaticas() {
  const boton = document.getElementById("actualizar-tasas");
  const estado = document.getElementById("estado-tipo-automatico");

  if (boton) boton.disabled = true;

  if (estado) {
    estado.textContent = configuracion.idioma === "en"
      ? "Updating rates..."
      : "Actualizando tasas...";
  }

  try {
    const base = configuracion.monedaPrincipal;

    const respuesta = await fetch(
      "https://open.er-api.com/v6/latest/" + encodeURIComponent(base)
    );

    if (!respuesta.ok) throw new Error("Network error");

    const datos = await respuesta.json();

    if (datos.result !== "success" || !datos.rates) {
      throw new Error("Invalid rate data");
    }

    const tasas = {};

    Object.keys(MONEDAS).forEach(moneda => {
      if (moneda === base) {
        tasas[moneda] = 1;
      } else {
        const unidades = numero(datos.rates[moneda]);
        if (unidades > 0) tasas[moneda] = 1 / unidades;
      }
    });

    configuracion.tasasAutomaticas = tasas;
    configuracion.fechaTasas = new Date().toISOString();
    configuracion.modoTasas = "both";

    guardarTodo();
    renderizarTodo();

    alert(configuracion.idioma === "en"
      ? "Automatic exchange rates updated."
      : "Tipos de cambio actualizados.");

  } catch (error) {
    console.error("Exchange rate error:", error);

    alert(configuracion.idioma === "en"
      ? "Could not update rates. You can enter them manually."
      : "No fue posible actualizar las tasas. Puedes introducirlas manualmente.");

    renderizarTasas();

  } finally {
    if (boton) boton.disabled = false;
  }
}

function configurarConfiguracion() {
  const idioma = document.getElementById("idioma-aplicacion");

  if (idioma) {
    idioma.value = configuracion.idioma;

    idioma.addEventListener("change", () => {
      configuracion.idioma = idioma.value === "en" ? "en" : "es";
      guardarTodo();
      aplicarIdioma();
    });
  }

  const moneda = document.getElementById("moneda-principal");
  const guardarMoneda = document.getElementById("guardar-moneda");

  function cambiarMoneda() {
    const nueva = moneda?.value;

    if (!nueva || !MONEDAS[nueva]) return;

    if (nueva !== configuracion.monedaPrincipal) {
      configuracion.monedaPrincipal = nueva;
      configuracion.tasasAutomaticas = {};
      configuracion.fechaTasas = null;
      configuracion.modoTasas = "both";

      guardarTodo();
      llenarSelectoresMonedas();
      renderizarTodo();
      renderizarTasas();

      alert(configuracion.idioma === "en"
        ? "Main currency changed. Update exchange rates before converting currencies."
        : "Moneda principal cambiada. Actualiza las tasas antes de realizar conversiones.");
    }
  }

  if (moneda) {
    moneda.value = configuracion.monedaPrincipal;
    moneda.addEventListener("change", cambiarMoneda);
  }

  if (guardarMoneda) {
    guardarMoneda.addEventListener("click", () => {
      cambiarMoneda();

      alert(configuracion.idioma === "en"
        ? "Main currency settings saved."
        : "Configuración de moneda guardada.");
    });
  }

  document.getElementById("actualizar-tasas")
    ?.addEventListener("click", actualizarTasasAutomaticas);

  document.getElementById("guardar-tasas")
    ?.addEventListener("click", guardarTasasManuales);

  document.getElementById("exportar-datos")
    ?.addEventListener("click", exportarDatos);

  document.getElementById("archivo-importar")
    ?.addEventListener("change", importarDatos);
}

/* =====================================================
   EXPORTAR E IMPORTAR
   ===================================================== */

function exportarDatos() {
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

  const archivo = new Blob(
    [JSON.stringify(datos, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = "mis-finanzas-" + hoy() + ".json";

  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importarDatos(evento) {
  const archivo = evento.target.files?.[0];
  if (!archivo) return;

  const lector = new FileReader();

  lector.onload = () => {
    try {
      const datos = JSON.parse(lector.result);

      if (!Array.isArray(datos.movimientos) ||
          !Array.isArray(datos.metas)) {
        throw new Error("Invalid backup");
      }

      movimientos = datos.movimientos;
      metas = datos.metas;

      operacionesAhorro = Array.isArray(datos.operacionesAhorro)
        ? datos.operacionesAhorro : [];

      presupuestos = Array.isArray(datos.presupuestos)
        ? datos.presupuestos : [];

      recurrentes = Array.isArray(datos.recurrentes)
        ? datos.recurrentes : [];

      if (datos.configuracion) {
        configuracion = {
          ...CONFIG_DEFAULT,
          ...datos.configuracion,
          tasasManuales: {
            ...CONFIG_DEFAULT.tasasManuales,
            ...(datos.configuracion.tasasManuales || {})
          },
          tasasAutomaticas: datos.configuracion.tasasAutomaticas || {}
        };
      }

      guardarTodo();
      aplicarIdioma();

      alert(configuracion.idioma === "en"
        ? "Data imported successfully."
        : "Datos importados correctamente.");

    } catch (error) {
      console.error(error);

      alert(configuracion.idioma === "en"
        ? "Invalid backup file."
        : "El archivo no es un respaldo válido.");

    } finally {
      evento.target.value = "";
    }
  };

  lector.onerror = () => {
    alert(configuracion.idioma === "en"
      ? "Could not read the file."
      : "No fue posible leer el archivo.");
  };

  lector.readAsText(archivo);
}

/* =====================================================
   EVENTOS
   ===================================================== */

function conectarFormulario(idFormulario, funcion) {
  document.getElementById(idFormulario)
    ?.addEventListener("submit", funcion);
}

function configurarFormularios() {
  conectarFormulario("form-movimiento", registrarMovimiento);
  conectarFormulario("form-meta-ahorro", crearMeta);
  conectarFormulario("form-movimiento-ahorro", registrarAhorro);
  conectarFormulario("form-presupuesto", crearPresupuesto);
  conectarFormulario("form-recurrente", crearRecurrente);

  document.addEventListener("click", evento => {
    const boton = evento.target.closest("button");
    if (!boton) return;

    if (boton.dataset.deleteMovement) {
      eliminarMovimiento(boton.dataset.deleteMovement);
    }

    if (boton.dataset.deleteGoal) {
      eliminarMeta(boton.dataset.deleteGoal);
    }

    if (boton.dataset.deleteBudget) {
      eliminarPresupuesto(boton.dataset.deleteBudget);
    }

    if (boton.dataset.deleteRecurring) {
      eliminarRecurrente(boton.dataset.deleteRecurring);
    }
  });
}

/* =====================================================
   RENDERIZADO GENERAL
   ===================================================== */

function renderizarTodo() {
  llenarSelectoresMonedas();
  traducirOpciones();

  renderizarInicio();
  renderizarMovimientos();
  renderizarAhorros();
  renderizarPresupuestos();
  renderizarRecurrentes();
  renderizarConsejos();
  renderizarTasas();

  actualizarMenuMas();

  if (document.getElementById("estadisticas")?.classList.contains("active")) {
    renderizarEstadisticas();
  }
}

/* =====================================================
   INICIO DE LA APLICACIÓN
   ===================================================== */

function iniciarAplicacion() {
  configurarNavegacion();
  configurarFormularios();
  configurarConfiguracion();

  document.querySelectorAll(".page-section").forEach(seccion => {
    seccion.hidden = seccion.id !== "inicio";
    seccion.classList.toggle("active", seccion.id === "inicio");
  });

  const fechaMovimiento = document.getElementById("mov-fecha");
  const fechaAhorro = document.getElementById("ahorro-fecha-movimiento");

  if (fechaMovimiento && !fechaMovimiento.value) {
    fechaMovimiento.value = hoy();
  }

  if (fechaAhorro && !fechaAhorro.value) {
    fechaAhorro.value = hoy();
  }

  aplicarIdioma();
  guardarTodo();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
  iniciarAplicacion();
}
