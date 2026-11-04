
"use strict";

/* =========================================================
   MIS FINANZAS 2.1
   Moneda principal inicial: CRC
   Idiomas: Español e Inglés
   Tipos de cambio: Automáticos y manuales
   ========================================================= */

const CLAVE = {
  movimientos: "mf_movimientos_v2",
  metas: "mf_metas_v2",
  operaciones: "mf_operaciones_ahorro_v2",
  presupuestos: "mf_presupuestos_v2",
  recurrentes: "mf_recurrentes_v2",
  configuracion: "mf_configuracion_v2"
};

const MONEDAS = ["CRC", "USD", "EUR", "MXN", "GBP", "BRL", "COP", "CAD"];

const SIMBOLOS = {
  CRC: "₡",
  USD: "$",
  EUR: "€",
  MXN: "$",
  GBP: "£",
  BRL: "R$",
  COP: "$",
  CAD: "CA$"
};

const IDIOMAS = {
  es: {
    headerEyebrow: "TU CONTROL FINANCIERO",
    welcomeSubtitle: "Resumen de tus finanzas",
    hello: "¡Hola! 👋",
    availableBalance: "Balance disponible",
    income: "Ingresos",
    expenses: "Gastos",
    monthSummary: "Resumen del mes",
    savings: "Ahorros",
    available: "Disponible",
    recentMovements: "Movimientos recientes",
    seeAll: "Ver todos",
    noMovements: "Todavía no tienes movimientos.",
    quickActions: "Acciones rápidas",
    save: "Ahorrar",
    entriesAndExits: "ENTRADAS Y SALIDAS",
    movements: "Movimientos",
    recordMoney: "Registra y consulta tu dinero.",
    newMovement: "Nuevo movimiento",
    movementType: "Tipo de movimiento",
    description: "Descripción",
    amount: "Monto",
    movementCurrency: "Moneda del movimiento",
    category: "Categoría",
    date: "Fecha",
    saveMovement: "Guardar movimiento",
    history: "Historial",
    all: "Todos",
    incomes: "Ingresos",
    allCurrencies: "Todas las monedas",
    movementsWillAppear: "Aquí aparecerán tus movimientos.",
    buildFuture: "CONSTRUYE TU FUTURO",
    mySavings: "Mis ahorros 🐷",
    savingsSubtitle: "Define objetivos y observa tu progreso.",
    totalSavings: "Total acumulado en ahorros",
    convertedMainCurrency: "Total convertido a tu moneda principal.",
    createSavingsGoal: "Crear una meta de ahorro",
    goalName: "Nombre de la meta",
    targetAmount: "Monto que deseas ahorrar",
    goalCurrency: "Moneda de la meta",
    targetDate: "Fecha objetivo (opcional)",
    createGoal: "Crear meta",
    recordSavings: "Registrar ahorro o retiro",
    savingsGoal: "Meta de ahorro",
    selectGoal: "Selecciona una meta",
    operation: "Operación",
    addMoney: "Agregar dinero",
    withdrawMoney: "Retirar dinero",
    saveOperation: "Guardar operación",
    myGoals: "Mis metas",
    noGoals: "Todavía no has creado metas.",
    planExpenses: "PLANIFICA TUS GASTOS",
    budgets: "Presupuestos",
    budgetsSubtitle: "Establece límites para cuidar tu dinero.",
    createBudget: "Crear presupuesto",
    monthlyLimit: "Límite mensual",
    currency: "Moneda",
    saveBudget: "Guardar presupuesto",
    noBudgets: "Todavía no has creado presupuestos.",
    scheduledPayments: "PAGOS PROGRAMADOS",
    recurringExpenses: "Gastos recurrentes",
    recurringSubtitle: "Organiza tus pagos habituales.",
    addRecurring: "Agregar gasto recurrente",
    frequency: "Frecuencia",
    weekly: "Semanal",
    biweekly: "Quincenal",
    monthly: "Mensual",
    yearly: "Anual",
    paymentDay: "Día de pago",
    saveRecurring: "Guardar gasto recurrente",
    noRecurring: "No tienes gastos recurrentes registrados.",
    knowNumbers: "CONOCE TUS NÚMEROS",
    statistics: "Estadísticas",
    statisticsSubtitle: "Analiza cómo utilizas tu dinero.",
    monthToView: "Mes para consultar",
    balance: "Balance",
    expenseDistribution: "Distribución de gastos",
    registerExpenses: "Registra gastos para ver tus estadísticas.",
    incomeVsExpenses: "Ingresos y gastos",
    financialDistribution: "Distribución de tus finanzas",
    learnToManage: "APRENDE A ADMINISTRARTE",
    financialTips: "Consejos financieros 💡",
    tipsSubtitle: "Pequeños cambios pueden mejorar tus finanzas.",
    tip1Title: "Empieza a ahorrar, aunque sea poco",
    tip1Text: "No necesitas grandes cantidades. Ahorrar ₡1.000 regularmente es mejor que esperar a tener mucho dinero para comenzar.",
    tip2Title: "Construye un fondo de emergencia",
    tip2Text: "Intenta reunir primero el equivalente a un mes de gastos básicos. Después puedes avanzar hacia tres o seis meses, según tus posibilidades.",
    tip3Title: "Identifica gastos innecesarios",
    tip3Text: "Revisa tus compras pequeñas y suscripciones. Algunas parecen insignificantes, pero al sumarlas pueden representar una cantidad importante.",
    tip4Title: "Establece metas concretas",
    tip4Text: "Define cuánto necesitas, para qué lo necesitas y en cuánto tiempo quieres conseguirlo. Divide la meta en aportes semanales o mensuales.",
    tip5Title: "¿Cómo ahorrar con ingresos limitados?",
    tip5Text: "Prioriza vivienda, alimentación, servicios y transporte. Aparta una cantidad pequeña para ahorrar y evita comprometer dinero que necesitas para vivir.",
    tip6Title: "Distribuye tus ingresos",
    tip6Text: "Una referencia inicial puede ser 50% para necesidades, 30% para deseos y 20% para ahorro y deudas. Ajusta los porcentajes a tu realidad.",
    tip7Title: "Controla tus deudas",
    tip7Text: "Conoce las tasas de interés, los pagos mínimos y las fechas de vencimiento. Evita asumir nuevas cuotas sin revisar tu capacidad de pago.",
    tip8Title: "Ten cuidado con los tipos de cambio",
    tip8Text: "Si recibes o gastas dinero en diferentes monedas, revisa el tipo de cambio y las comisiones antes de hacer una conversión.",
    customizeApp: "PERSONALIZA TU APLICACIÓN",
    settings: "Configuración ⚙️",
    language: "Idioma / Language",
    languageDescription: "Selecciona el idioma de la aplicación.",
    appLanguage: "Idioma de la aplicación",
    mainCurrency: "Moneda principal",
    mainCurrencyDescription: "Los totales generales se mostrarán en esta moneda.",
    selectCurrency: "Seleccionar moneda",
    saveMainCurrency: "Guardar moneda principal",
    exchangeRates: "Tipos de cambio",
    exchangeDescription: "Consulta tipos de cambio automáticamente o utiliza tus propios valores.",
    automaticQuery: "Consulta automática",
    updateRates: "Actualizar tipos de cambio",
    ratesNotUpdated: "Todavía no se han consultado los tipos de cambio.",
    rateSource: "Origen de las tasas",
    advancedSettings: "Configuración avanzada: tipos de cambio manuales",
    manualRatesHelp: "Ingresa cuántas unidades de tu moneda principal equivalen a una unidad de la otra moneda.",
    ratesWillAppear: "Los tipos de cambio aparecerán aquí.",
    saveRates: "Guardar tipos de cambio",
    appData: "Datos de la aplicación",
    localDataDescription: "Tus movimientos y metas se guardan en este dispositivo.",
    exportData: "Exportar mis datos",
    importData: "Importar copia de datos",
    appDescription: "Tu herramienta personal para organizar ingresos, gastos y ahorros.",
    version: "Versión 2.1",
    home: "Inicio",
    budget: "Presupuesto",
    more: "Más",
    saved: "Guardado correctamente.",
    deleted: "Registro eliminado.",
    confirmDelete: "¿Deseas eliminar este registro?",
    noData: "No hay datos para mostrar.",
    automaticReady: "Actualizado",
    automaticPending: "Pendiente de actualizar",
    updating: "Actualizando...",
    updateError: "No fue posible actualizar los tipos de cambio.",
    manualSource: "Manual",
    automaticSource: "Automático",
    automaticAndManual: "Automático / Manual",
    ratesSaved: "Tipos de cambio guardados.",
    currencySaved: "Moneda principal actualizada.",
    languageSaved: "Idioma actualizado.",
    exportSuccess: "Datos exportados correctamente.",
    importSuccess: "Datos importados correctamente.",
    importError: "No se pudo importar el archivo.",
    insufficientSavings: "No hay suficiente dinero en esta meta para realizar el retiro.",
    selectValidAmount: "Introduce un monto válido.",
    goal: "Meta",
    progress: "Progreso",
    deposited: "Ahorrado",
    remaining: "Falta",
    completed: "Completada",
    delete: "Eliminar",
    spent: "Gastado",
    limit: "Límite",
    remainingBudget: "Disponible",
    exceeded: "Presupuesto excedido",
    recurringDay: "Día",
    noChartData: "Sin datos",
    needs: "Necesidades",
    wants: "Deseos",
    savingsAndDebt: "Ahorro y deudas",
    other: "Otros",
    noGoalSelected: "Primero crea una meta de ahorro.",
    rate: "Tipo de cambio",
    baseCurrency: "Moneda base",
    exchangeUpdatedAt: "Última actualización",
    rateHelp: "Los tipos automáticos dependen de la disponibilidad del servicio de consulta. Puedes usar los valores manuales si no hay conexión."
  },

  en: {
    headerEyebrow: "YOUR FINANCIAL CONTROL",
    welcomeSubtitle: "Your financial overview",
    hello: "Hello! 👋",
    availableBalance: "Available balance",
    income: "Income",
    expenses: "Expenses",
    monthSummary: "Monthly summary",
    savings: "Savings",
    available: "Available",
    recentMovements: "Recent transactions",
    seeAll: "See all",
    noMovements: "You don't have any transactions yet.",
    quickActions: "Quick actions",
    save: "Save",
    entriesAndExits: "INCOME AND EXPENSES",
    movements: "Transactions",
    recordMoney: "Record and review your money.",
    newMovement: "New transaction",
    movementType: "Transaction type",
    description: "Description",
    amount: "Amount",
    movementCurrency: "Transaction currency",
    category: "Category",
    date: "Date",
    saveMovement: "Save transaction",
    history: "History",
    all: "All",
    incomes: "Income",
    allCurrencies: "All currencies",
    movementsWillAppear: "Your transactions will appear here.",
    buildFuture: "BUILD YOUR FUTURE",
    mySavings: "My savings 🐷",
    savingsSubtitle: "Set goals and track your progress.",
    totalSavings: "Total savings",
    convertedMainCurrency: "Total converted to your main currency.",
    createSavingsGoal: "Create a savings goal",
    goalName: "Goal name",
    targetAmount: "Target amount",
    goalCurrency: "Goal currency",
    targetDate: "Target date (optional)",
    createGoal: "Create goal",
    recordSavings: "Record a deposit or withdrawal",
    savingsGoal: "Savings goal",
    selectGoal: "Select a goal",
    operation: "Operation",
    addMoney: "Deposit money",
    withdrawMoney: "Withdraw money",
    saveOperation: "Save operation",
    myGoals: "My goals",
    noGoals: "You haven't created any goals yet.",
    planExpenses: "PLAN YOUR EXPENSES",
    budgets: "Budgets",
    budgetsSubtitle: "Set limits to manage your money.",
    createBudget: "Create budget",
    monthlyLimit: "Monthly limit",
    currency: "Currency",
    saveBudget: "Save budget",
    noBudgets: "You haven't created any budgets yet.",
    scheduledPayments: "SCHEDULED PAYMENTS",
    recurringExpenses: "Recurring expenses",
    recurringSubtitle: "Organize your regular payments.",
    addRecurring: "Add recurring expense",
    frequency: "Frequency",
    weekly: "Weekly",
    biweekly: "Biweekly",
    monthly: "Monthly",
    yearly: "Yearly",
    paymentDay: "Payment day",
    saveRecurring: "Save recurring expense",
    noRecurring: "You have no recurring expenses.",
    knowNumbers: "KNOW YOUR NUMBERS",
    statistics: "Statistics",
    statisticsSubtitle: "Analyze how you use your money.",
    monthToView: "Month to view",
    balance: "Balance",
    expenseDistribution: "Expense distribution",
    registerExpenses: "Record expenses to see your statistics.",
    incomeVsExpenses: "Income and expenses",
    financialDistribution: "Financial distribution",
    learnToManage: "LEARN TO MANAGE YOUR MONEY",
    financialTips: "Financial tips 💡",
    tipsSubtitle: "Small changes can improve your finances.",
    tip1Title: "Start saving, even if it's a little",
    tip1Text: "You don't need large amounts. Saving a small amount regularly is better than waiting until you have a lot of money.",
    tip2Title: "Build an emergency fund",
    tip2Text: "First try to save the equivalent of one month of essential expenses. Then work toward three to six months, depending on your situation.",
    tip3Title: "Identify unnecessary expenses",
    tip3Text: "Review small purchases and subscriptions. They may seem insignificant, but together they can add up.",
    tip4Title: "Set specific goals",
    tip4Text: "Decide how much you need, what you need it for, and when you want to reach it. Divide your goal into weekly or monthly contributions.",
    tip5Title: "How can you save with limited income?",
    tip5Text: "Prioritize housing, food, utilities, and transportation. Set aside a small amount for savings without compromising essential expenses.",
    tip6Title: "Allocate your income",
    tip6Text: "A starting guideline is 50% for needs, 30% for wants, and 20% for savings and debt. Adjust these percentages to your situation.",
    tip7Title: "Manage your debt",
    tip7Text: "Know your interest rates, minimum payments, and due dates. Avoid taking on new payments without reviewing your ability to pay.",
    tip8Title: "Be careful with exchange rates",
    tip8Text: "If you receive or spend money in different currencies, check exchange rates and fees before converting.",
    customizeApp: "CUSTOMIZE YOUR APP",
    settings: "Settings ⚙️",
    language: "Language",
    languageDescription: "Choose the application language.",
    appLanguage: "Application language",
    mainCurrency: "Main currency",
    mainCurrencyDescription: "All totals will be displayed in this currency.",
    selectCurrency: "Select currency",
    saveMainCurrency: "Save main currency",
    exchangeRates: "Exchange rates",
    exchangeDescription: "Get automatic exchange rates or use your own values.",
    automaticQuery: "Automatic update",
    updateRates: "Update exchange rates",
    ratesNotUpdated: "Exchange rates have not been updated yet.",
    rateSource: "Rate source",
    advancedSettings: "Advanced settings: manual exchange rates",
    manualRatesHelp: "Enter how many units of your main currency equal one unit of another currency.",
    ratesWillAppear: "Exchange rates will appear here.",
    saveRates: "Save exchange rates",
    appData: "Application data",
    localDataDescription: "Your transactions and goals are stored on this device.",
    exportData: "Export my data",
    importData: "Import data backup",
    appDescription: "Your personal tool to organize income, expenses, and savings.",
    version: "Version 2.1",
    home: "Home",
    budget: "Budget",
    more: "More",
    saved: "Saved successfully.",
    deleted: "Record deleted.",
    confirmDelete: "Do you want to delete this record?",
    noData: "There is no data to display.",
    automaticReady: "Updated",
    automaticPending: "Waiting for update",
    updating: "Updating...",
    updateError: "Exchange rates could not be updated.",
    manualSource: "Manual",
    automaticSource: "Automatic",
    automaticAndManual: "Automatic / Manual",
    ratesSaved: "Exchange rates saved.",
    currencySaved: "Main currency updated.",
    languageSaved: "Language updated.",
    exportSuccess: "Data exported successfully.",
    importSuccess: "Data imported successfully.",
    importError: "The file could not be imported.",
    insufficientSavings: "There isn't enough money in this goal for this withdrawal.",
    selectValidAmount: "Enter a valid amount.",
    goal: "Goal",
    progress: "Progress",
    deposited: "Saved",
    remaining: "Remaining",
    completed: "Completed",
    delete: "Delete",
    spent: "Spent",
    limit: "Limit",
    remainingBudget: "Available",
    exceeded: "Budget exceeded",
    recurringDay: "Day",
    noChartData: "No data",
    needs: "Needs",
    wants: "Wants",
    savingsAndDebt: "Savings and debt",
    other: "Other",
    noGoalSelected: "Create a savings goal first.",
    rate: "Exchange rate",
    baseCurrency: "Base currency",
    exchangeUpdatedAt: "Last updated",
    rateHelp: "Automatic rates depend on the availability of the exchange-rate service. You can use manual values when offline."
  }
};

