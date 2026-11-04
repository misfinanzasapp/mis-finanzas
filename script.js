"use strict";

/* =========================================================
   MIS FINANZAS 2.0
   Idiomas: Español / English
   Moneda principal inicial: CRC
   Tipos de cambio: automático + manual
   ========================================================= */

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

const TEXTOS = {
  es: {
    app_title: "Mis Finanzas",
    app_subtitle: "Controla tu dinero, construye tu futuro",
    home_title: "Resumen financiero",
    home_subtitle: "Tu situación financiera",
    total_income: "Ingresos",
    total_expenses: "Gastos",
    total_balance: "Balance",
    total_savings: "Ahorros",
    financial_overview: "Panorama financiero",
    recent_movements: "Movimientos recientes",
    view_all: "Ver todos",
    no_movements: "Todavía no tienes movimientos registrados.",
    daily_tip: "Consejo financiero",
    more_tips: "Más consejos",
    movements_title: "Movimientos",
    movements_subtitle: "Registra tus ingresos y gastos",
    new_movement: "Nuevo movimiento",
    movement_type: "Tipo",
    income: "Ingreso",
    expense: "Gasto",
    description: "Descripción",
    amount: "Monto",
    currency: "Moneda",
    category: "Categoría",
    date: "Fecha",
    save_movement: "Guardar movimiento",
    movement_history: "Historial de movimientos",
    savings_title: "Ahorros",
    savings_subtitle: "Construye tus metas financieras",
    saved_total: "Total ahorrado",
    create_goal: "Crear meta de ahorro",
    goal_name: "Nombre de la meta",
    goal_amount: "Monto objetivo",
    target_date: "Fecha objetivo",
    save_goal: "Crear meta",
    my_goals: "Mis metas",
    no_goals: "Todavía no tienes metas de ahorro.",
    register_saving: "Registrar ahorro o retiro",
    select_goal: "Meta",
    operation_type: "Operación",
    deposit: "Depósito",
    withdrawal: "Retiro",
    save_operation: "Guardar operación",
    savings_history: "Historial de ahorros",
    budget_title: "Presupuestos",
    budget_subtitle: "Planifica cuánto puedes gastar",
    create_budget: "Crear presupuesto",
    budget_amount: "Monto del presupuesto",
    save_budget: "Guardar presupuesto",
    my_budgets: "Mis presupuestos",
    recurring_title: "Gastos recurrentes",
    recurring_subtitle: "Controla tus pagos habituales",
    add_recurring: "Agregar gasto recurrente",
    frequency: "Frecuencia",
    weekly: "Semanal",
    biweekly: "Quincenal",
    monthly: "Mensual",
    yearly: "Anual",
    payment_day: "Día de pago",
    save_recurring: "Guardar gasto recurrente",
    my_recurring: "Mis gastos recurrentes",
    statistics_title: "Estadísticas",
    statistics_subtitle: "Comprende tus hábitos financieros",
    expenses_by_category: "Gastos por categoría",
    income_vs_expenses: "Ingresos frente a gastos",
    financial_summary: "Resumen financiero",
    tips_title: "Consejos financieros",
    tips_subtitle: "Pequeños hábitos para mejorar tus finanzas",
    saving_tips: "Consejos para ahorrar",
    budget_tips: "Consejos para presupuestar",
    debt_tips: "Consejos para manejar deudas",
    emergency_fund: "Fondo de emergencia",
    settings_title: "Configuración",
    settings_subtitle: "Personaliza tu aplicación",
    language_settings: "Idioma",
    app_language: "Idioma de la aplicación",
    currency_settings: "Moneda principal",
    main_currency: "Selecciona tu moneda principal",
    save_currency: "Guardar moneda",
    exchange_rates: "Tipos de cambio",
    exchange_description: "Actualiza las tasas automáticamente o introduce tus propios valores.",
    rate_status: "Estado de actualización:",
    last_update: "Última actualización:",
    update_rates: "Actualizar automáticamente",
    manual_rates: "Tipos de cambio manuales",
    manual_rates_help: "Indica cuántas unidades de tu moneda principal equivale una unidad de cada moneda.",
    save_rates: "Guardar tipos de cambio",
    data_management: "Gestión de datos",
    backup_description: "Puedes exportar tus datos para conservar una copia o importarlos posteriormente.",
    export_data: "Exportar datos",
    import_data: "Importar datos",
    import_button: "Importar copia",
    app_version: "Versión",
    app_footer: "Mis Finanzas · Tu dinero bajo control",
    nav_home: "Inicio",
    nav_movements: "Movimientos",
    nav_savings: "Ahorros",
    nav_budget: "Presupuesto",
    nav_more: "Más",
    cat_salary: "Salario",
    cat_business: "Negocio",
    cat_food: "Alimentación",
    cat_transport: "Transporte",
    cat_housing: "Vivienda",
    cat_services: "Servicios",
    cat_health: "Salud",
    cat_education: "Educación",
    cat_entertainment: "Entretenimiento",
    cat_debts: "Deudas",
    cat_other: "Otros",
    delete: "Eliminar",
    edit: "Editar",
    confirm_delete: "¿Deseas eliminar este registro?",
    saved: "Guardado correctamente.",
    deleted: "Registro eliminado.",
    invalid_amount: "Introduce un monto válido.",
    no_goal_selected: "Primero crea una meta de ahorro.",
    goal_progress: "Progreso",
    remaining: "Restante",
    spent: "Gastado",
    available: "Disponible",
    exceeded: "Presupuesto excedido",
    within_budget: "Dentro del presupuesto",
    no_budget: "No hay presupuestos registrados.",
    no_recurring: "No hay gastos recurrentes registrados.",
    no_savings: "Todavía no hay operaciones de ahorro.",
    no_statistics: "Registra movimientos para ver tus estadísticas.",
    rate_success: "Tipos de cambio actualizados.",
    rate_error: "No fue posible actualizar las tasas. Puedes utilizar las tasas manuales.",
    rate_saved: "Tipos de cambio guardados.",
    currency_saved: "Moneda principal actualizada.",
    language_saved: "Idioma actualizado.",
    export_success: "Archivo de respaldo preparado.",
    import_success: "Datos importados correctamente.",
    import_error: "No se pudo importar el archivo. Verifica que sea un respaldo válido.",
    automatic: "Automático",
    manual: "Manual",
    pending: "Pendiente",
    conversion_note: "Los totales se muestran en tu moneda principal.",
    total: "Total",
    goal_completed: "Meta completada",
    savings_deposit: "Depósito",
    savings_withdrawal: "Retiro",
    tips: [
      "Aparta una cantidad de dinero cada vez que recibas ingresos.",
      "Registra incluso los gastos pequeños: al final del mes pueden sumar bastante.",
      "Compara precios antes de realizar compras importantes.",
      "Establece una meta de ahorro concreta y una fecha para alcanzarla.",
      "Evita comprar por impulso. Espera 24 horas antes de una compra no necesaria."
    ],
    saving_advice: [
      "Intenta ahorrar entre el 5% y el 10% de tus ingresos, si tu situación lo permite.",
      "Automatiza una transferencia a tu cuenta de ahorro.",
      "Separa el dinero de tus gastos diarios del dinero destinado a tus metas.",
      "Ahorra primero y gasta después, en lugar de esperar a ver qué sobra.",
      "Revisa tus suscripciones y elimina las que no utilizas."
    ],
    budget_advice: [
      "Asigna un límite mensual a cada categoría de gasto.",
      "Revisa tu presupuesto al menos una vez por semana.",
      "Prioriza vivienda, alimentación, transporte y servicios esenciales.",
      "No confundas el dinero disponible en tu cuenta con dinero libre para gastar."
    ],
    debt_advice: [
      "Haz una lista de todas tus deudas, tasas de interés y pagos mínimos.",
      "Evita utilizar tarjetas de crédito para gastos que no puedes pagar.",
      "Prioriza las deudas con intereses más altos, sin descuidar los pagos mínimos.",
      "Consulta las condiciones antes de aceptar una refinanciación."
    ],
    emergency_advice: [
      "Construye un fondo de emergencia poco a poco.",
      "Una meta inicial puede ser ahorrar el equivalente a un mes de gastos esenciales.",
      "A largo plazo, intenta alcanzar entre tres y seis meses de gastos esenciales.",
      "Mantén este dinero separado y disponible para imprevistos reales."
    ],
    rate_explanation: "Las tasas representan cuántas unidades de tu moneda principal recibes por una unidad de moneda extranjera.",
    confirm_currency: "Al cambiar la moneda principal, actualiza las tasas de cambio antes de realizar nuevas conversiones.",
    empty: "Sin registros",
    month: "Mes",
    no_data: "Sin datos disponibles",
    saving_goal: "Meta de ahorro",
    category_summary: "Resumen por categoría",
    recurring_day: "Día",
    frequency_label: "Frecuencia",
    date_label: "Fecha",
    currency_label: "Moneda"
  },

  en: {
    app_title: "My Finances",
    app_subtitle: "Manage your money, build your future",
    home_title: "Financial overview",
    home_subtitle: "Your financial situation",
    total_income: "Income",
    total_expenses: "Expenses",
    total_balance: "Balance",
    total_savings: "Savings",
    financial_overview: "Financial overview",
    recent_movements: "Recent transactions",
    view_all: "View all",
    no_movements: "You have no transactions yet.",
    daily_tip: "Financial tip",
    more_tips: "More tips",
    movements_title: "Transactions",
    movements_subtitle: "Track your income and expenses",
    new_movement: "New transaction",
    movement_type: "Type",
    income: "Income",
    expense: "Expense",
    description: "Description",
    amount: "Amount",
    currency: "Currency",
    category: "Category",
    date: "Date",
    save_movement: "Save transaction",
    movement_history: "Transaction history",
    savings_title: "Savings",
    savings_subtitle: "Build your financial goals",
    saved_total: "Total saved",
    create_goal: "Create savings goal",
    goal_name: "Goal name",
    goal_amount: "Target amount",
    target_date: "Target date",
    save_goal: "Create goal",
    my_goals: "My goals",
    no_goals: "You have no savings goals yet.",
    register_saving: "Record a deposit or withdrawal",
    select_goal: "Goal",
    operation_type: "Operation",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    save_operation: "Save operation",
    savings_history: "Savings history",
    budget_title: "Budgets",
    budget_subtitle: "Plan how much you can spend",
    create_budget: "Create budget",
    budget_amount: "Budget amount",
    save_budget: "Save budget",
    my_budgets: "My budgets",
    recurring_title: "Recurring expenses",
    recurring_subtitle: "Track your regular payments",
    add_recurring: "Add recurring expense",
    frequency: "Frequency",
    weekly: "Weekly",
    biweekly: "Biweekly",
    monthly: "Monthly",
    yearly: "Yearly",
    payment_day: "Payment day",
    save_recurring: "Save recurring expense",
    my_recurring: "My recurring expenses",
    statistics_title: "Statistics",
    statistics_subtitle: "Understand your financial habits",
    expenses_by_category: "Expenses by category",
    income_vs_expenses: "Income vs. expenses",
    financial_summary: "Financial summary",
    tips_title: "Financial tips",
    tips_subtitle: "Small habits to improve your finances",
    saving_tips: "Saving tips",
    budget_tips: "Budgeting tips",
    debt_tips: "Debt management tips",
    emergency_fund: "Emergency fund",
    settings_title: "Settings",
    settings_subtitle: "Customize your application",
    language_settings: "Language",
    app_language: "Application language",
    currency_settings: "Main currency",
    main_currency: "Choose your main currency",
    save_currency: "Save currency",
    exchange_rates: "Exchange rates",
    exchange_description: "Update rates automatically or enter your own values.",
    rate_status: "Update status:",
    last_update: "Last update:",
    update_rates: "Update automatically",
    manual_rates: "Manual exchange rates",
    manual_rates_help: "Enter how many units of your main currency equal one unit of each currency.",
    save_rates: "Save exchange rates",
    data_management: "Data management",
    backup_description: "Export your data to keep a backup or import it later.",
    export_data: "Export data",
    import_data: "Import data",
    import_button: "Import backup",
    app_version: "Version",
    app_footer: "My Finances · Your money under control",
    nav_home: "Home",
    nav_movements: "Activity",
    nav_savings: "Savings",
    nav_budget: "Budget",
    nav_more: "More",
    cat_salary: "Salary",
    cat_business: "Business",
    cat_food: "Food",
    cat_transport: "Transportation",
    cat_housing: "Housing",
    cat_services: "Utilities",
    cat_health: "Healthcare",
    cat_education: "Education",
    cat_entertainment: "Entertainment",
    cat_debts: "Debt",
    cat_other: "Other",
    delete: "Delete",
    edit: "Edit",
    confirm_delete: "Do you want to delete this record?",
    saved: "Saved successfully.",
    deleted: "Record deleted.",
    invalid_amount: "Enter a valid amount.",
    no_goal_selected: "Create a savings goal first.",
    goal_progress: "Progress",
    remaining: "Remaining",
    spent: "Spent",
    available: "Available",
    exceeded: "Budget exceeded",
    within_budget: "Within budget",
    no_budget: "No budgets recorded.",
    no_recurring: "No recurring expenses recorded.",
    no_savings: "No savings operations yet.",
    no_statistics: "Record transactions to see your statistics.",
    rate_success: "Exchange rates updated.",
    rate_error: "Unable to update rates. You can use manual rates.",
    rate_saved: "Exchange rates saved.",
    currency_saved: "Main currency updated.",
    language_saved: "Language updated.",
    export_success: "Backup file prepared.",
    import_success: "Data imported successfully.",
    import_error: "Unable to import the file. Check that it is a valid backup.",
    automatic: "Automatic",
    manual: "Manual",
    pending: "Pending",
    conversion_note: "Totals are displayed in your main currency.",
    total: "Total",
    goal_completed: "Goal completed",
    savings_deposit: "Deposit",
    savings_withdrawal: "Withdrawal",
    tips: [
      "Set aside some money every time you receive income.",
      "Track even small expenses: they can add up by the end of the month.",
      "Compare prices before making important purchases.",
      "Set a specific savings goal and a target date.",
      "Avoid impulse purchases. Wait 24 hours before buying something unnecessary."
    ],
    saving_advice: [
      "Try to save between 5% and 10% of your income, if your situation allows it.",
      "Automate a transfer to your savings account.",
      "Keep your daily spending money separate from your savings goals.",
      "Save first and spend afterward instead of waiting to see what is left.",
      "Review your subscriptions and cancel the ones you do not use."
    ],
    budget_advice: [
      "Set a monthly spending limit for each category.",
      "Review your budget at least once a week.",
      "Prioritize housing, food, transportation and essential utilities.",
      "Do not confuse your account balance with money available to spend."
    ],
    debt_advice: [
      "List all your debts, interest rates and minimum payments.",
      "Avoid using credit cards for purchases you cannot afford to repay.",
      "Prioritize higher-interest debts while keeping up with minimum payments.",
      "Review the terms before accepting debt refinancing."
    ],
    emergency_advice: [
      "Build an emergency fund gradually.",
      "An initial goal could be saving one month of essential expenses.",
      "Over time, aim for three to six months of essential expenses.",
      "Keep this money separate and available for genuine emergencies."
    ],
    rate_explanation: "Rates show how many units of your main currency equal one unit of foreign currency.",
    confirm_currency: "After changing your main currency, update exchange rates before making new conversions.",
    empty: "No records",
    month: "Month",
    no_data: "No data available",
    saving_goal: "Savings goal",
    category_summary: "Category summary",
    recurring_day: "Day",
    frequency_label: "Frequency",
    date_label: "Date",
    currency_label: "Currency"
  }
};

/* =========================================================
   DATOS Y CONFIGURACIÓN
   ========================================================= */

function cargarArray(clave) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave) || "[]");
    return Array.isArray(valor) ? valor : [];
  } catch (e) {
    return [];
  }
}

function cargarObjeto(clave, defecto = {}) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave) || "null");
    return valor && typeof valor === "object" && !Array.isArray(valor)
      ? valor
      : defecto;
  } catch (e) {
    return defecto;
  }
}

let movimientos = cargarArray(CLAVES.movimientos);
let metas = cargarArray(CLAVES.metas);
let operacionesAhorro = cargarArray(CLAVES.operaciones);
let presupuestos = cargarArray(CLAVES.presupuestos);
let recurrentes = cargarArray(CLAVES.recurrentes);

let configuracion = {
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
  modoTasas: "both",
  ...cargarObjeto(CLAVES.configuracion)
};

if (!TEXTOS[configuracion.idioma]) {
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
  return TEXTOS[configuracion.idioma][clave] ??
    TEXTOS.es[clave] ??
    clave;
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fechaHoy() {
  const ahora = new Date();
  const local = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function mesActual() {
  return fechaHoy().slice(0, 7);
}

function numero(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : 0;
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
   MONEDAS Y CONVERSIONES
   ========================================================= */

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
  } catch (e) {
    return moneda + " " + numero(valor).toFixed(2);
  }
}

function obtenerTasa(moneda) {
  if (moneda === configuracion.monedaPrincipal) return 1;

  const automaticas = configuracion.tasasAutomaticas || {};
  const manuales = configuracion.tasasManuales || {};

  if (configuracion.modoTasas !== "manual") {
    const tasa = numero(automaticas[moneda]);
    if (tasa > 0) return tasa;
  }

  const manual = numero(manuales[moneda]);
  return manual > 0 ? manual : 0;
}

function convertirAMonedaPrincipal(monto, moneda) {
  monto = numero(monto);
  moneda = moneda || configuracion.monedaPrincipal;

  if (moneda === configuracion.monedaPrincipal) return monto;

  const tasa = obtenerTasa(moneda);
  if (!tasa) return monto;

  return monto * tasa;
}

function convertirEntreMonedas(monto, origen, destino) {
  const enPrincipal = convertirAMonedaPrincipal(monto, origen);
  const tasaDestino = obtenerTasa(destino);

  if (!tasaDestino) return enPrincipal;
  return enPrincipal / tasaDestino;
}

function opcionesMonedas(seleccionada = configuracion.monedaPrincipal) {
  return Object.keys(MONEDAS).map(codigo =>
    `<option value="${codigo}" ${codigo === seleccionada ? "selected" : ""}>
      ${codigo} - ${escapar(
        configuracion.idioma === "en"
          ? ({
              CRC: "Costa Rican Colon",
              USD: "US Dollar",
              EUR: "Euro",
              MXN: "Mexican Peso",
              GBP: "British Pound",
              BRL: "Brazilian Real",
              COP: "Colombian Peso",
              CAD: "Canadian Dollar"
            })[codigo]
          : MONEDAS[codigo]
      )}
    </option>`
  ).join("");
}

function llenarSelectoresMonedas() {
  [
    "mov-moneda",
    "ahorro-moneda",
    "ahorro-moneda-movimiento",
    "presupuesto-moneda",
    "recurrente-moneda"
  ].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    const anterior = select.value || configuracion.monedaPrincipal;
    select.innerHTML = opcionesMonedas(anterior);
    select.value = anterior;
  });

  const principal = document.getElementById("moneda-principal");
  if (principal) principal.value = configuracion.monedaPrincipal;
}