/* =========================================================
   DATOS Y CONFIGURACIÓN
   ========================================================= */

function leerLista(clave) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(valor) ? valor : [];
  } catch {
    return [];
  }
}

function leerObjeto(clave, defecto = {}) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave));
    return valor && typeof valor === "object" && !Array.isArray(valor)
      ? valor
      : defecto;
  } catch {
    return defecto;
  }
}

let movimientos = leerLista(CLAVE.movimientos);
let metas = leerLista(CLAVE.metas);
let operacionesAhorro = leerLista(CLAVE.operaciones);
let presupuestos = leerLista(CLAVE.presupuestos);
let recurrentes = leerLista(CLAVE.recurrentes);

let configuracion = {
  monedaPrincipal: "CRC",
  idioma: "es",
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
  tasasAutomaticas: null,
  fechaActualizacion: null,
  ...leerObjeto(CLAVE.configuracion)
};

if (!MONEDAS.includes(configuracion.monedaPrincipal)) {
  configuracion.monedaPrincipal = "CRC";
}

if (!["es", "en"].includes(configuracion.idioma)) {
  configuracion.idioma = "es";
}

configuracion.tasasManuales = {
  CRC: 1,
  USD: 500,
  EUR: 540,
  MXN: 29,
  GBP: 630,
  BRL: 95,
  COP: 0.125,
  CAD: 360,
  ...(configuracion.tasasManuales || {})
};