/* =========================================================
   IDIOMA
   ========================================================= */

function aplicarIdioma() {
  document.documentElement.lang = configuracion.idioma;

  document.querySelectorAll("[data-i18n]").forEach(elemento => {
    const clave = elemento.dataset.i18n;
    const traduccion = t(clave);

    if (typeof traduccion === "string") {
      elemento.textContent = traduccion;
    }
  });

  const idioma = document.getElementById("idioma-aplicacion");
  if (idioma) idioma.value = configuracion.idioma;

  const principal = document.getElementById("moneda-principal");
  if (principal) principal.value = configuracion.monedaPrincipal;

  const placeholders = {
    "mov-descripcion": configuracion.idioma === "en"
      ? "E.g. Salary, food"
      : "Ej. Salario, alimentación",
    "ahorro-nombre": configuracion.idioma === "en"
      ? "E.g. Emergency fund"
      : "Ej. Fondo de emergencia",
    "recurrente-descripcion": configuracion.idioma === "en"
      ? "E.g. Rent, internet, loan"
      : "Ej. Alquiler, internet, préstamo"
  };

  Object.entries(placeholders).forEach(([id, texto]) => {
    const campo = document.getElementById(id);
    if (campo) campo.placeholder = texto;
  });

  llenarSelectoresMonedas();
  renderizarTodo();
  actualizarMenuMas();
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function mostrarSeccion(id) {
  const seccion = document.getElementById(id);
  if (!seccion || !seccion.classList.contains("page-section")) return;

  document.querySelectorAll(".page-section").forEach(elemento => {
    elemento.classList.remove("active");
  });

  seccion.classList.add("active");

  document.querySelectorAll(".nav-button").forEach(boton => {
    boton.classList.toggle("active", boton.dataset.section === id);
  });

  const menu = document.getElementById("menu-mas");
  if (menu) menu.hidden = true;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "estadisticas") renderizarEstadisticas();
}

function actualizarMenuMas() {
  const menu = document.getElementById("menu-mas");
  const boton = document.getElementById("boton-mas");
  if (!menu || !boton) return;

  const seccionesMas = ["recurrentes", "estadisticas", "consejos", "configuracion"];
  const activa = seccionesMas.some(id =>
    document.getElementById(id)?.classList.contains("active")
  );

  boton.classList.toggle("active", activa);
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

  const botonMas = document.getElementById("boton-mas");
  const menu = document.getElementById("menu-mas");

  if (botonMas && menu) {
    botonMas.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      actualizarMenuMas();
    });
  }

  const ajustes = document.getElementById("btn-settings");
  if (ajustes) {
    ajustes.addEventListener("click", () => {
      mostrarSeccion("configuracion");
    });
  }

  document.addEventListener("click", evento => {
    if (!menu || menu.hidden) return;
    if (menu.contains(evento.target)) return;
    if (botonMas && botonMas.contains(evento.target)) return;
    menu.hidden = true;
  });
}

/* =========================================================
   MOVIMIENTOS
   ========================================================= */

function registrarMovimiento(evento) {
  evento.preventDefault();

  const tipo = document.getElementById("mov-tipo").value;
  const descripcion = document.getElementById("mov-descripcion").value.trim();
  const monto = numero(document.getElementById("mov-monto").value);
  const moneda = document.getElementById("mov-moneda").value;
  const categoria = document.getElementById("mov-categoria").value;
  const fecha = document.getElementById("mov-fecha").value;

  if (!descripcion || monto <= 0 || !fecha) {
    alert(t("invalid_amount"));
    return;
  }

  movimientos.unshift({
    id: generarId(),
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

  document.getElementById("mov-fecha").value = fechaHoy();
  llenarSelectoresMonedas();
  renderizarTodo();

  alert(t("saved"));
}

function nombreCategoria(categoria) {
  const claves = {
    salario: "cat_salary",
    negocio: "cat_business",
    alimentacion: "cat_food",
    transporte: "cat_transport",
    vivienda: "cat_housing",
    servicios: "cat_services",
    salud: "cat_health",
    educacion: "cat_education",
    entretenimiento: "cat_entertainment",
    deudas: "cat_debts",
    otros: "cat_other"
  };

  return t(claves[categoria] || "cat_other");
}

function renderizarMovimientos() {
  const contenedor = document.getElementById("lista-movimientos");
  const recientes = document.getElementById("lista-movimientos-recientes");

  const dibujar = (lista, limite = Infinity) => {
    if (!lista.length) {
      return `<p class="empty-message">${t("no_movements")}</p>`;
    }

    return lista.slice(0, limite).map(m => {
      const ingreso = m.tipo === "ingreso";
      const monto = numero(m.monto);
      const descripcion = escapar(m.descripcion);
      const moneda = m.moneda || configuracion.monedaPrincipal;

      return `
        <div class="movement-item">
          <div>
            <strong>${descripcion}</strong>
            <small>${nombreCategoria(m.categoria)} · ${escapar(m.fecha || "")}</small>
            <small>${formatoMoneda(monto, moneda)}</small>
          </div>
          <div>
            <strong class="${ingreso ? "amount-positive" : "amount-negative"}">
              ${ingreso ? "+" : "−"}${formatoMoneda(
                convertirAMonedaPrincipal(monto, moneda)
              )}
            </strong>
            <button class="delete-button" data-delete-movement="${escapar(m.id)}">
              ${t("delete")}
            </button>
          </div>
        </div>`;
    }).join("");
  };

  if (contenedor) contenedor.innerHTML = dibujar(movimientos);
  if (recientes) recientes.innerHTML = dibujar(movimientos, 5);
}

function eliminarMovimiento(id) {
  if (!confirm(t("confirm_delete"))) return;
  movimientos = movimientos.filter(m => String(m.id) !== String(id));
  guardarTodo();
  renderizarTodo();
}

/* =========================================================
   AHORROS Y METAS
   ========================================================= */

function totalMeta(metaId) {
  return operacionesAhorro
    .filter(op => String(op.metaId) === String(metaId))
    .reduce((total, op) => {
      const moneda = op.moneda || configuracion.monedaPrincipal;
      const valor = convertirAMonedaPrincipal(op.monto, moneda);
      return total + (op.tipo === "retiro" ? -valor : valor);
    }, 0);
}

function renderizarAhorros() {
  const listaMetas = document.getElementById("lista-metas");
  const selector = document.getElementById("ahorro-meta-seleccionada");
  const listaOperaciones = document.getElementById("lista-operaciones-ahorro");
  const totalElemento = document.getElementById("total-ahorrado");

  const total = operacionesAhorro.reduce((suma, op) => {
    const valor = convertirAMonedaPrincipal(
      op.monto,
      op.moneda || configuracion.monedaPrincipal
    );
    return suma + (op.tipo === "retiro" ? -valor : valor);
  }, 0);

  if (totalElemento) totalElemento.textContent = formatoMoneda(total);

  if (selector) {
    const anterior = selector.value;
    selector.innerHTML = metas.map(meta =>
      `<option value="${escapar(meta.id)}">${escapar(meta.nombre)}</option>`
    ).join("");

    if (metas.some(m => String(m.id) === anterior)) {
      selector.value = anterior;
    }
  }

  if (listaMetas) {
    if (!metas.length) {
      listaMetas.innerHTML = `<p class="empty-message">${t("no_goals")}</p>`;
    } else {
      listaMetas.innerHTML = metas.map(meta => {
        const moneda = meta.moneda || configuracion.monedaPrincipal;
        const ahorrado = totalMeta(meta.id);
        const objetivoPrincipal = convertirAMonedaPrincipal(meta.objetivo, moneda);
        const porcentaje = objetivoPrincipal > 0
          ? Math.min(100, Math.max(0, ahorrado / objetivoPrincipal * 100))
          : 0;

        const restante = Math.max(0, objetivoPrincipal - ahorrado);

        return `
          <div class="goal-item">
            <div style="width:100%">
              <strong>${escapar(meta.nombre)}</strong>
              <small>${t("goal_progress")}: ${porcentaje.toFixed(1)}%</small>
              <div class="progress-bar">
                <div class="progress-bar-fill" style="width:${porcentaje}%"></div>
              </div>
              <small>${t("total")}: ${formatoMoneda(ahorrado)}</small>
              <small>${t("remaining")}: ${formatoMoneda(restante)}</small>
              <small>${t("goal_amount")}: ${formatoMoneda(meta.objetivo, moneda)}</small>
              ${meta.fecha ? `<small>${t("target_date")}: ${escapar(meta.fecha)}</small>` : ""}
              ${porcentaje >= 100 ? `<small class="amount-positive">${t("goal_completed")}</small>` : ""}
            </div>
            <button class="delete-button" data-delete-goal="${escapar(meta.id)}">
              ${t("delete")}
            </button>
          </div>`;
      }).join("");
    }
  }

  if (listaOperaciones) {
    if (!operacionesAhorro.length) {
      listaOperaciones.innerHTML = `<p class="empty-message">${t("no_savings")}</p>`;
    } else {
      listaOperaciones.innerHTML = operacionesAhorro.map(op => {
        const meta = metas.find(m => String(m.id) === String(op.metaId));
        const retiro = op.tipo === "retiro";

        return `
          <div class="saving-item">
            <div>
              <strong>${escapar(meta?.nombre || t("saving_goal"))}</strong>
              <small>${retiro ? t("savings_withdrawal") : t("savings_deposit")} · ${escapar(op.fecha || "")}</small>
            </div>
            <strong class="${retiro ? "amount-negative" : "amount-positive"}">
              ${retiro ? "−" : "+"}${formatoMoneda(op.monto, op.moneda || configuracion.monedaPrincipal)}
            </strong>
            <button class="delete-button" data-delete-saving="${escapar(op.id)}">
              ${t("delete")}
            </button>
          </div>`;
      }).join("");
    }
  }
}

function crearMeta(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("ahorro-nombre").value.trim();
  const objetivo = numero(document.getElementById("ahorro-objetivo").value);
  const moneda = document.getElementById("ahorro-moneda").value;
  const fecha = document.getElementById("ahorro-fecha-meta").value;

  if (!nombre || objetivo <= 0) {
    alert(t("invalid_amount"));
    return;
  }

  metas.unshift({
    id: generarId(),
    nombre,
    objetivo,
    moneda,
    fecha,
    creado: new Date().toISOString()
  });

  guardarTodo();
  evento.target.reset();
  renderizarTodo();
  alert(t("saved"));
}

function registrarAhorro(evento) {
  evento.preventDefault();

  if (!metas.length) {
    alert(t("no_goal_selected"));
    return;
  }

  const metaId = document.getElementById("ahorro-meta-seleccionada").value;
  const tipo = document.getElementById("ahorro-tipo").value;
  const monto = numero(document.getElementById("ahorro-monto").value);
  const moneda = document.getElementById("ahorro-moneda-movimiento").value;
  const fecha = document.getElementById("ahorro-fecha-movimiento").value;

  if (!metaId || monto <= 0 || !fecha) {
    alert(t("invalid_amount"));
    return;
  }

  operacionesAhorro.unshift({
    id: generarId(),
    metaId,
    tipo,
    monto,
    moneda,
    fecha
  });

  guardarTodo();
  evento.target.reset();
  document.getElementById("ahorro-fecha-movimiento").value = fechaHoy();
  renderizarTodo();
  alert(t("saved"));
}

function eliminarMeta(id) {
  if (!confirm(t("confirm_delete"))) return;

  metas = metas.filter(m => String(m.id) !== String(id));
  operacionesAhorro = operacionesAhorro.filter(
    op => String(op.metaId) !== String(id)
  );

  guardarTodo();
  renderizarTodo();
}

function eliminarOperacionAhorro(id) {
  if (!confirm(t("confirm_delete"))) return;
  operacionesAhorro = operacionesAhorro.filter(op => String(op.id) !== String(id));
  guardarTodo();
  renderizarTodo();
}

/* =========================================================
   PRESUPUESTOS
   ========================================================= */

function renderizarPresupuestos() {
  const contenedor = document.getElementById("lista-presupuestos");
  if (!contenedor) return;

  if (!presupuestos.length) {
    contenedor.innerHTML = `<p class="empty-message">${t("no_budget")}</p>`;
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
      .reduce((suma, m) =>
        suma + convertirAMonedaPrincipal(
          m.monto,
          m.moneda || configuracion.monedaPrincipal
        ), 0);

    const porcentaje = limite > 0 ? gastado / limite * 100 : 0;
    const restante = limite - gastado;

    return `
      <div class="budget-item">
        <div style="width:100%">
          <strong>${nombreCategoria(p.categoria)}</strong>
          <small>${t("spent")}: ${formatoMoneda(gastado)}</small>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${Math.min(100, porcentaje)}%;background:${porcentaje > 100 ? "#dc2626" : "#2563eb"}"></div>
          </div>
          <small>${t("budget_amount")}: ${formatoMoneda(p.monto, moneda)}</small>
          <small class="${restante < 0 ? "amount-negative" : "amount-positive"}">
            ${restante < 0 ? t("exceeded") : t("available")}: ${formatoMoneda(Math.abs(restante))}
          </small>
        </div>
        <button class="delete-button" data-delete-budget="${escapar(p.id)}">
          ${t("delete")}
        </button>
      </div>`;
  }).join("");
}

function crearPresupuesto(evento) {
  evento.preventDefault();

  const categoria = document.getElementById("presupuesto-categoria").value;
  const monto = numero(document.getElementById("presupuesto-monto").value);
  const moneda = document.getElementById("presupuesto-moneda").value;

  if (monto <= 0) {
    alert(t("invalid_amount"));
    return;
  }

  presupuestos.push({
    id: generarId(),
    categoria,
    monto,
    moneda,
    creado: new Date().toISOString()
  });

  guardarTodo();
  evento.target.reset();
  llenarSelectoresMonedas();
  renderizarTodo();
  alert(t("saved"));
}

function eliminarPresupuesto(id) {
  if (!confirm(t("confirm_delete"))) return;
  presupuestos = presupuestos.filter(p => String(p.id) !== String(id));
  guardarTodo();
  renderizarTodo();
}

/* =========================================================
   GASTOS RECURRENTES
   ========================================================= */

function renderizarRecurrentes() {
  const contenedor = document.getElementById("lista-recurrentes");
  if (!contenedor) return;

  if (!recurrentes.length) {
    contenedor.innerHTML = `<p class="empty-message">${t("no_recurring")}</p>`;
    return;
  }

  const frecuencias = {
    semanal: "weekly",
    quincenal: "biweekly",
    mensual: "monthly",
    anual: "yearly"
  };

  contenedor.innerHTML = recurrentes.map(r => `
    <div class="recurring-item">
      <div>
        <strong>${escapar(r.descripcion)}</strong>
        <small>${nombreCategoria(r.categoria)}</small>
        <small>${t("frequency_label")}: ${t(frecuencias[r.frecuencia] || "monthly")}</small>
        <small>${t("recurring_day")}: ${escapar(r.dia)}</small>
      </div>
      <div>
        <strong>${formatoMoneda(r.monto, r.moneda || configuracion.monedaPrincipal)}</strong>
        <button class="delete-button" data-delete-recurring="${escapar(r.id)}">
          ${t("delete")}
        </button>
      </div>
    </div>
  `).join("");
}

function crearRecurrente(evento) {
  evento.preventDefault();

  const descripcion = document.getElementById("recurrente-descripcion").value.trim();
  const monto = numero(document.getElementById("recurrente-monto").value);
  const moneda = document.getElementById("recurrente-moneda").value;
  const categoria = document.getElementById("recurrente-categoria").value;
  const frecuencia = document.getElementById("recurrente-frecuencia").value;
  const dia = numero(document.getElementById("recurrente-dia").value);

  if (!descripcion || monto <= 0 || dia < 1 || dia > 31) {
    alert(t("invalid_amount"));
    return;
  }

  recurrentes.push({
    id: generarId(),
    descripcion,
    monto,
    moneda,
    categoria,
    frecuencia,
    dia
  });

  guardarTodo();
  evento.target.reset();
  llenarSelectoresMonedas();
  renderizarTodo();
  alert(t("saved"));
}

function eliminarRecurrente(id) {
  if (!confirm(t("confirm_delete"))) return;
  recurrentes = recurrentes.filter(r => String(r.id) !== String(id));
  guardarTodo();
  renderizarTodo();
}

/* =========================================================
   ESTADÍSTICAS Y GRÁFICOS
   ========================================================= */

let graficos = {};

function destruirGrafico(id) {
  if (graficos[id]) {
    graficos[id].destroy();
    delete graficos[id];
  }
}

function crearGrafico(id, configuracionGrafico) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof Chart === "undefined") return;

  destruirGrafico(id);
  graficos[id] = new Chart(canvas, configuracionGrafico);
}