/* Compatibilidad con nombres anteriores de configuración */
if (configuracion.monedaActual && !configuracion.monedaPrincipal) {
  configuracion.monedaPrincipal = configuracion.monedaActual;
}

function guardarDatos() {
  localStorage.setItem(CLAVE.movimientos, JSON.stringify(movimientos));
  localStorage.setItem(CLAVE.metas, JSON.stringify(metas));
  localStorage.setItem(CLAVE.operaciones, JSON.stringify(operacionesAhorro));
  localStorage.setItem(CLAVE.presupuestos, JSON.stringify(presupuestos));
  localStorage.setItem(CLAVE.recurrentes, JSON.stringify(recurrentes));
  localStorage.setItem(CLAVE.configuracion, JSON.stringify(configuracion));
}

function texto(clave) {
  return IDIOMAS[configuracion.idioma]?.[clave] ||
    IDIOMAS.es[clave] ||
    clave;
}

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function aplicarIdioma() {
  document.documentElement.lang = configuracion.idioma;

  document.querySelectorAll("[data-i18n]").forEach(elemento => {
    const clave = elemento.dataset.i18n;
    const traduccion = texto(clave);

    if (elemento.tagName === "INPUT") {
      elemento.placeholder = traduccion;
    } else {
      elemento.textContent = traduccion;
    }
  });

  const selector = document.getElementById("idioma-aplicacion");
  if (selector) selector.value = configuracion.idioma;

  const botonConfiguracion = document.getElementById("btn-settings");
  if (botonConfiguracion) {
    botonConfiguracion.setAttribute(
      "aria-label",
      configuracion.idioma === "es" ? "Configuración" : "Settings"
    );
  }

  const navegacion = document.querySelector(".bottom-nav");
  if (navegacion) {
    navegacion.setAttribute(
      "aria-label",
      configuracion.idioma === "es" ? "Navegación principal" : "Main navigation"
    );
  }

  traducirCategorias();
}

function traducirCategorias() {
  const traducciones = configuracion.idioma === "en"
    ? {
        "Salario": "Salary",
        "Trabajo extra": "Extra work",
        "Negocio": "Business",
        "Alimentación": "Food",
        "Vivienda": "Housing",
        "Transporte": "Transportation",
        "Servicios": "Utilities",
        "Deudas": "Debt",
        "Salud": "Health",
        "Educación": "Education",
        "Entretenimiento": "Entertainment",
        "Compras": "Shopping",
        "Otros": "Other"
      }
    : {};

  document.querySelectorAll("select").forEach(select => {
    [...select.options].forEach(opcion => {
      if (opcion.dataset.originalLabel === undefined) {
        opcion.dataset.originalLabel = opcion.textContent;
      }

      const original = opcion.dataset.originalLabel;
      const valor = opcion.value;

      if (traducciones[valor]) {
        opcion.textContent = traducciones[valor];
      } else if (valor === "deposito") {
        opcion.textContent = configuracion.idioma === "en" ? "Deposit money" : "Agregar dinero";
      } else if (valor === "retiro") {
        opcion.textContent = configuracion.idioma === "en" ? "Withdraw money" : "Retirar dinero";
      } else if (valor === "semanal") {
        opcion.textContent = configuracion.idioma === "en" ? "Weekly" : "Semanal";
      } else if (valor === "quincenal") {
        opcion.textContent = configuracion.idioma === "en" ? "Biweekly" : "Quincenal";
      } else if (valor === "mensual") {
        opcion.textContent = configuracion.idioma === "en" ? "Monthly" : "Mensual";
      } else if (valor === "anual") {
        opcion.textContent = configuracion.idioma === "en" ? "Yearly" : "Anual";
      } else {
        opcion.textContent = original;
      }
    });
  });
}

/* =========================================================
   MONEDAS Y CONVERSIONES
   ========================================================= */

function tasaManual(moneda) {
  const valor = Number(configuracion.tasasManuales?.[moneda]);
  return Number.isFinite(valor) && valor > 0 ? valor : null;
}

/*
  Las tasas manuales representan:
  1 unidad de moneda extranjera = X unidades de moneda principal.

  La API automática devuelve:
  1 unidad de moneda principal = X unidades de moneda extranjera.
  Por eso se invierte la tasa automática al convertir a la moneda base.
*/

function tasaConversion(moneda) {
  const base = configuracion.monedaPrincipal;

  if (moneda === base) return 1;

  const automaticas = configuracion.tasasAutomaticas;

  if (
    automaticas &&
    automaticas.base_code === base &&
    automaticas.conversion_rates &&
    Number(automaticas.conversion_rates[moneda]) > 0
  ) {
    return 1 / Number(automaticas.conversion_rates[moneda]);
  }

  const manual = tasaManual(moneda);
  if (manual) return manual;

  return null;
}

function convertir(monto, monedaOrigen, monedaDestino = configuracion.monedaPrincipal) {
  const cantidad = Number(monto);

  if (!Number.isFinite(cantidad)) return 0;
  if (monedaOrigen === monedaDestino) return cantidad;

  const base = configuracion.monedaPrincipal;

  let enBase;

  if (monedaOrigen === base) {
    enBase = cantidad;
  } else {
    const tasaOrigen = tasaConversion(monedaOrigen);
    if (!tasaOrigen) return null;
    enBase = cantidad * tasaOrigen;
  }

  if (monedaDestino === base) return enBase;

  const tasaDestino = tasaConversion(monedaDestino);
  if (!tasaDestino) return null;

  return enBase / tasaDestino;
}

function formatoMoneda(monto, moneda = configuracion.monedaPrincipal) {
  const cantidad = Number(monto || 0);

  try {
    return new Intl.NumberFormat(
      configuracion.idioma === "en" ? "en-US" : "es-CR",
      {
        style: "currency",
        currency: moneda,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    ).format(cantidad);
  } catch {
    return `${SIMBOLOS[moneda] || moneda} ${cantidad.toFixed(2)}`;
  }
}

function valorEnPrincipal(registro, campo = "monto") {
  const monto = Number(registro[campo] || 0);
  const moneda = registro.moneda || configuracion.monedaPrincipal;
  const resultado = convertir(monto, moneda);

  return resultado === null ? 0 : resultado;
}

function obtenerTasaManualDesdeBase(moneda) {
  if (moneda === configuracion.monedaPrincipal) return 1;
  return tasaManual(moneda) || 0;
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function mostrarSeccion(id) {
  if (id === "mas") {
    const menu = document.getElementById("menu-mas");
    if (menu) menu.hidden = !menu.hidden;
    return;
  }

  document.querySelectorAll(".page-section").forEach(seccion => {
    seccion.classList.toggle("active", seccion.id === id);
  });

  document.querySelectorAll(".nav-button").forEach(boton => {
    boton.classList.toggle("active", boton.dataset.section === id);
  });

  const menu = document.getElementById("menu-mas");
  if (menu) menu.hidden = true;

  if (id === "configuracion") actualizarConfiguracionUI();
  if (id === "estadisticas") actualizarEstadisticas();
}

document.querySelectorAll("[data-section]").forEach(boton => {
  boton.addEventListener("click", () => {
    mostrarSeccion(boton.dataset.section);
  });
});

document.querySelectorAll("[data-go]").forEach(boton => {
  boton.addEventListener("click", () => {
    mostrarSeccion(boton.dataset.go);

    if (boton.dataset.action) {
      const tipo = document.getElementById("mov-tipo");
      if (tipo) tipo.value = boton.dataset.action;

      document.getElementById("mov-descripcion")?.focus();
    }
  });
});

document.getElementById("btn-settings")?.addEventListener("click", () => {
  mostrarSeccion("configuracion");
});

/* =========================================================
   FECHAS Y UTILIDADES
   ========================================================= */

function fechaLocal() {
  const ahora = new Date();
  const zona = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000);
  return zona.toISOString().slice(0, 10);
}

function mesActual() {
  return fechaLocal().slice(0, 7);
}

function fechaBonita(fecha) {
  if (!fecha) return "";

  const valor = new Date(`${fecha}T12:00:00`);
  if (Number.isNaN(valor.getTime())) return fecha;

  return valor.toLocaleDateString(
    configuracion.idioma === "en" ? "en-US" : "es-CR"
  );
}

function generarId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sumar(array, funcion) {
  return array.reduce((total, elemento) => total + funcion(elemento), 0);
}

function mesCoincide(fecha, mes) {
  return !mes || !fecha || fecha.slice(0, 7) === mes;
}

/* =========================================================
   MOVIMIENTOS
   ========================================================= */

const formMovimiento = document.getElementById("form-movimiento");

formMovimiento?.addEventListener("submit", evento => {
  evento.preventDefault();

  const descripcion = document.getElementById("mov-descripcion").value.trim();
  const monto = Number(document.getElementById("mov-monto").value);

  if (!descripcion || !Number.isFinite(monto) || monto <= 0) {
    alert(texto("selectValidAmount"));
    return;
  }

  movimientos.push({
    id: generarId(),
    tipo: document.getElementById("mov-tipo").value,
    descripcion,
    monto,
    moneda: document.getElementById("mov-moneda").value,
    categoria: document.getElementById("mov-categoria").value,
    fecha: document.getElementById("mov-fecha").value || fechaLocal()
  });

  guardarDatos();
  formMovimiento.reset();

  document.getElementById("mov-fecha").value = fechaLocal();

  actualizarTodo();
  alert(texto("saved"));
});

function renderizarMovimiento(movimiento) {
  const ingreso = movimiento.tipo === "ingreso";
  const cantidad = Number(movimiento.monto || 0);
  const moneda = movimiento.moneda || configuracion.monedaPrincipal;

  return `
    <article class="list-item">
      <div class="list-item-content">
        <strong>${escaparHTML(movimiento.descripcion)}</strong>
        <p class="muted">
          ${escaparHTML(movimiento.categoria || texto("other"))}
          · ${fechaBonita(movimiento.fecha)}
        </p>
        <small>${formatoMoneda(cantidad, moneda)}</small>
      </div>

      <div class="list-item-actions">
        <strong class="${ingreso ? "income" : "expense"}">
          ${ingreso ? "+" : "-"}${formatoMoneda(cantidad, moneda)}
        </strong>
        <button type="button" class="text-button delete-button"
          data-delete-type="movimiento"
          data-id="${escaparHTML(movimiento.id)}">
          ${texto("delete")}
        </button>
      </div>
    </article>
  `;
}

function actualizarMovimientos() {
  const lista = document.getElementById("lista-movimientos");
  const recientes = document.getElementById("movimientos-recientes");

  const filtroTipo = document.getElementById("filtro-tipo-movimiento")?.value || "todos";
  const filtroMes = document.getElementById("filtro-mes-movimientos")?.value || "";
  const filtroMoneda = document.getElementById("filtro-moneda-movimientos")?.value || "todas";

  let filtrados = [...movimientos];

  if (filtroTipo !== "todos") {
    filtrados = filtrados.filter(m => m.tipo === filtroTipo);
  }

  if (filtroMes) {
    filtrados = filtrados.filter(m => mesCoincide(m.fecha, filtroMes));
  }

  if (filtroMoneda !== "todas") {
    filtrados = filtrados.filter(m => (m.moneda || "CRC") === filtroMoneda);
  }

  filtrados.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));

  if (lista) {
    lista.innerHTML = filtrados.length
      ? filtrados.map(renderizarMovimiento).join("")
      : `<p class="empty-state">${texto("noData")}</p>`;
  }

  if (recientes) {
    const ultimos = [...movimientos]
      .sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""))
      .slice(0, 5);

    recientes.innerHTML = ultimos.length
      ? ultimos.map(renderizarMovimiento).join("")
      : `<p class="empty-state">${texto("noMovements")}</p>`;
  }
}