function renderizarEstadisticas() {
  const contenedor = document.getElementById("resumen-estadisticas");

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

  if (contenedor) {
    contenedor.innerHTML = `
      <div class="list-item">
        <strong>${t("total_income")}</strong>
        <strong class="amount-positive">${formatoMoneda(ingresos)}</strong>
      </div>
      <div class="list-item">
        <strong>${t("total_expenses")}</strong>
        <strong class="amount-negative">${formatoMoneda(gastos)}</strong>
      </div>
      <div class="list-item">
        <strong>${t("total_balance")}</strong>
        <strong>${formatoMoneda(ingresos - gastos)}</strong>
      </div>`;
  }

  const categorias = {};

  movimientos
    .filter(m => m.tipo === "gasto")
    .forEach(m => {
      const categoria = m.categoria || "otros";
      categorias[categoria] = (categorias[categoria] || 0) +
        convertirAMonedaPrincipal(
          m.monto, m.moneda || configuracion.monedaPrincipal
        );
    });

  const etiquetas = Object.keys(categorias).map(nombreCategoria);
  const valores = Object.values(categorias);

  crearGrafico("grafico-categorias", {
    type: "doughnut",
    data: {
      labels: etiquetas,
      datasets: [{
        data: valores,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });

  const meses = [...new Set(
    movimientos.map(m => String(m.fecha || "").slice(0, 7)).filter(Boolean)
  )].sort().slice(-6);

  const ingresosMes = meses.map(mes =>
    movimientos.filter(m => m.tipo === "ingreso" && String(m.fecha).startsWith(mes))
      .reduce((s, m) => s + convertirAMonedaPrincipal(
        m.monto, m.moneda || configuracion.monedaPrincipal
      ), 0)
  );

  const gastosMes = meses.map(mes =>
    movimientos.filter(m => m.tipo === "gasto" && String(m.fecha).startsWith(mes))
      .reduce((s, m) => s + convertirAMonedaPrincipal(
        m.monto, m.moneda || configuracion.monedaPrincipal
      ), 0)
  );

  crearGrafico("grafico-ingresos-gastos", {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        { label: t("total_income"), data: ingresosMes },
        { label: t("total_expenses"), data: gastosMes }
      ]
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

/* =========================================================
   CONSEJOS FINANCIEROS
   ========================================================= */

function renderizarConsejos() {
  const campos = [
    ["consejos-ahorro", "saving_advice"],
    ["consejos-presupuesto", "budget_advice"],
    ["consejos-deudas", "debt_advice"],
    ["consejos-emergencia", "emergency_advice"]
  ];

  campos.forEach(([id, clave]) => {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    const consejos = t(clave);
    elemento.innerHTML = `<ul>${consejos.map(consejo =>
      `<li>${escapar(consejo)}</li>`
    ).join("")}</ul>`;
  });

  const inicio = document.getElementById("consejo-inicio");
  if (inicio) {
    const consejos = t("tips");
    const dia = Math.floor(Date.now() / 86400000);
    inicio.textContent = consejos[dia % consejos.length];
  }
}

/* =========================================================
   INICIO Y RESUMEN
   ========================================================= */

function renderizarInicio() {
  const filtro = document.getElementById("filtro-mes-inicio");
  const mes = filtro?.value || mesActual();

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

  const ahorros = operacionesAhorro.reduce((s, op) => {
    const valor = convertirAMonedaPrincipal(
      op.monto, op.moneda || configuracion.monedaPrincipal
    );
    return s + (op.tipo === "retiro" ? -valor : valor);
  }, 0);

  const balance = ingresos - gastos;

  const asignaciones = {
    "resumen-ingresos": ingresos,
    "resumen-gastos": gastos,
    "resumen-balance": balance,
    "resumen-ahorros": ahorros
  };

  Object.entries(asignaciones).forEach(([id, valor]) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.textContent = formatoMoneda(valor);
      elemento.classList.remove("positive", "negative");

      if (id === "resumen-balance") {
        elemento.classList.add(valor >= 0 ? "positive" : "negative");
      }
    }
  });

  crearGrafico("grafico-resumen", {
    type: "doughnut",
    data: {
      labels: [t("total_income"), t("total_expenses")],
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

/* =========================================================
   CONFIGURACIÓN Y TIPOS DE CAMBIO
   ========================================================= */

function configurarConfiguracion() {
  const idioma = document.getElementById("idioma-aplicacion");

  if (idioma) {
    idioma.value = configuracion.idioma;

    idioma.addEventListener("change", () => {
      configuracion.idioma = idioma.value === "en" ? "en" : "es";
      guardarTodo();
      aplicarIdioma();
      alert(t("language_saved"));
    });
  }

  const moneda = document.getElementById("moneda-principal");

  if (moneda) {
    moneda.value = configuracion.monedaPrincipal;

    moneda.addEventListener("change", () => {
      configuracion.monedaPrincipal = moneda.value;
      configuracion.tasasAutomaticas = {};
      guardarTodo();
      renderizarTodo();
      renderizarTasas();
      alert(t("confirm_currency"));
    });
  }

  const guardarMoneda = document.getElementById("guardar-moneda");

  if (guardarMoneda) {
    guardarMoneda.addEventListener("click", () => {
      const selector = document.getElementById("moneda-principal");
      if (!selector) return;

      configuracion.monedaPrincipal = selector.value;
      configuracion.tasasAutomaticas = {};
      guardarTodo();
      renderizarTodo();
      renderizarTasas();
      alert(t("currency_saved"));
    });
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

  if (importar) {
    importar.addEventListener("click", importarDatos);
  }
}

function renderizarTasas() {
  const lista = document.getElementById("lista-tipos-cambio");
  const estado = document.getElementById("estado-tipo-automatico");
  const fecha = document.getElementById("fecha-actualizacion-tasas");

  if (!lista) return;

  const monedas = Object.keys(MONEDAS).filter(
    moneda => moneda !== configuracion.monedaPrincipal
  );

  lista.innerHTML = monedas.map(moneda => {
    const valor = configuracion.tasasManuales?.[moneda] ?? "";

    return `
      <div class="list-item">
        <label for="tasa-${moneda}">${moneda}</label>
        <input
          id="tasa-${moneda}"
          type="number"
          min="0.000001"
          step="any"
          value="${escapar(valor)}"
          placeholder="0.00">
      </div>`;
  }).join("");

  if (estado) {
    estado.textContent = configuracion.fechaTasas
      ? t("automatic")
      : t("pending");
  }

  if (fecha) {
    fecha.textContent = configuracion.fechaTasas
      ? new Date(configuracion.fechaTasas).toLocaleString(
          configuracion.idioma === "en" ? "en-US" : "es-CR"
        )
      : "—";
  }
}

function guardarTasasManuales() {
  const monedas = Object.keys(MONEDAS).filter(
    moneda => moneda !== configuracion.monedaPrincipal
  );

  monedas.forEach(moneda => {
    const campo = document.getElementById("tasa-" + moneda);
    if (!campo) return;

    const valor = numero(campo.value);
    if (valor > 0) {
      configuracion.tasasManuales[moneda] = valor;
    }
  });

  guardarTodo();
  renderizarTodo();
  alert(t("rate_saved"));
}

async function actualizarTasasAutomaticas() {
  const boton = document.getElementById("actualizar-tasas");
  const estado = document.getElementById("estado-tipo-automatico");

  if (boton) boton.disabled = true;
  if (estado) estado.textContent = "...";

  try {
    const base = configuracion.monedaPrincipal;
    const respuesta = await fetch(
      `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`
    );

    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);

    const datos = await respuesta.json();

    if (datos.result !== "success" || !datos.rates) {
      throw new Error("Invalid exchange rate response");
    }

    const nuevasTasas = {};

    Object.keys(MONEDAS).forEach(moneda => {
      if (moneda === base) {
        nuevasTasas[moneda] = 1;
      } else {
        const unidades = numero(datos.rates[moneda]);
        if (unidades > 0) {
          nuevasTasas[moneda] = 1 / unidades;
        }
      }
    });

    configuracion.tasasAutomaticas = nuevasTasas;
    configuracion.fechaTasas = new Date().toISOString();
    configuracion.modoTasas = "both";

    guardarTodo();
    renderizarTodo();
    alert(t("rate_success"));

  } catch (error) {
    console.error("Error de tasas:", error);
    if (estado) estado.textContent = t("manual");
    alert(t("rate_error"));

  } finally {
    if (boton) boton.disabled = false;
  }
}

/* =========================================================
   EXPORTAR E IMPORTAR
   ========================================================= */

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
  enlace.download = "mis-finanzas-respaldo-" + fechaHoy() + ".json";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();

  URL.revokeObjectURL(url);
  alert(t("export_success"));
}

function importarDatos() {
  const archivo = document.getElementById("archivo-importar")?.files?.[0];

  if (!archivo) {
    alert(t("import_error"));
    return;
  }

  const lector = new FileReader();

  lector.onload = () => {
    try {
      const datos = JSON.parse(lector.result);

      if (!Array.isArray(datos.movimientos) || !Array.isArray(datos.metas)) {
        throw new Error("Invalid backup");
      }

      movimientos = datos.movimientos;
      metas = datos.metas;
      operacionesAhorro = Array.isArray(datos.operacionesAhorro)
        ? datos.operacionesAhorro
        : [];
      presupuestos = Array.isArray(datos.presupuestos)
        ? datos.presupuestos
        : [];
      recurrentes = Array.isArray(datos.recurrentes)
        ? datos.recurrentes
        : [];

      if (datos.configuracion && typeof datos.configuracion === "object") {
        configuracion = {
          ...configuracion,
          ...datos.configuracion
        };
      }

      guardarTodo();
      aplicarIdioma();
      renderizarTodo();
      alert(t("import_success"));

    } catch (error) {
      console.error(error);
      alert(t("import_error"));
    }
  };

  lector.onerror = () => alert(t("import_error"));
  lector.readAsText(archivo);
}

/* =========================================================
   FORMULARIOS Y EVENTOS
   ========================================================= */

function conectarFormulario(id, funcion) {
  const formulario = document.getElementById(id);
  if (formulario) {
    formulario.addEventListener("submit", funcion);
  }
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

    if (boton.dataset.deleteSaving) {
      eliminarOperacionAhorro(boton.dataset.deleteSaving);
    }

    if (boton.dataset.deleteBudget) {
      eliminarPresupuesto(boton.dataset.deleteBudget);
    }

    if (boton.dataset.deleteRecurring) {
      eliminarRecurrente(boton.dataset.deleteRecurring);
    }
  });

  const filtro = document.getElementById("filtro-mes-inicio");

  if (filtro) {
    filtro.value = mesActual();
    filtro.addEventListener("change", renderizarInicio);
  }
}

/* =========================================================
   RENDERIZADO GENERAL
   ========================================================= */

function renderizarTodo() {
  llenarSelectoresMonedas();
  renderizarInicio();
  renderizarMovimientos();
  renderizarAhorros();
  renderizarPresupuestos();
  renderizarRecurrentes();
  renderizarConsejos();
  renderizarTasas();
  actualizarMenuMas();

  const activo = document.querySelector(".page-section.active");

  if (activo?.id === "estadisticas") {
    renderizarEstadisticas();
  }
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function iniciarAplicacion() {
  configurarNavegacion();
  configurarFormularios();
  configurarConfiguracion();

  const fechaMovimiento = document.getElementById("mov-fecha");
  const fechaAhorro = document.getElementById("ahorro-fecha-movimiento");

  if (fechaMovimiento && !fechaMovimiento.value) {
    fechaMovimiento.value = fechaHoy();
  }

  if (fechaAhorro && !fechaAhorro.value) {
    fechaAhorro.value = fechaHoy();
  }

  aplicarIdioma();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .catch(error => console.warn("Service Worker:", error));
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
  iniciarAplicacion();
     }