document.getElementById("filtro-tipo-movimiento")?.addEventListener("change", actualizarMovimientos);
document.getElementById("filtro-mes-movimientos")?.addEventListener("change", actualizarMovimientos);
document.getElementById("filtro-moneda-movimientos")?.addEventListener("change", actualizarMovimientos);

/* =========================================================
   AHORROS Y METAS
   ========================================================= */

document.getElementById("form-meta-ahorro")?.addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = document.getElementById("ahorro-nombre").value.trim();
  const objetivo = Number(document.getElementById("ahorro-objetivo").value);
  const moneda = document.getElementById("ahorro-moneda").value;

  if (!nombre || !Number.isFinite(objetivo) || objetivo <= 0) {
    alert(texto("selectValidAmount"));
    return;
  }

  metas.push({
    id: generarId(),
    nombre,
    objetivo,
    moneda,
    fecha: document.getElementById("ahorro-fecha-meta").value,
    fechaCreacion: fechaLocal()
  });

  guardarDatos();
  evento.target.reset();
  actualizarTodo();
  alert(texto("saved"));
});

function obtenerIdMeta(operacion) {
  return operacion.metaId ?? operacion.meta_id ?? operacion.meta ?? operacion.idMeta;
}

function totalMeta(meta) {
  return sumar(
    operacionesAhorro.filter(op => String(obtenerIdMeta(op)) === String(meta.id)),
    op => {
      const valor = valorEnPrincipal(op);
      return op.tipo === "retiro" ? -valor : valor;
    }
  );
}

function totalMetaEnMoneda(meta) {
  const totalPrincipal = totalMeta(meta);
  const monedaMeta = meta.moneda || configuracion.monedaPrincipal;
  const convertido = convertir(totalPrincipal, configuracion.monedaPrincipal, monedaMeta);

  return convertido === null ? 0 : convertido;
}

function actualizarSelectorMetas() {
  const selector = document.getElementById("ahorro-meta-seleccionada");
  if (!selector) return;

  const seleccionado = selector.value;

  selector.innerHTML = `
    <option value="">${texto("selectGoal")}</option>
    ${metas.map(meta => `
      <option value="${escaparHTML(meta.id)}">
        ${escaparHTML(meta.nombre)}
      </option>
    `).join("")}
  `;

  if (metas.some(meta => String(meta.id) === seleccionado)) {
    selector.value = seleccionado;
  }
}

document.getElementById("form-movimiento-ahorro")?.addEventListener("submit", evento => {
  evento.preventDefault();

  const metaId = document.getElementById("ahorro-meta-seleccionada").value;
  const tipo = document.getElementById("ahorro-tipo").value;
  const monto = Number(document.getElementById("ahorro-monto").value);
  const moneda = document.getElementById("ahorro-moneda-movimiento").value;

  if (!metaId) {
    alert(texto("noGoalSelected"));
    return;
  }

  if (!Number.isFinite(monto) || monto <= 0) {
    alert(texto("selectValidAmount"));
    return;
  }

  const meta = metas.find(m => String(m.id) === String(metaId));
  if (!meta) return;

  if (tipo === "retiro") {
    const saldoMeta = totalMetaEnMoneda(meta);

    if (monto > saldoMeta) {
      alert(texto("insufficientSavings"));
      return;
    }
  }

  operacionesAhorro.push({
    id: generarId(),
    metaId,
    tipo,
    monto,
    moneda,
    fecha: document.getElementById("ahorro-fecha-movimiento").value || fechaLocal()
  });

  guardarDatos();
  evento.target.reset();
  document.getElementById("ahorro-fecha-movimiento").value = fechaLocal();

  actualizarTodo();
  alert(texto("saved"));
});

function renderizarMeta(meta) {
  const total = totalMetaEnMoneda(meta);
  const objetivo = Number(meta.objetivo || 0);
  const porcentaje = objetivo > 0 ? Math.min(100, Math.max(0, total / objetivo * 100)) : 0;
  const restante = Math.max(0, objetivo - total);
  const moneda = meta.moneda || configuracion.monedaPrincipal;

  const operaciones = operacionesAhorro
    .filter(op => String(obtenerIdMeta(op)) === String(meta.id))
    .sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));

  return `
    <article class="list-item savings-goal-item">
      <div class="list-item-content">
        <strong>${escaparHTML(meta.nombre)}</strong>
        <p>${texto("progress")}: ${porcentaje.toFixed(1)}%</p>
        <div class="progress-track">
          <div class="progress-bar" style="width:${porcentaje}%"></div>
        </div>
        <p class="muted">
          ${texto("deposited")}: ${formatoMoneda(total, moneda)}
          · ${texto("goal")}: ${formatoMoneda(objetivo, moneda)}
        </p>
        <p class="muted">${texto("remaining")}: ${formatoMoneda(restante, moneda)}</p>
        ${meta.fecha ? `<small>${fechaBonita(meta.fecha)}</small>` : ""}
        ${total >= objetivo ? `<p><strong>${texto("completed")}</strong></p>` : ""}
        ${operaciones.map(op => `
          <p class="small-note">
            ${op.tipo === "retiro" ? "−" : "+"}
            ${formatoMoneda(op.monto, op.moneda || moneda)}
            · ${fechaBonita(op.fecha)}
            <button class="text-button delete-button"
              data-delete-type="operacion"
              data-id="${escaparHTML(op.id)}">${texto("delete")}</button>
          </p>
        `).join("")}
      </div>

      <button type="button" class="text-button delete-button"
        data-delete-type="meta"
        data-id="${escaparHTML(meta.id)}">
        ${texto("delete")}
      </button>
    </article>
  `;
}

function actualizarAhorros() {
  const total = sumar(metas, meta => totalMeta(meta));

  const totalElemento = document.getElementById("total-ahorros");
  if (totalElemento) totalElemento.textContent = formatoMoneda(total);

  const lista = document.getElementById("lista-metas-ahorro");

  if (lista) {
    lista.innerHTML = metas.length
      ? metas.map(renderizarMeta).join("")
      : `<p class="empty-state">${texto("noGoals")}</p>`;
  }

  actualizarSelectorMetas();
}

/* =========================================================
   PRESUPUESTOS
   ========================================================= */

document.getElementById("form-presupuesto")?.addEventListener("submit", evento => {
  evento.preventDefault();

  const categoria = document.getElementById("presupuesto-categoria").value;
  const monto = Number(document.getElementById("presupuesto-monto").value);
  const moneda = document.getElementById("presupuesto-moneda").value;

  if (!Number.isFinite(monto) || monto <= 0) {
    alert(texto("selectValidAmount"));
    return;
  }

  const existente = presupuestos.find(p =>
    p.categoria === categoria &&
    (p.moneda || "CRC") === moneda
  );

  if (existente) {
    existente.monto = monto;
  } else {
    presupuestos.push({
      id: generarId(),
      categoria,
      monto,
      moneda
    });
  }

  guardarDatos();
  evento.target.reset();
  actualizarTodo();
  alert(texto("saved"));
});

function gastoCategoriaMes(categoria, monedaPresupuesto) {
  return sumar(
    movimientos.filter(m =>
      m.tipo === "gasto" &&
      m.categoria === categoria &&
      mesCoincide(m.fecha, mesActual())
    ),
    m => {
      const resultado = convertir(
        Number(m.monto || 0),
        m.moneda || "CRC",
        monedaPresupuesto
      );

      return resultado === null ? 0 : resultado;
    }
  );
}

function actualizarPresupuestos() {
  const lista = document.getElementById("lista-presupuestos");
  if (!lista) return;

  lista.innerHTML = presupuestos.length
    ? presupuestos.map(p => {
        const moneda = p.moneda || "CRC";
        const gastado = gastoCategoriaMes(p.categoria, moneda);
        const limite = Number(p.monto || 0);
        const porcentaje = limite > 0 ? gastado / limite * 100 : 0;
        const ancho = Math.min(100, Math.max(0, porcentaje));

        return `
          <article class="list-item">
            <div class="list-item-content">
              <strong>${escaparHTML(p.categoria)}</strong>
              <p>${texto("spent")}: ${formatoMoneda(gastado, moneda)}</p>
              <p>${texto("limit")}: ${formatoMoneda(limite, moneda)}</p>
              <div class="progress-track">
                <div class="progress-bar" style="width:${ancho}%"></div>
              </div>
              <p class="muted">
                ${porcentaje > 100
                  ? texto("exceeded")
                  : `${texto("remainingBudget")}: ${formatoMoneda(Math.max(0, limite - gastado), moneda)}`}
              </p>
            </div>
            <button class="text-button delete-button"
              data-delete-type="presupuesto"
              data-id="${escaparHTML(p.id)}">${texto("delete")}</button>
          </article>
        `;
      }).join("")
    : `<p class="empty-state">${texto("noBudgets")}</p>`;
}

/* =========================================================
   GASTOS RECURRENTES
   ========================================================= */

document.getElementById("form-recurrente")?.addEventListener("submit", evento => {
  evento.preventDefault();

  const descripcion = document.getElementById("recurrente-descripcion").value.trim();
  const monto = Number(document.getElementById("recurrente-monto").value);

  if (!descripcion || !Number.isFinite(monto) || monto <= 0) {
    alert(texto("selectValidAmount"));
    return;
  }

  recurrentes.push({
    id: generarId(),
    descripcion,
    monto,
    moneda: document.getElementById("recurrente-moneda").value,
    categoria: document.getElementById("recurrente-categoria").value,
    frecuencia: document.getElementById("recurrente-frecuencia").value,
    dia: Number(document.getElementById("recurrente-dia").value)
  });

  guardarDatos();
  evento.target.reset();
  actualizarTodo();
  alert(texto("saved"));
});

function actualizarRecurrentes() {
  const lista = document.getElementById("lista-recurrentes");
  if (!lista) return;

  lista.innerHTML = recurrentes.length
    ? recurrentes.map(r => `
        <article class="list-item">
          <div class="list-item-content">
            <strong>${escaparHTML(r.descripcion)}</strong>
            <p>${escaparHTML(r.categoria || texto("other"))}</p>
            <strong>${formatoMoneda(r.monto, r.moneda || "CRC")}</strong>
            <p class="muted">
              ${escaparHTML(r.frecuencia || "")}
              · ${texto("recurringDay")} ${escaparHTML(r.dia || "")}
            </p>
          </div>
          <button class="text-button delete-button"
            data-delete-type="recurrente"
            data-id="${escaparHTML(r.id)}">${texto("delete")}</button>
        </article>
      `).join("")
    : `<p class="empty-state">${texto("noRecurring")}</p>`;
}

/* =========================================================
   INICIO Y RESUMEN
   ========================================================= */

function calcularResumen(mes) {
  const delMes = movimientos.filter(m => mesCoincide(m.fecha, mes));

  const ingresos = sumar(
    delMes.filter(m => m.tipo === "ingreso"),
    m => valorEnPrincipal(m)
  );

  const gastos = sumar(
    delMes.filter(m => m.tipo === "gasto"),
    m => valorEnPrincipal(m)
  );

  const operacionesDelMes = operacionesAhorro.filter(op => mesCoincide(op.fecha, mes));

  const ahorroNeto = sumar(operacionesDelMes, op => {
    const valor = valorEnPrincipal(op);
    return op.tipo === "retiro" ? -valor : valor;
  });

  return {
    ingresos,
    gastos,
    ahorros: ahorroNeto,
    disponible: ingresos - gastos - ahorroNeto,
    balance: ingresos - gastos
  };
}

function actualizarInicio() {
  const mes = document.getElementById("filtro-mes-inicio")?.value || mesActual();
  const resumen = calcularResumen(mes);

  const totalIngresos = sumar(
    movimientos.filter(m => m.tipo === "ingreso"),
    m => valorEnPrincipal(m)
  );

  const totalGastos = sumar(
    movimientos.filter(m => m.tipo === "gasto"),
    m => valorEnPrincipal(m)
  );

  const ahorroTotal = sumar(metas, meta => totalMeta(meta));

  const balance = document.getElementById("balance-total");
  const ingresosInicio = document.getElementById("inicio-ingresos");
  const gastosInicio = document.getElementById("inicio-gastos");

  if (balance) balance.textContent = formatoMoneda(totalIngresos - totalGastos - ahorroTotal);
  if (ingresosInicio) ingresosInicio.textContent = formatoMoneda(totalIngresos);
  if (gastosInicio) gastosInicio.textContent = formatoMoneda(totalGastos);

  const asignaciones = {
    "resumen-ingresos": resumen.ingresos,
    "resumen-gastos": resumen.gastos,
    "resumen-ahorros": resumen.ahorros,
    "resumen-disponible": resumen.disponible
  };

  Object.entries(asignaciones).forEach(([id, valor]) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = formatoMoneda(valor);
  });

  const fecha = document.getElementById("fecha-actual");
  if (fecha) {
    fecha.textContent = new Date().toLocaleDateString(
      configuracion.idioma === "en" ? "en-US" : "es-CR",
      { dateStyle: "long" }
    );
  }
}

document.getElementById("filtro-mes-inicio")?.addEventListener("change", actualizarInicio);

/* =========================================================
   ESTADÍSTICAS Y GRÁFICOS
   ========================================================= */

let graficoGastos = null;
let graficoComparacion = null;

function destruirGraficos() {
  if (graficoGastos) {
    graficoGastos.destroy();
    graficoGastos = null;
  }

  if (graficoComparacion) {
    graficoComparacion.destroy();
    graficoComparacion = null;
  }
}

function actualizarEstadisticas() {
  const mes = document.getElementById("estadisticas-mes")?.value || mesActual();
  const resumen = calcularResumen(mes);

  const valores = {
    "estadistica-ingresos": resumen.ingresos,
    "estadistica-gastos": resumen.gastos,
    "estadistica-ahorros": resumen.ahorros,
    "estadistica-balance": resumen.balance
  };

  Object.entries(valores).forEach(([id, valor]) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = formatoMoneda(valor);
  });

  const gastosMes = movimientos.filter(m =>
    m.tipo === "gasto" && mesCoincide(m.fecha, mes)
  );

  const categorias = {};

  gastosMes.forEach(m => {
    const categoria = m.categoria || texto("other");
    categorias[categoria] = (categorias[categoria] || 0) + valorEnPrincipal(m);
  });

  const canvasGastos = document.getElementById("grafico-gastos");
  const canvasComparacion = document.getElementById("grafico-comparacion");
  const sinDatos = document.getElementById("sin-datos-grafico");

  destruirGraficos();

  if (typeof Chart === "undefined") {
    if (sinDatos) sinDatos.hidden = false;
    return;
  }

  const hayGastos = Object.keys(categorias).length > 0;

  if (sinDatos) sinDatos.hidden = hayGastos;

  if (canvasGastos && hayGastos) {
    graficoGastos = new Chart(canvasGastos, {
      type: "doughnut",
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          data: Object.values(categorias)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            callbacks: {
              label: contexto => `${contexto.label}: ${formatoMoneda(contexto.raw)}`
            }
          }
        }
      }
    });
  }

  const ingresos = movimientos
    .filter(m => m.tipo === "ingreso" && mesCoincide(m.fecha, mes))
    .reduce((total, m) => total + valorEnPrincipal(m), 0);

  const gastos = movimientos
    .filter(m => m.tipo === "gasto" && mesCoincide(m.fecha, mes))
    .reduce((total, m) => total + valorEnPrincipal(m), 0);

  if (canvasComparacion) {
    graficoComparacion = new Chart(canvasComparacion, {
      type: "bar",
      data: {
        labels: [texto("income"), texto("expenses")],
        datasets: [{
          label: configuracion.monedaPrincipal,
          data: [ingresos, gastos]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: contexto => formatoMoneda(contexto.raw)
            }
          }
        }
      }
    });
  }

  const distribucion = document.getElementById("distribucion-financiera");

  if (distribucion) {
    const disponible = resumen.disponible;
    const total = Math.max(0, resumen.ingresos);

    const porcentajeGastos = total > 0 ? resumen.gastos / total * 100 : 0;
    const porcentajeAhorro = total > 0 ? Math.max(0, resumen.ahorros) / total * 100 : 0;
    const porcentajeDisponible = total > 0
      ? Math.max(0, disponible) / total * 100
      : 0;

    distribucion.innerHTML = `
      <p>${texto("income")}: <strong>${formatoMoneda(resumen.ingresos)}</strong></p>
      <p>${texto("expenses")}: <strong>${formatoMoneda(resumen.gastos)}</strong> (${porcentajeGastos.toFixed(1)}%)</p>
      <p>${texto("savings")}: <strong>${formatoMoneda(resumen.ahorros)}</strong> (${porcentajeAhorro.toFixed(1)}%)</p>
      <p>${texto("available")}: <strong>${formatoMoneda(disponible)}</strong> (${porcentajeDisponible.toFixed(1)}%)</p>
    `;
  }
}

document.getElementById("estadisticas-mes")?.addEventListener("change", actualizarEstadisticas);

/* =========================================================
   TIPOS DE CAMBIO
   ========================================================= */

function actualizarConfiguracionUI() {
  const selectorMoneda = document.getElementById("moneda-principal");
  if (selectorMoneda) selectorMoneda.value = configuracion.monedaPrincipal;

  const selectorIdioma = document.getElementById("idioma-aplicacion");
  if (selectorIdioma) selectorIdioma.value = configuracion.idioma;

  renderizarTasas();
  actualizarEstadoTasas();
}

function renderizarTasas() {
  const lista = document.getElementById("lista-tipos-cambio");
  if (!lista) return;

  const base = configuracion.monedaPrincipal;

  lista.innerHTML = MONEDAS
    .filter(moneda => moneda !== base)
    .map(moneda => {
      const valor = tasaManual(moneda) || "";

      return `
        <div class="exchange-rate-row">
          <label for="tasa-${moneda}">
            ${moneda} (${texto("rate")})
          </label>
          <input
            type="number"
            id="tasa-${moneda}"
            data-moneda-tasa="${moneda}"
            min="0.000001"
            step="any"
            value="${valor}"
            placeholder="0.00">
        </div>
      `;
    }).join("");
}

function actualizarEstadoTasas() {
  const estado = document.getElementById("estado-tipo-automatico");
  const fecha = document.getElementById("fecha-actualizacion-tasas");
  const fuente = document.getElementById("estado-fuente-tasas");

  const automaticasValidas =
    configuracion.tasasAutomaticas &&
    configuracion.tasasAutomaticas.base_code === configuracion.monedaPrincipal;

  if (estado) {
    estado.textContent = automaticasValidas
      ? texto("automaticReady")
      : texto("automaticPending");
  }

  if (fecha) {
    if (configuracion.fechaActualizacion) {
      const fechaFormato = new Date(configuracion.fechaActualizacion);

      fecha.textContent = `${texto("exchangeUpdatedAt")}: ${
        Number.isNaN(fechaFormato.getTime())
          ? configuracion.fechaActualizacion
          : fechaFormato.toLocaleString(configuracion.idioma === "en" ? "en-US" : "es-CR")
      }`;
    } else {
      fecha.textContent = texto("ratesNotUpdated");
    }
  }

  if (fuente) {
    fuente.textContent = automaticasValidas
      ? texto("automaticAndManual")
      : texto("manualSource");
  }
}

document.getElementById("actualizar-tasas")?.addEventListener("click", actualizarTasasAutomaticas);

async function actualizarTasasAutomaticas() {
  const boton = document.getElementById("actualizar-tasas");
  const estado = document.getElementById("estado-tipo-automatico");

  const base = configuracion.monedaPrincipal;

  if (boton) boton.disabled = true;
  if (estado) estado.textContent = texto("updating");

  try {
    const respuesta = await fetch(`https://open.er-api.com/v6/latest/${base}`);

    if (!respuesta.ok) {
      throw new Error("Error consultando tipos de cambio");
    }

    const datos = await respuesta.json();

    if (datos.result !== "success" || !datos.conversion_rates) {
      throw new Error("Respuesta de cambio no válida");
    }

    configuracion.tasasAutomaticas = datos;
    configuracion.fechaActualizacion = new Date().toISOString();

    guardarDatos();
    actualizarEstadoTasas();
    actualizarTodo();

    alert(texto("saved"));
  } catch (error) {
    console.error(error);
    alert(texto("updateError"));
    actualizarEstadoTasas();
  } finally {
    if (boton) boton.disabled = false;
  }
}

document.getElementById("guardar-tasas")?.addEventListener("click", () => {
  const base = configuracion.monedaPrincipal;
  const nuevasTasas = { ...configuracion.tasasManuales, [base]: 1 };

  document.querySelectorAll("[data-moneda-tasa]").forEach(input => {
    const moneda = input.dataset.monedaTasa;
    const valor = Number(input.value);

    if (Number.isFinite(valor) && valor > 0) {
      nuevasTasas[moneda] = valor;
    }
  });

  configuracion.tasasManuales = nuevasTasas;

  guardarDatos();
  actualizarEstadoTasas();
  actualizarTodo();

  alert(texto("ratesSaved"));
});

/* =========================================================
   CAMBIO DE MONEDA PRINCIPAL
   ========================================================= */

document.getElementById("guardar-moneda")?.addEventListener("click", () => {
  const nuevaMoneda = document.getElementById("moneda-principal").value;

  if (!MONEDAS.includes(nuevaMoneda)) return;

  if (nuevaMoneda !== configuracion.monedaPrincipal) {
    const tasasAnteriores = { ...configuracion.tasasManuales };

    configuracion.monedaPrincipal = nuevaMoneda;

    /*
      Las tasas manuales se guardan como:
      unidades de moneda principal por una unidad extranjera.
      Al cambiar la moneda principal se recalculan utilizando
      las tasas disponibles para evitar interpretaciones incorrectas.
    */

    const nuevas = { [nuevaMoneda]: 1 };

    MONEDAS.forEach(moneda => {
      if (moneda === nuevaMoneda) return;

      const conversion = convertir(1, moneda, nuevaMoneda);

      if (conversion !== null && conversion > 0) {
        nuevas[moneda] = conversion;
      } else if (tasasAnteriores[moneda]) {
        nuevas[moneda] = tasasAnteriores[moneda];
      }
    });

    configuracion.tasasManuales = {
      ...configuracion.tasasManuales,
      ...nuevas
    };

    configuracion.tasasAutomaticas = null;
    configuracion.fechaActualizacion = null;
  }

  guardarDatos();
  actualizarTodo();
  actualizarConfiguracionUI();

  alert(texto("currencySaved"));
});

/* =========================================================
   IDIOMA
   ========================================================= */

document.getElementById("idioma-aplicacion")?.addEventListener("change", evento => {
  const idioma = evento.target.value;

  if (!["es", "en"].includes(idioma)) return;

  configuracion.idioma = idioma;

  guardarDatos();
  aplicarIdioma();
  actualizarTodo();
  actualizarConfiguracionUI();
});

/* =========================================================
   ELIMINAR REGISTROS
   ========================================================= */

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-delete-type]");
  if (!boton) return;

  if (!confirm(texto("confirmDelete"))) return;

  const id = boton.dataset.id;
  const tipo = boton.dataset.deleteType;

  if (tipo === "movimiento") {
    movimientos = movimientos.filter(m => String(m.id) !== String(id));
  }

  if (tipo === "meta") {
    metas = metas.filter(m => String(m.id) !== String(id));
    operacionesAhorro = operacionesAhorro.filter(
      op => String(obtenerIdMeta(op)) !== String(id)
    );
  }

  if (tipo === "operacion") {
    operacionesAhorro = operacionesAhorro.filter(op => String(op.id) !== String(id));
  }

  if (tipo === "presupuesto") {
    presupuestos = presupuestos.filter(p => String(p.id) !== String(id));
  }

  if (tipo === "recurrente") {
    recurrentes = recurrentes.filter(r => String(r.id) !== String(id));
  }

  guardarDatos();
  actualizarTodo();
  alert(texto("deleted"));
});

/* =========================================================
   EXPORTAR E IMPORTAR
   ========================================================= */

document.getElementById("exportar-datos")?.addEventListener("click", () => {
  const datos = {
    version: "2.1",
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
  enlace.download = `mis-finanzas-${fechaLocal()}.json`;
  enlace.click();

  URL.revokeObjectURL(url);
  alert(texto("exportSuccess"));
});

document.getElementById("importar-datos")?.addEventListener("click", () => {
  document.getElementById("archivo-importar")?.click();
});

document.getElementById("archivo-importar")?.addEventListener("change", async evento => {
  const archivo = evento.target.files?.[0];
  if (!archivo) return;

  try {
    const contenido = await archivo.text();
    const datos = JSON.parse(contenido);

    if (!datos || typeof datos !== "object") {
      throw new Error("Archivo no válido");
    }

    if (!confirm(
      configuracion.idioma === "en"
        ? "Importing this file will replace your current data. Continue?"
        : "Importar este archivo reemplazará tus datos actuales. ¿Deseas continuar?"
    )) {
      evento.target.value = "";
      return;
    }

    movimientos = Array.isArray(datos.movimientos) ? datos.movimientos : [];
    metas = Array.isArray(datos.metas) ? datos.metas : [];
    operacionesAhorro = Array.isArray(datos.operacionesAhorro)
      ? datos.operacionesAhorro
      : [];
    presupuestos = Array.isArray(datos.presupuestos) ? datos.presupuestos : [];
    recurrentes = Array.isArray(datos.recurrentes) ? datos.recurrentes : [];

    if (datos.configuracion && typeof datos.configuracion === "object") {
      configuracion = {
        ...configuracion,
        ...datos.configuracion
      };
    }

    guardarDatos();
    aplicarIdioma();
    actualizarTodo();

    alert(texto("importSuccess"));
  } catch (error) {
    console.error(error);
    alert(texto("importError"));
  }

  evento.target.value = "";
});

/* =========================================================
   ACTUALIZAR TODA LA APLICACIÓN
   ========================================================= */

function actualizarTodo() {
  aplicarIdioma();
  actualizarInicio();
  actualizarMovimientos();
  actualizarAhorros();
  actualizarPresupuestos();
  actualizarRecurrentes();
  actualizarConfiguracionUI();
  actualizarEstadisticas();
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function iniciarAplicacion() {
  const hoy = fechaLocal();

  const camposFecha = [
    "mov-fecha",
    "ahorro-fecha-movimiento"
  ];

  camposFecha.forEach(id => {
    const campo = document.getElementById(id);
    if (campo && !campo.value) campo.value = hoy;
  });

  const camposMes = [
    "filtro-mes-inicio",
    "filtro-mes-movimientos",
    "estadisticas-mes"
  ];

  camposMes.forEach(id => {
    const campo = document.getElementById(id);
    if (campo && !campo.value) campo.value = mesActual();
  });

  guardarDatos();
  actualizarTodo();

  /*
    Si no existen tasas automáticas para la moneda principal,
    se mantienen las tasas manuales disponibles.
    La consulta automática puede realizarse desde Configuración.
  */
}

iniciarAplicacion();
