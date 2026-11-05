
"use strict";

/* =========================================================
   MIS FINANZAS - MOTOR PRINCIPAL
   Versión ampliada:
   - Ingresos, gastos, ahorros y presupuesto
   - Movimientos recurrentes
   - Deudas por cobrar y pagar
   - Abonos e historial
   - Metas financieras
   - Alertas financieras
   - Asistente financiero
   - Filtros y comparación mensual
   - Importación y exportación de respaldos
   - Monedas e idiomas ES/EN
   - Guía interactiva
   ========================================================= */

const $ = id => document.getElementById(id);

const CURRENCIES = ["CRC", "USD", "EUR", "MXN", "GBP", "BRL", "COP", "CAD"];

const CURRENCY_NAMES = {
  CRC: "Colón costarricense",
  USD: "Dólar estadounidense",
  EUR: "Euro",
  MXN: "Peso mexicano",
  GBP: "Libra esterlina",
  BRL: "Real brasileño",
  COP: "Peso colombiano",
  CAD: "Dólar canadiense"
};

const TEXT = {
  es: {
    appTitle: "Mis Finanzas",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorros",
    budget: "Presupuesto",
    movements: "Movimientos",
    statistics: "Estadísticas",
    tips: "Consejos financieros",
    settings: "Configuración",
    more: "Más",
    home: "Inicio",
    currency: "Moneda",
    amount: "Monto",
    description: "Descripción",
    category: "Categoría",
    date: "Fecha",
    history: "Historial",
    delete: "Eliminar",
    availableMoney: "Dinero disponible",
    totalBalance: "Balance total",
    availableDescription: "Ingresos menos gastos y ahorros, más los abonos recibidos y menos los pagos de deudas.",
    recentMovements: "Movimientos recientes",
    seeAll: "Ver todos",
    newMovement: "Nuevo movimiento",
    movementType: "Tipo de movimiento",
    saveMovement: "Guardar movimiento",
    savingDescription: "Construye tus metas financieras.",
    totalSaved: "Total ahorrado",
    registerSaving: "Registrar ahorro",
    savingGoal: "Nombre del ahorro o meta",
    saveSaving: "Guardar ahorro",
    savingHistory: "Historial de ahorros",
    budgetDescription: "Establece límites para tus gastos.",
    monthlyBudget: "Presupuesto mensual",
    budgetAmount: "Monto del presupuesto",
    saveBudget: "Guardar presupuesto",
    budgetProgress: "Uso del presupuesto",
    spent: "Gastado",
    remaining: "Restante",
    recurring: "Movimientos recurrentes",
    recurringDescription: "Organiza tus pagos e ingresos frecuentes.",
    frequency: "Frecuencia",
    monthly: "Mensual",
    weekly: "Semanal",
    yearly: "Anual",
    saveRecurring: "Guardar recurrente",
    statisticsDescription: "Un resumen de tus finanzas.",
    netBalance: "Balance neto",
    expenseDistribution: "Distribución de gastos",
    tipsDescription: "Pequeños hábitos para mejorar tus finanzas.",
    tip1Title: "Págate primero",
    tip1Text: "Aparta una parte de tus ingresos para ahorrar antes de gastar.",
    tip2Title: "Define metas",
    tip2Text: "Divide tus objetivos de ahorro en cantidades pequeñas y alcanzables.",
    tip3Title: "Controla tu presupuesto",
    tip3Text: "Revisa tus gastos cada semana y ajusta tus límites cuando sea necesario.",
    tip4Title: "Reduce gastos hormiga",
    tip4Text: "Identifica compras pequeñas y frecuentes que afectan tu dinero.",
    tip5Title: "Crea un fondo de emergencia",
    tip5Text: "Construye una reserva para imprevistos y evita depender del crédito.",
    tip6Title: "Atiende tus deudas",
    tip6Text: "Prioriza las deudas con intereses altos y evita nuevos compromisos innecesarios.",
    settingsDescription: "Personaliza tu aplicación.",
    language: "Idioma",
    mainCurrency: "Moneda principal",
    exchangeRates: "Tipos de cambio",
    exchangeDescription: "La aplicación puede consultar tasas automáticas o utilizar tasas manuales.",
    automatic: "Automático",
    manual: "Manual",
    both: "Ambos",
    updateRates: "Actualizar tipos de cambio",
    manualRates: "Tasas manuales",
    manualRatesDescription: "Indica cuánto vale una unidad de cada moneda en CRC.",
    saveRates: "Guardar tasas manuales",
    dataManagement: "Datos",
    dataDescription: "Tus registros se guardan localmente en este dispositivo.",
    exportData: "Exportar copia de datos",
    moreDescription: "Otras herramientas de Mis Finanzas.",
    catSalary: "Salario",
    catBusiness: "Negocio",
    catFood: "Alimentación",
    catHousing: "Vivienda",
    catTransport: "Transporte",
    catHealth: "Salud",
    catEntertainment: "Entretenimiento",
    catDebt: "Deudas",
    catOther: "Otros",
    noMovements: "Todavía no tienes movimientos registrados.",
    noSavings: "Todavía no tienes ahorros registrados.",
    noRecurring: "Todavía no tienes movimientos recurrentes.",
    confirmDelete: "¿Deseas borrar este registro?",
    confirmClear: "¿Deseas borrar todo el historial de movimientos?",
    saved: "Registro guardado correctamente.",
    budgetSaved: "Presupuesto guardado.",
    ratesSaved: "Tipos de cambio manuales guardados.",
    ratesUpdated: "Tipos de cambio actualizados.",
    ratesError: "No se pudieron actualizar las tasas. Puedes utilizar las tasas manuales.",
    manualRateMissing: "Falta un tipo de cambio manual válido para ",
    exported: "Copia de datos descargada.",
    imported: "Datos importados correctamente.",
    importError: "No se pudo importar el archivo. Comprueba que sea un respaldo válido.",
    deleted: "Registro eliminado.",
    emptyBudget: "Configura tu presupuesto mensual.",
    conversionUnavailable: "No se pudo calcular una conversión.",
    recurringSaved: "Movimiento recurrente guardado.",
    monthlyShort: "Mensual",
    today: "Hoy",
    rateStatus: "Última actualización: ",
    loading: "Consultando tipos de cambio...",
    rateSource: "Tasas de referencia consultadas en línea.",
    baseCurrency: "Moneda base",
    hello: "¡Hola!",
    helloName: "¡Hola, {name}!",
    personalization: "Personalización",
    yourName: "Tu nombre",
    saveName: "Guardar nombre",
    nameSaved: "Nombre guardado correctamente.",
    exit: "Salir de la aplicación",
    confirmExit: "¿Deseas salir de Mis Finanzas?",
    exitHelp: "Para cerrar la aplicación, utiliza el botón de inicio o las aplicaciones recientes de Android.",

    debts: "Deudas",
    debtsDescription: "Controla el dinero que te deben y el que debes pagar.",
    totalReceivable: "Total por cobrar",
    totalPayable: "Total por pagar",
    newDebt: "Registrar deuda",
    debtType: "Tipo de deuda",
    receivable: "Por cobrar",
    payable: "Por pagar",
    debtPerson: "Persona o entidad",
    originalAmount: "Monto original",
    creationDate: "Fecha de creación",
    dueDate: "Fecha de vencimiento",
    notes: "Notas",
    saveDebt: "Guardar deuda",
    receivableDebts: "Deudas por cobrar",
    receivableDescription: "Dinero que otras personas o entidades te deben.",
    payableDebts: "Deudas por pagar",
    payableDescription: "Dinero que debes a otras personas o entidades.",
    noDebts: "Todavía no tienes deudas registradas.",
    pending: "Pendiente",
    paid: "Pagada",
    overdue: "Vencida",
    debtBalance: "Saldo pendiente",
    debtOriginal: "Monto original",
    debtPaid: "Abonado",
    addPayment: "Registrar abono",
    paymentAmount: "Monto del abono",
    paymentDate: "Fecha del abono",
    paymentNotes: "Detalle del abono",
    paymentHistory: "Historial de abonos",
    noPayments: "Todavía no hay abonos registrados.",
    paymentSaved: "Abono registrado correctamente.",
    debtSaved: "Deuda registrada correctamente.",
    paymentTooHigh: "El abono no puede superar el saldo pendiente.",
    invalidPayment: "Introduce un monto de abono válido.",
    invalidDebt: "Revisa el monto y los datos de la deuda.",
    confirmDeleteDebt: "¿Deseas eliminar esta deuda y su historial de abonos?",
    debtDeleted: "Deuda eliminada.",
    debtPersonRequired: "Introduce una persona o entidad.",
    debtNoDueDate: "Sin vencimiento",
    debtProgress: "Progreso de pago",

    goals: "Metas financieras",
    goalsDescription: "Define objetivos y sigue tu progreso.",
    newGoal: "Crear nueva meta",
    goalName: "Nombre de la meta",
    goalDescription: "Descripción de la meta",
    goalAmount: "Monto objetivo",
    goalDate: "Fecha objetivo",
    saveGoal: "Guardar meta",
    noGoals: "Todavía no tienes metas registradas.",
    goalProgress: "Progreso",
    goalCurrent: "Acumulado",
    goalRemaining: "Falta",
    addGoalContribution: "Registrar aporte",
    goalContribution: "Monto del aporte",
    goalContributionSaved: "Aporte registrado correctamente.",
    goalSaved: "Meta creada correctamente.",
    goalDeleted: "Meta eliminada.",
    confirmDeleteGoal: "¿Deseas eliminar esta meta?",
    goalCompleted: "Meta completada",
    goalOverdue: "Fecha objetivo superada",

    alerts: "Alertas financieras",
    noAlerts: "No hay alertas por ahora.",
    assistant: "Asistente financiero",
    assistantDescription: "Un análisis de tus registros para ayudarte a tomar decisiones.",
    assistantEmpty: "Registra algunos movimientos para recibir recomendaciones.",
    monthlyComparison: "Comparación mensual",
    currentMonth: "Este mes",
    previousMonth: "Mes anterior",
    filterSearch: "Buscar movimiento...",
    allTypes: "Todos los tipos",
    allCategories: "Todas las categorías",
    allMonths: "Todos los meses",
    clearFilters: "Limpiar filtros",
    allStatuses: "Todos los estados",
    searchDebt: "Buscar persona o entidad...",
    noFilterResults: "No hay resultados para estos filtros.",
    guide: "Guía de uso",
    guideWelcomeTitle: "¡Bienvenido a Mis Finanzas!",
    guideWelcomeText: "Aprende a organizar tu dinero paso a paso.",
    guideIncomeTitle: "1. Registra tus ingresos",
    guideIncomeText: "Anota tu salario, ingresos de negocios u otras entradas de dinero.",
    guideExpensesTitle: "2. Controla tus gastos",
    guideExpensesText: "Registra tus compras, pagos y gastos diarios.",
    guideSavingsTitle: "3. Construye tus ahorros 🐷",
    guideSavingsText: "Registra el dinero que apartas para tus objetivos.",
    guideBudgetTitle: "4. Organiza tu presupuesto",
    guideBudgetText: "Define cuánto puedes gastar al mes.",
    guideCurrencyTitle: "5. Utiliza diferentes monedas",
    guideCurrencyText: "Configura tu moneda principal y los tipos de cambio.",
    guideDebtsTitle: "6. Controla tus deudas",
    guideDebtsText: "Registra lo que te deben y lo que debes. Añade abonos parciales e historial.",
    guideGoalsTitle: "7. Define tus metas",
    guideGoalsText: "Crea objetivos, establece montos y fechas, y registra tus aportes.",
    guideAssistantTitle: "8. Utiliza el asistente",
    guideAssistantText: "Consulta alertas y recomendaciones basadas en tus registros.",
    guideFiltersTitle: "9. Busca y compara",
    guideFiltersText: "Filtra movimientos y compara tus resultados mensuales.",
    guideFinishTitle: "¡Todo listo!",
    guideFinishText: "Ya conoces las herramientas principales. Empieza a organizar tus finanzas.",
    guideNext: "Siguiente",
    guidePrevious: "Anterior",
    guideSkip: "Omitir guía",
    guideStart: "Comenzar a usar Mis Finanzas",
    guideStep: "Paso"
  },

  en: {
    appTitle: "My Finances",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    budget: "Budget",
    movements: "Transactions",
    statistics: "Statistics",
    tips: "Financial tips",
    settings: "Settings",
    more: "More",
    home: "Home",
    currency: "Currency",
    amount: "Amount",
    description: "Description",
    category: "Category",
    date: "Date",
    history: "History",
    delete: "Delete",
    availableMoney: "Available money",
    totalBalance: "Total balance",
    availableDescription: "Income minus expenses and savings, plus debt payments received and minus debt payments made.",
    recentMovements: "Recent transactions",
    seeAll: "See all",
    newMovement: "New transaction",
    movementType: "Transaction type",
    saveMovement: "Save transaction",
    savingDescription: "Build your financial goals.",
    totalSaved: "Total saved",
    registerSaving: "Record savings",
    savingGoal: "Savings name or goal",
    saveSaving: "Save savings",
    savingHistory: "Savings history",
    budgetDescription: "Set limits for your expenses.",
    monthlyBudget: "Monthly budget",
    budgetAmount: "Budget amount",
    saveBudget: "Save budget",
    budgetProgress: "Budget usage",
    spent: "Spent",
    remaining: "Remaining",
    recurring: "Recurring transactions",
    recurringDescription: "Organize your regular income and payments.",
    frequency: "Frequency",
    monthly: "Monthly",
    weekly: "Weekly",
    yearly: "Yearly",
    saveRecurring: "Save recurring item",
    statisticsDescription: "An overview of your finances.",
    netBalance: "Net balance",
    expenseDistribution: "Expense distribution",
    tipsDescription: "Small habits to improve your finances.",
    tip1Title: "Pay yourself first",
    tip1Text: "Set aside part of your income for savings before spending.",
    tip2Title: "Set goals",
    tip2Text: "Break your savings goals into small, achievable amounts.",
    tip3Title: "Track your budget",
    tip3Text: "Review your expenses weekly and adjust your limits when needed.",
    tip4Title: "Reduce small expenses",
    tip4Text: "Identify small, frequent purchases that affect your money.",
    tip5Title: "Build an emergency fund",
    tip5Text: "Build a reserve for unexpected expenses.",
    tip6Title: "Manage your debts",
    tip6Text: "Prioritize high-interest debts and avoid unnecessary commitments.",
    settingsDescription: "Customize your application.",
    language: "Language",
    mainCurrency: "Main currency",
    exchangeRates: "Exchange rates",
    exchangeDescription: "The app can retrieve automatic rates or use manual rates.",
    automatic: "Automatic",
    manual: "Manual",
    both: "Both",
    updateRates: "Update exchange rates",
    manualRates: "Manual rates",
    manualRatesDescription: "Enter how much one unit of each currency is worth in CRC.",
    saveRates: "Save manual rates",
    dataManagement: "Data",
    dataDescription: "Your records are stored locally on this device.",
    exportData: "Export data backup",
    moreDescription: "Other My Finances tools.",
    catSalary: "Salary",
    catBusiness: "Business",
    catFood: "Food",
    catHousing: "Housing",
    catTransport: "Transport",
    catHealth: "Health",
    catEntertainment: "Entertainment",
    catDebt: "Debt",
    catOther: "Other",
    noMovements: "You have no transactions yet.",
    noSavings: "You have no savings recorded yet.",
    noRecurring: "You have no recurring transactions yet.",
    confirmDelete: "Do you want to delete this record?",
    confirmClear: "Do you want to clear all transaction history?",
    saved: "Record saved successfully.",
    budgetSaved: "Budget saved.",
    ratesSaved: "Manual exchange rates saved.",
    ratesUpdated: "Exchange rates updated.",
    ratesError: "Exchange rates could not be updated.",
    manualRateMissing: "A valid exchange rate is missing for ",
    exported: "Data backup downloaded.",
    imported: "Data imported successfully.",
    importError: "The file could not be imported. Check that it is a valid backup.",
    deleted: "Record deleted.",
    emptyBudget: "Set your monthly budget.",
    conversionUnavailable: "Conversion could not be calculated.",
    recurringSaved: "Recurring transaction saved.",
    monthlyShort: "Monthly",
    today: "Today",
    rateStatus: "Last updated: ",
    loading: "Retrieving exchange rates...",
    rateSource: "Reference rates retrieved online.",
    baseCurrency: "Base currency",
    hello: "Hello!",
    helloName: "Hello, {name}!",
    personalization: "Personalization",
    yourName: "Your name",
    saveName: "Save name",
    nameSaved: "Name saved successfully.",
    exit: "Exit application",
    confirmExit: "Do you want to exit My Finances?",
    exitHelp: "Use the Android Home button or Recent Apps screen to close the app.",

    debts: "Debts",
    debtsDescription: "Track money owed to you and money you need to pay.",
    totalReceivable: "Total receivable",
    totalPayable: "Total payable",
    newDebt: "Register debt",
    debtType: "Debt type",
    receivable: "Receivable",
    payable: "Payable",
    debtPerson: "Person or entity",
    originalAmount: "Original amount",
    creationDate: "Creation date",
    dueDate: "Due date",
    notes: "Notes",
    saveDebt: "Save debt",
    receivableDebts: "Receivable debts",
    receivableDescription: "Money that others owe you.",
    payableDebts: "Payable debts",
    payableDescription: "Money you owe to others.",
    noDebts: "You have no debts recorded yet.",
    pending: "Pending",
    paid: "Paid",
    overdue: "Overdue",
    debtBalance: "Outstanding balance",
    debtOriginal: "Original amount",
    debtPaid: "Paid",
    addPayment: "Record payment",
    paymentAmount: "Payment amount",
    paymentDate: "Payment date",
    paymentNotes: "Payment details",
    paymentHistory: "Payment history",
    noPayments: "No payments recorded yet.",
    paymentSaved: "Payment recorded successfully.",
    debtSaved: "Debt recorded successfully.",
    paymentTooHigh: "Payment cannot exceed the outstanding balance.",
    invalidPayment: "Enter a valid payment amount.",
    invalidDebt: "Check the debt amount and details.",
    confirmDeleteDebt: "Delete this debt and its payment history?",
    debtDeleted: "Debt deleted.",
    debtPersonRequired: "Enter a person or entity.",
    debtNoDueDate: "No due date",
    debtProgress: "Payment progress",

    goals: "Financial goals",
    goalsDescription: "Set objectives and track your progress.",
    newGoal: "Create a new goal",
    goalName: "Goal name",
    goalDescription: "Goal description",
    goalAmount: "Target amount",
    goalDate: "Target date",
    saveGoal: "Save goal",
    noGoals: "You have no goals recorded yet.",
    goalProgress: "Progress",
    goalCurrent: "Accumulated",
    goalRemaining: "Remaining",
    addGoalContribution: "Record contribution",
    goalContribution: "Contribution amount",
    goalContributionSaved: "Contribution recorded.",
    goalSaved: "Goal created successfully.",
    goalDeleted: "Goal deleted.",
    confirmDeleteGoal: "Delete this goal?",
    goalCompleted: "Goal completed",
    goalOverdue: "Target date passed",

    alerts: "Financial alerts",
    noAlerts: "No alerts right now.",
    assistant: "Financial assistant",
    assistantDescription: "An analysis of your records to help you make decisions.",
    assistantEmpty: "Record some transactions to receive recommendations.",
    monthlyComparison: "Monthly comparison",
    currentMonth: "This month",
    previousMonth: "Previous month",
    filterSearch: "Search transactions...",
    allTypes: "All types",
    allCategories: "All categories",
    allMonths: "All months",
    clearFilters: "Clear filters",
    allStatuses: "All statuses",
    searchDebt: "Search person or entity...",
    noFilterResults: "No results for these filters.",
    guide: "User guide",
    guideWelcomeTitle: "Welcome to My Finances!",
    guideWelcomeText: "Learn to organize your money step by step.",
    guideIncomeTitle: "1. Record your income",
    guideIncomeText: "Record your salary, business income, or other money received.",
    guideExpensesTitle: "2. Track your expenses",
    guideExpensesText: "Record your purchases, bills, and daily expenses.",
    guideSavingsTitle: "3. Build your savings 🐷",
    guideSavingsText: "Record the money you set aside for your goals.",
    guideBudgetTitle: "4. Organize your budget",
    guideBudgetText: "Set how much you can spend each month.",
    guideCurrencyTitle: "5. Use different currencies",
    guideCurrencyText: "Set your main currency and exchange rates.",
    guideDebtsTitle: "6. Manage your debts",
    guideDebtsText: "Record money owed to you and money you owe. Add partial payments and history.",
    guideGoalsTitle: "7. Set your goals",
    guideGoalsText: "Create objectives, set amounts and dates, and record contributions.",
    guideAssistantTitle: "8. Use the assistant",
    guideAssistantText: "Review alerts and recommendations based on your records.",
    guideFiltersTitle: "9. Search and compare",
    guideFiltersText: "Filter transactions and compare monthly results.",
    guideFinishTitle: "You're all set!",
    guideFinishText: "You now know the main features. Start organizing your finances.",
    guideNext: "Next",
    guidePrevious: "Previous",
    guideSkip: "Skip guide",
    guideStart: "Start using My Finances",
    guideStep: "Step"
  }
};

const DEFAULT_STATE = {
  language: "es",
  baseCurrency: "CRC",
  exchangeMode: "both",
  userName: "",
  movements: [],
  savings: [],
  recurring: [],
  debts: [],
  goals: [],
  budget: { amount: 0, currency: "CRC" },
  manualRates: {
    CRC: 1, USD: 500, EUR: 540, MXN: 29,
    GBP: 630, BRL: 95, COP: 0.12, CAD: 360
  },
  onlineRates: null,
  ratesUpdatedAt: null
};

let state = loadState();
let currentSection = "inicio";

function cloneDefault() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("misFinanzasData"));

    if (!stored || typeof stored !== "object") return cloneDefault();

    return {
      ...cloneDefault(),
      ...stored,
      movements: Array.isArray(stored.movements) ? stored.movements : [],
      savings: Array.isArray(stored.savings) ? stored.savings : [],
      recurring: Array.isArray(stored.recurring) ? stored.recurring : [],
      debts: Array.isArray(stored.debts) ? stored.debts : [],
      goals: Array.isArray(stored.goals) ? stored.goals : [],
      budget: { ...DEFAULT_STATE.budget, ...(stored.budget || {}) },
      manualRates: { ...DEFAULT_STATE.manualRates, ...(stored.manualRates || {}) }
    };
  } catch (error) {
    return cloneDefault();
  }
}

function saveState() {
  try {
    localStorage.setItem("misFinanzasData", JSON.stringify(state));
  } catch (error) {
    showToast("No se pudieron guardar los datos. Comprueba el espacio disponible.");
  }
}

function t(key) {
  return TEXT[state.language]?.[key] || TEXT.es[key] || key;
}

function todayISO() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[char]);
}

function dateText(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat(
    state.language === "en" ? "en-US" : "es-CR"
  ).format(new Date(date + "T12:00:00"));
}

function formatMoney(amount, currency = state.baseCurrency) {
  amount = Number(amount);
  if (!Number.isFinite(amount)) amount = 0;

  try {
    return new Intl.NumberFormat(
      state.language === "en" ? "en-US" : "es-CR",
      {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "COP" ? 0 : 2
      }
    ).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* =========================================================
   MONEDAS Y CONVERSIONES
   ========================================================= */

function currencyOptions() {
  return CURRENCIES.map(code =>
    `<option value="${code}">${code} - ${CURRENCY_NAMES[code]}</option>`
  ).join("");
}

function setupCurrencies() {
  document.querySelectorAll(".currency-select").forEach(select => {
    select.innerHTML = currencyOptions();
    select.value = state.baseCurrency;
  });

  if ($("moneda-principal")) {
    $("moneda-principal").innerHTML = currencyOptions();
    $("moneda-principal").value = state.baseCurrency;
  }

  if ($("moneda-presupuesto")) {
    $("moneda-presupuesto").value = state.budget.currency;
  }

  ["fecha-movimiento", "fecha-ahorro", "fecha-creacion-deuda"].forEach(id => {
    if ($(id)) $(id).value = todayISO();
  });
}

function exchangeRate(currency) {
  if (currency === "CRC") return 1;

  const automatic = Number(state.onlineRates?.[currency]);
  const manual = Number(state.manualRates[currency]);

  if (state.exchangeMode === "automatic") {
    return automatic > 0 ? automatic : null;
  }

  if (state.exchangeMode === "manual") {
    return manual > 0 ? manual : null;
  }

  return manual > 0 ? manual : automatic > 0 ? automatic : null;
}

function convertToCRC(amount, currency) {
  if (currency === "CRC") return Number(amount);

  const rate = exchangeRate(currency);
  if (!rate || !Number.isFinite(rate)) return null;

  return Number(amount) * rate;
}

function convertToBase(amount, currency) {
  const crc = convertToCRC(amount, currency);
  if (crc === null) return null;

  if (state.baseCurrency === "CRC") return crc;

  const baseRate = exchangeRate(state.baseCurrency);
  if (!baseRate) return null;

  return crc / baseRate;
}

function sumConverted(items, currencyField = "currency", amountField = "amount") {
  return items.reduce((total, item) => {
    const value = convertToBase(
      Number(item[amountField]),
      item[currencyField] || state.baseCurrency
    );
    return total + (value === null ? 0 : value);
  }, 0);
}

/* =========================================================
   TRADUCCIÓN
   ========================================================= */

function translatePage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (TEXT[state.language][key]) element.textContent = t(key);
  });

  if ($("selector-idioma")) $("selector-idioma").value = state.language;
  if ($("moneda-principal")) $("moneda-principal").value = state.baseCurrency;
  if ($("nombre-usuario")) $("nombre-usuario").value = state.userName || "";

  document.title = t("appTitle");

  const guideButton = $("boton-guia-uso");
  if (guideButton) guideButton.textContent = "📖 " + t("guide");

  if ($("mf-guide-overlay") && !$("mf-guide-overlay").hidden) {
    renderGuideStep();
  }

  renderAll();
}

/* =========================================================
   GUÍA INTERACTIVA
   ========================================================= */

const GUIDE_STORAGE_KEY = "misFinanzasGuideSeen";
let guideStep = 0;

const GUIDE_STEPS = [
  ["👋", "guideWelcomeTitle", "guideWelcomeText"],
  ["💰", "guideIncomeTitle", "guideIncomeText"],
  ["🧾", "guideExpensesTitle", "guideExpensesText"],
  ["🐷", "guideSavingsTitle", "guideSavingsText"],
  ["📊", "guideBudgetTitle", "guideBudgetText"],
  ["💱", "guideCurrencyTitle", "guideCurrencyText"],
  ["💳", "guideDebtsTitle", "guideDebtsText"],
  ["🎯", "guideGoalsTitle", "guideGoalsText"],
  ["🤖", "guideAssistantTitle", "guideAssistantText"],
  ["🔎", "guideFiltersTitle", "guideFiltersText"],
  ["🎉", "guideFinishTitle", "guideFinishText"]
];

function setupGuide() {
  if (!$("mf-guide-overlay")) {
    const style = document.createElement("style");
    style.textContent = `
      .mf-guide-overlay{position:fixed;inset:0;z-index:99999;background:rgba(17,24,39,.72);display:flex;align-items:center;justify-content:center;padding:18px}
      .mf-guide-overlay[hidden]{display:none!important}
      .mf-guide-card{width:100%;max-width:430px;background:#fff;color:#202938;border-radius:22px;padding:28px 22px 22px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.22)}
      .mf-guide-icon{font-size:48px;margin-bottom:16px}
      .mf-guide-card h2{font-size:22px;margin:0 0 12px;color:#111827}
      .mf-guide-card p{font-size:15px;line-height:1.6;color:#657080;margin:0 0 22px}
      .mf-guide-progress{height:6px;background:#e7ebf0;border-radius:10px;overflow:hidden;margin-bottom:12px}
      .mf-guide-progress span{display:block;height:100%;background:#159b70}
      .mf-guide-step{display:block;color:#7b8493;font-size:12px;margin-bottom:20px}
      .mf-guide-actions{display:flex;gap:9px;justify-content:space-between;flex-wrap:wrap}
      .mf-guide-actions button{border:0;border-radius:12px;padding:12px 15px;font-size:14px;font-weight:600;cursor:pointer}
      .mf-guide-primary{background:#111827;color:white;flex:1}
      .mf-guide-secondary{background:#f0f2f5;color:#374151}
      .mf-guide-skip{display:block;margin:17px auto 0;border:0;background:none;color:#7b8493;font-size:13px;cursor:pointer}
      .mf-guide-open-button{display:block;width:100%;margin-top:14px;padding:14px;border:1px solid #e7ebf0;border-radius:12px;background:white;color:#202938;font-size:15px;font-weight:600;text-align:left;cursor:pointer}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "mf-guide-overlay";
    overlay.className = "mf-guide-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="mf-guide-card" role="dialog" aria-modal="true">
        <div class="mf-guide-icon" id="mf-guide-icon"></div>
        <h2 id="mf-guide-title"></h2>
        <p id="mf-guide-text"></p>
        <div class="mf-guide-progress"><span id="mf-guide-progress"></span></div>
        <small class="mf-guide-step" id="mf-guide-step"></small>
        <div class="mf-guide-actions">
          <button type="button" class="mf-guide-secondary" id="mf-guide-previous"></button>
          <button type="button" class="mf-guide-primary" id="mf-guide-next"></button>
        </div>
        <button type="button" class="mf-guide-skip" id="mf-guide-skip"></button>
      </div>
    `;
    document.body.appendChild(overlay);

    $("mf-guide-next").addEventListener("click", nextGuideStep);
    $("mf-guide-previous").addEventListener("click", previousGuideStep);
    $("mf-guide-skip").addEventListener("click", finishGuide);

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !$("mf-guide-overlay").hidden) finishGuide();
    });
  }

  if ($("mas") && !$("boton-guia-uso")) {
    const button = document.createElement("button");
    button.id = "boton-guia-uso";
    button.type = "button";
    button.className = "mf-guide-open-button";
    button.textContent = "📖 " + t("guide");
    button.addEventListener("click", openGuide);
    $("mas").appendChild(button);
  }

  if (!localStorage.getItem(GUIDE_STORAGE_KEY)) {
    setTimeout(openGuide, 500);
  }
}

function openGuide() {
  guideStep = 0;
  if (!$("mf-guide-overlay")) return;
  $("mf-guide-overlay").hidden = false;
  renderGuideStep();
}

function renderGuideStep() {
  const step = GUIDE_STEPS[guideStep];
  const last = guideStep === GUIDE_STEPS.length - 1;

  $("mf-guide-icon").textContent = step[0];
  $("mf-guide-title").textContent = t(step[1]);
  $("mf-guide-text").textContent = t(step[2]);
  $("mf-guide-progress").style.width =
    `${((guideStep + 1) / GUIDE_STEPS.length) * 100}%`;
  $("mf-guide-step").textContent =
    `${t("guideStep")} ${guideStep + 1} / ${GUIDE_STEPS.length}`;
  $("mf-guide-previous").textContent = t("guidePrevious");
  $("mf-guide-previous").hidden = guideStep === 0;
  $("mf-guide-next").textContent = last ? t("guideStart") : t("guideNext");
  $("mf-guide-skip").textContent = t("guideSkip");
}

function nextGuideStep() {
  if (guideStep < GUIDE_STEPS.length - 1) {
    guideStep++;
    renderGuideStep();
  } else {
    finishGuide();
  }
}

function previousGuideStep() {
  if (guideStep > 0) {
    guideStep--;
    renderGuideStep();
  }
}

function finishGuide() {
  localStorage.setItem(GUIDE_STORAGE_KEY, "true");
  if ($("mf-guide-overlay")) $("mf-guide-overlay").hidden = true;
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function showSection(sectionId, options = {}) {
  const target = $(sectionId);
  if (!target || !target.classList.contains("page-section")) return;

  const previous = currentSection;

  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.toggle("active", section.id === sectionId);
  });

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle("active", button.dataset.section === sectionId);
  });

  currentSection = sectionId;

  if (!options.skipHistory && previous !== sectionId) {
    history.pushState({ mfSection: sectionId }, "", location.href);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAll();
}

function setupNavigation() {
  history.replaceState({ mfSection: "inicio" }, "", location.href);

  document.addEventListener("click", event => {
    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      showSection(sectionButton.dataset.section);
      return;
    }

    const quickButton = event.target.closest("[data-quick]");
    if (quickButton) {
      const type = quickButton.dataset.quick;
      showSection(type === "saving" ? "ahorros" : "movimientos");

      if (type !== "saving" && $("tipo-movimiento")) {
        $("tipo-movimiento").value = type;
        $("descripcion-movimiento").focus();
      } else if ($("nombre-ahorro")) {
        $("nombre-ahorro").focus();
      }
    }
  });

  if ($("header-settings")) {
    $("header-settings").addEventListener("click", () => showSection("configuracion"));
  }

  if ($("home-title")) {
    $("home-title").addEventListener("click", () => showSection("inicio"));
  }

  if ($("boton-mas")) {
    $("boton-mas").addEventListener("click", () => showSection("mas"));
  }

  window.addEventListener("popstate", event => {
    const previous = event.state?.mfSection;
    if (previous && $(previous)?.classList.contains("page-section")) {
      showSection(previous, { skipHistory: true });
    } else {
      showSection("inicio", { skipHistory: true });
      history.pushState({ mfSection: "inicio" }, "", location.href);
    }
  });
}

/* =========================================================
   INGRESOS Y GASTOS
   ========================================================= */

function addMovement(event) {
  event.preventDefault();

  const amount = Number($("monto-movimiento").value);
  const currency = $("moneda-movimiento").value;

  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t("conversionUnavailable"));
    return;
  }

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.movements.unshift({
    id: crypto.randomUUID(),
    type: $("tipo-movimiento").value,
    description: $("descripcion-movimiento").value.trim(),
    amount,
    currency,
    category: $("categoria-movimiento").value,
    date: $("fecha-movimiento").value || todayISO(),
    createdAt: Date.now()
  });

  saveState();
  $("form-movimiento").reset();
  $("fecha-movimiento").value = todayISO();
  $("moneda-movimiento").value = state.baseCurrency;
  renderAll();
  showToast(t("saved"));
}

/* =========================================================
   AHORROS
   ========================================================= */

function addSaving(event) {
  event.preventDefault();

  const amount = Number($("monto-ahorro").value);
  const currency = $("moneda-ahorro").value;

  if (!Number.isFinite(amount) || amount <= 0) return;

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.savings.unshift({
    id: crypto.randomUUID(),
    name: $("nombre-ahorro").value.trim(),
    amount,
    currency,
    date: $("fecha-ahorro").value || todayISO(),
    createdAt: Date.now()
  });

  saveState();
  $("form-ahorro").reset();
  $("fecha-ahorro").value = todayISO();
  $("moneda-ahorro").value = state.baseCurrency;
  renderAll();
  showToast(t("saved"));
}

/* =========================================================
   PRESUPUESTO
   ========================================================= */

function saveBudget(event) {
  event.preventDefault();

  const amount = Number($("monto-presupuesto").value);
  const currency = $("moneda-presupuesto").value;

  if (!Number.isFinite(amount) || amount < 0) return;

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.budget = { amount, currency };
  saveState();
  renderAll();
  showToast(t("budgetSaved"));
}

/* =========================================================
   MOVIMIENTOS RECURRENTES
   ========================================================= */

function addRecurring(event) {
  event.preventDefault();

  const amount = Number($("monto-recurrente").value);
  const currency = $("moneda-recurrente").value;

  if (!Number.isFinite(amount) || amount <= 0) return;

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.recurring.unshift({
    id: crypto.randomUUID(),
    description: $("descripcion-recurrente").value.trim(),
    type: $("tipo-recurrente").value,
    amount,
    currency,
    frequency: $("frecuencia-recurrente").value
  });

  saveState();
  $("form-recurrente").reset();
  $("moneda-recurrente").value = state.baseCurrency;
  renderAll();
  showToast(t("recurringSaved"));
}

/* =========================================================
   DEUDAS
   ========================================================= */

function debtStatus(debt) {
  if (Number(debt.remaining) <= 0.000001) return "paid";
  if (debt.dueDate && debt.dueDate < todayISO()) return "overdue";
  return "pending";
}

function debtTotalPaid(debt) {
  return (debt.payments || []).reduce(
    (total, payment) => total + Number(payment.amount || 0), 0
  );
}

function addDebt(event) {
  event.preventDefault();

  const person = $("persona-deuda").value.trim();
  const amount = Number($("monto-deuda").value);
  const currency = $("moneda-deuda").value;
  const type = $("tipo-deuda").value;

  if (!person) {
    showToast(t("debtPersonRequired"));
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0 ||
      !["receivable", "payable"].includes(type)) {
    showToast(t("invalidDebt"));
    return;
  }

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.debts.unshift({
    id: crypto.randomUUID(),
    type,
    person,
    description: $("descripcion-deuda").value.trim(),
    amount,
    remaining: amount,
    currency,
    createdDate: $("fecha-creacion-deuda").value || todayISO(),
    dueDate: $("fecha-vencimiento-deuda").value,
    notes: $("notas-deuda").value.trim(),
    payments: [],
    createdAt: Date.now()
  });

  saveState();
  $("form-deuda").reset();
  $("fecha-creacion-deuda").value = todayISO();
  $("moneda-deuda").value = state.baseCurrency;
  renderAll();
  showToast(t("debtSaved"));
}

function addDebtPayment(debtId) {
  const debt = state.debts.find(item => item.id === debtId);
  if (!debt || debtStatus(debt) === "paid") return;

  const amountText = prompt(
    `${t("paymentAmount")} (${debt.currency})\n${t("debtBalance")}: ${formatMoney(debt.remaining, debt.currency)}`
  );

  if (amountText === null) return;

  const amount = Number(amountText.replace(",", "."));

  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t("invalidPayment"));
    return;
  }

  if (amount > Number(debt.remaining) + 0.000001) {
    showToast(t("paymentTooHigh"));
    return;
  }

  const date = prompt(t("paymentDate"), todayISO());
  if (date === null) return;

  const notes = prompt(t("paymentNotes"), "") || "";

  debt.payments = Array.isArray(debt.payments) ? debt.payments : [];
  debt.payments.unshift({
    id: crypto.randomUUID(),
    amount,
    currency: debt.currency,
    date: date || todayISO(),
    notes: notes.trim(),
    createdAt: Date.now()
  });

  debt.remaining = Math.max(0, Number(debt.remaining) - amount);
  if (debt.remaining < 0.000001) debt.remaining = 0;

  saveState();
  renderAll();
  showToast(t("paymentSaved"));
}

function deleteDebt(debtId) {
  if (!confirm(t("confirmDeleteDebt"))) return;
  state.debts = state.debts.filter(item => item.id !== debtId);
  saveState();
  renderAll();
  showToast(t("debtDeleted"));
}

function renderDebt(debt) {
  const status = debtStatus(debt);
  const paid = debtTotalPaid(debt);
  const percentage = debt.amount > 0
    ? Math.min(100, paid / debt.amount * 100)
    : 0;

  const historyHTML = (debt.payments || []).length
    ? (debt.payments || []).map(payment => `
        <div class="debt-payment-item">
          <span>${safeText(dateText(payment.date))}</span>
          <strong>${formatMoney(Number(payment.amount), payment.currency || debt.currency)}</strong>
          ${payment.notes ? `<small>${safeText(payment.notes)}</small>` : ""}
        </div>
      `).join("")
    : `<small>${t("noPayments")}</small>`;

  return `
    <article class="debt-item">
      <div class="debt-header">
        <div class="debt-info">
          <strong>${safeText(debt.person)}</strong>
          <small>${safeText(debt.description || t(debt.type))}</small>
        </div>
        <span class="debt-status ${status}">${t(status)}</span>
      </div>

      <div class="debt-details">
        <div class="debt-detail"><small>${t("debtOriginal")}</small><strong>${formatMoney(debt.amount, debt.currency)}</strong></div>
        <div class="debt-detail"><small>${t("debtPaid")}</small><strong>${formatMoney(paid, debt.currency)}</strong></div>
        <div class="debt-detail"><small>${t("debtBalance")}</small><strong class="debt-amount">${formatMoney(debt.remaining, debt.currency)}</strong></div>
        <div class="debt-detail"><small>${t("creationDate")}</small><span>${safeText(dateText(debt.createdDate))}</span></div>
        <div class="debt-detail"><small>${t("dueDate")}</small><span>${debt.dueDate ? safeText(dateText(debt.dueDate)) : t("debtNoDueDate")}</span></div>
      </div>

      <div class="debt-progress-track">
        <div class="debt-progress-fill" style="width:${percentage}%"></div>
      </div>
      <small>${t("debtProgress")}: ${Math.round(percentage)}%</small>

      ${debt.notes ? `<p class="debt-notes">${safeText(debt.notes)}</p>` : ""}

      <div class="debt-actions">
        ${status !== "paid" ? `<button type="button" class="debt-payment-button" data-debt-payment="${safeText(debt.id)}">${t("addPayment")}</button>` : ""}
        <button type="button" class="debt-history-button" data-debt-history="${safeText(debt.id)}">${t("paymentHistory")}</button>
        <button type="button" class="debt-delete-button" data-debt-delete="${safeText(debt.id)}">${t("delete")}</button>
      </div>

      <div class="debt-history-container" id="debt-history-${safeText(debt.id)}" hidden>
        <div class="debt-history"><strong>${t("paymentHistory")}</strong>${historyHTML}</div>
      </div>
    </article>
  `;
}

function renderDebts() {
  const statusFilter = $("filtro-deudas-estado")?.value || "all";
  const search = ($("filtro-deudas-busqueda")?.value || "").toLowerCase();

  const receivable = state.debts.filter(debt => debt.type === "receivable");
  const payable = state.debts.filter(debt => debt.type === "payable");

  const totalReceivable = sumConverted(receivable, "currency", "remaining");
  const totalPayable = sumConverted(payable, "currency", "remaining");

  if ($("total-deudas-cobrar")) $("total-deudas-cobrar").textContent = formatMoney(totalReceivable);
  if ($("total-deudas-pagar")) $("total-deudas-pagar").textContent = formatMoney(totalPayable);

  const filterList = list => list.filter(debt => {
    const status = debtStatus(debt);
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesSearch = `${debt.person} ${debt.description || ""}`.toLowerCase().includes(search);
    return matchesStatus && matchesSearch;
  });

  const receivableList = $("lista-deudas-cobrar");
  const payableList = $("lista-deudas-pagar");

  if (receivableList) {
    const filtered = filterList(receivable);
    receivableList.innerHTML = filtered.length
      ? filtered.map(renderDebt).join("")
      : `<div class="debt-empty">${t("noFilterResults")}</div>`;
  }

  if (payableList) {
    const filtered = filterList(payable);
    payableList.innerHTML = filtered.length
      ? filtered.map(renderDebt).join("")
      : `<div class="debt-empty">${t("noFilterResults")}</div>`;
  }

  if ($("resumen-deudas-cobrar")) $("resumen-deudas-cobrar").textContent = formatMoney(totalReceivable);
  if ($("resumen-deudas-pagar")) $("resumen-deudas-pagar").textContent = formatMoney(totalPayable);
}

function setupDebtButtons() {
  document.addEventListener("click", event => {
    const payment = event.target.closest("[data-debt-payment]");
    if (payment) return addDebtPayment(payment.dataset.debtPayment);

    const deletion = event.target.closest("[data-debt-delete]");
    if (deletion) return deleteDebt(deletion.dataset.debtDelete);

    const historyButton = event.target.closest("[data-debt-history]");
    if (historyButton) {
      const container = $(`debt-history-${historyButton.dataset.debtHistory}`);
      if (container) container.hidden = !container.hidden;
    }
  });

  ["filtro-deudas-estado", "filtro-deudas-busqueda"].forEach(id => {
    if ($(id)) {
      $(id).addEventListener("input", renderDebts);
      $(id).addEventListener("change", renderDebts);
    }
  });
}

/* =========================================================
   METAS FINANCIERAS
   ========================================================= */

function addGoal(event) {
  event.preventDefault();

  const name = $("nombre-meta")?.value.trim();
  const description = $("descripcion-meta")?.value.trim() || "";
  const amount = Number($("monto-meta")?.value);
  const currency = $("moneda-meta")?.value || state.baseCurrency;
  const targetDate = $("fecha-meta")?.value || "";

  if (!name || !Number.isFinite(amount) || amount <= 0) {
    showToast(t("invalidDebt"));
    return;
  }

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.goals.unshift({
    id: crypto.randomUUID(),
    name,
    description,
    amount,
    currency,
    targetDate,
    current: 0,
    contributions: [],
    createdAt: Date.now()
  });

  saveState();
  $("form-meta").reset();
  if ($("moneda-meta")) $("moneda-meta").value = state.baseCurrency;
  renderAll();
  showToast(t("goalSaved"));
}

function addGoalContribution(goalId) {
  const goal = state.goals.find(item => item.id === goalId);
  if (!goal) return;

  const remaining = Math.max(0, Number(goal.amount) - Number(goal.current));
  if (remaining <= 0) return;

  const input = prompt(
    `${t("goalContribution")} (${goal.currency})\n${t("goalRemaining")}: ${formatMoney(remaining, goal.currency)}`
  );

  if (input === null) return;

  const amount = Number(input.replace(",", "."));

  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t("invalidPayment"));
    return;
  }

  if (convertToBase(amount, goal.currency) === null) {
    showToast(t("manualRateMissing") + goal.currency);
    return;
  }

  goal.contributions = Array.isArray(goal.contributions) ? goal.contributions : [];
  goal.contributions.unshift({
    id: crypto.randomUUID(),
    amount,
    date: todayISO(),
    createdAt: Date.now()
  });

  goal.current = Math.min(Number(goal.amount), Number(goal.current) + amount);

  saveState();
  renderAll();
  showToast(t("goalContributionSaved"));
}

function deleteGoal(goalId) {
  if (!confirm(t("confirmDeleteGoal"))) return;
  state.goals = state.goals.filter(goal => goal.id !== goalId);
  saveState();
  renderAll();
  showToast(t("goalDeleted"));
}

function renderGoals() {
  const container = $("lista-metas");
  if (!container) return;

  if (!state.goals.length) {
    container.innerHTML = `<div class="empty-state">${t("noGoals")}</div>`;
    return;
  }

  container.innerHTML = state.goals.map(goal => {
    const current = Number(goal.current) || 0;
    const amount = Number(goal.amount) || 0;
    const percentage = amount > 0 ? Math.min(100, current / amount * 100) : 0;
    const remaining = Math.max(0, amount - current);
    const completed = remaining <= 0.000001;
    const overdue = goal.targetDate && goal.targetDate < todayISO() && !completed;

    return `
      <article class="debt-item goal-item">
        <div class="debt-header">
          <div class="debt-info">
            <strong>${safeText(goal.name)}</strong>
            <small>${safeText(goal.description || "")}</small>
          </div>
          <span class="debt-status ${completed ? "paid" : overdue ? "overdue" : "pending"}">
            ${completed ? t("goalCompleted") : overdue ? t("goalOverdue") : t("pending")}
          </span>
        </div>

        <div class="debt-details">
          <div class="debt-detail"><small>${t("goalCurrent")}</small><strong>${formatMoney(current, goal.currency)}</strong></div>
          <div class="debt-detail"><small>${t("goalAmount")}</small><strong>${formatMoney(amount, goal.currency)}</strong></div>
          <div class="debt-detail"><small>${t("goalRemaining")}</small><strong>${formatMoney(remaining, goal.currency)}</strong></div>
          <div class="debt-detail"><small>${t("goalDate")}</small><span>${goal.targetDate ? safeText(dateText(goal.targetDate)) : t("debtNoDueDate")}</span></div>
        </div>

        <div class="debt-progress-track">
          <div class="debt-progress-fill" style="width:${percentage}%"></div>
        </div>
        <small>${t("goalProgress")}: ${Math.round(percentage)}%</small>

        <div class="debt-actions">
          ${!completed ? `<button type="button" class="debt-payment-button" data-goal-add="${safeText(goal.id)}">${t("addGoalContribution")}</button>` : ""}
          <button type="button" class="debt-delete-button" data-goal-delete="${safeText(goal.id)}">${t("delete")}</button>
        </div>
      </article>
    `;
  }).join("");
}

function setupGoalButtons() {
  document.addEventListener("click", event => {
    const add = event.target.closest("[data-goal-add]");
    if (add) return addGoalContribution(add.dataset.goalAdd);

    const remove = event.target.closest("[data-goal-delete]");
    if (remove) deleteGoal(remove.dataset.goalDelete);
  });
}

/* =========================================================
   CATEGORÍAS Y VISUALIZACIÓN
   ========================================================= */

function categoryName(category) {
  const keys = {
    salary: "catSalary",
    business: "catBusiness",
    food: "catFood",
    housing: "catHousing",
    transport: "catTransport",
    health: "catHealth",
    entertainment: "catEntertainment",
    debt: "catDebt",
    other: "catOther"
  };
  return keys[category] ? t(keys[category]) : category;
}

function renderMovement(item, isSaving = false) {
  const type = isSaving ? "saving" : item.type;
  const sign = type === "income" ? "+" : type === "expense" ? "−" : "";
  const amountClass = type === "income" ? "amount-income" : type === "expense" ? "amount-expense" : "";
  const title = isSaving ? item.name : item.description;
  const subtitle = isSaving
    ? dateText(item.date)
    : `${categoryName(item.category)} · ${dateText(item.date)}`;

  return `
    <article class="movement-item">
      <div class="movement-icon">${type === "income" ? "↗" : type === "expense" ? "↘" : "🐷"}</div>
      <div class="movement-info">
        <strong>${safeText(title)}</strong>
        <small>${safeText(subtitle)}</small>
      </div>
      <div class="movement-amount">
        <strong class="${amountClass}">${sign}${formatMoney(Number(item.amount), item.currency)}</strong>
        <small>${formatMoney(convertToBase(Number(item.amount), item.currency) ?? 0)}</small>
      </div>
      <button class="delete-button" type="button"
        data-delete="${isSaving ? "saving" : "movement"}"
        data-id="${safeText(item.id)}"
        aria-label="${t("delete")}">×</button>
    </article>
  `;
}

function renderList(elementId, items, emptyText, isSaving = false) {
  const element = $(elementId);
  if (!element) return;

  element.innerHTML = items.length
    ? items.map(item => renderMovement(item, isSaving)).join("")
    : `<div class="empty-state">${emptyText}</div>`;
}

function renderRecurring() {
  const element = $("lista-recurrentes");
  if (!element) return;

  element.innerHTML = state.recurring.length
    ? state.recurring.map(item => `
      <article class="movement-item">
        <div class="movement-icon">🔁</div>
        <div class="movement-info">
          <strong>${safeText(item.description)}</strong>
          <small>${t(item.frequency)} · ${t(item.type === "income" ? "income" : "expenses")}</small>
        </div>
        <div class="movement-amount">
          <strong>${formatMoney(item.amount, item.currency)}</strong>
          <small>${formatMoney(convertToBase(item.amount, item.currency) ?? 0)}</small>
        </div>
        <button class="delete-button" type="button" data-delete="recurring" data-id="${safeText(item.id)}">×</button>
      </article>
    `).join("")
    : `<div class="empty-state">${t("noRecurring")}</div>`;
}

/* =========================================================
   FILTROS DE MOVIMIENTOS
   ========================================================= */

function renderFilteredMovements() {
  const list = $("lista-movimientos");
  if (!list) return;

  const search = ($("filtro-busqueda")?.value || "").toLowerCase().trim();
  const type = $("filtro-tipo")?.value || "all";
  const category = $("filtro-categoria")?.value || "all";
  const month = $("filtro-mes")?.value || "all";

  const filtered = state.movements.filter(item => {
    const text = `${item.description || ""} ${categoryName(item.category || "")}`.toLowerCase();
    const matchesSearch = text.includes(search);
    const matchesType = type === "all" || item.type === type;
    const matchesCategory = category === "all" || item.category === category;
    const matchesMonth = month === "all" || (item.date || "").slice(0, 7) === month;
    return matchesSearch && matchesType && matchesCategory && matchesMonth;
  });

  list.innerHTML = filtered.length
    ? filtered.map(item => renderMovement(item)).join("")
    : `<div class="empty-state">${t("noFilterResults")}</div>`;
}

function setupMovementFilters() {
  ["filtro-busqueda", "filtro-tipo", "filtro-categoria", "filtro-mes"].forEach(id => {
    if ($(id)) {
      $(id).addEventListener("input", renderFilteredMovements);
      $(id).addEventListener("change", renderFilteredMovements);
    }
  });

  if ($("limpiar-filtros")) {
    $("limpiar-filtros").addEventListener("click", () => {
      ["filtro-busqueda", "filtro-tipo", "filtro-categoria", "filtro-mes"].forEach(id => {
        if ($(id)) $(id).value = "all";
      });
      if ($("filtro-busqueda")) $("filtro-busqueda").value = "";
      renderFilteredMovements();
    });
  }
}

/* =========================================================
   PANEL PRINCIPAL Y DINERO DISPONIBLE
   ========================================================= */

function getDebtPaymentTotals() {
  const received = [];
  const paid = [];

  state.debts.forEach(debt => {
    (debt.payments || []).forEach(payment => {
      const item = {
        amount: Number(payment.amount),
        currency: payment.currency || debt.currency
      };

      if (debt.type === "receivable") received.push(item);
      if (debt.type === "payable") paid.push(item);
    });
  });

  return {
    received: sumConverted(received),
    paid: sumConverted(paid)
  };
}

function renderDashboard() {
  const incomes = state.movements.filter(item => item.type === "income");
  const expenses = state.movements.filter(item => item.type === "expense");

  const totalIncome = sumConverted(incomes);
  const totalExpense = sumConverted(expenses);
  const totalSavings = sumConverted(state.savings);

  const budget = convertToBase(state.budget.amount, state.budget.currency) ?? 0;
  const balance = totalIncome - totalExpense - totalSavings;

  const debtPayments = getDebtPaymentTotals();
  const availableMoney = balance + debtPayments.received - debtPayments.paid;

  if ($("balance-total")) $("balance-total").textContent = formatMoney(balance);
  if ($("total-ingresos")) $("total-ingresos").textContent = formatMoney(totalIncome);
  if ($("total-gastos")) $("total-gastos").textContent = formatMoney(totalExpense);
  if ($("total-ahorros")) $("total-ahorros").textContent = formatMoney(totalSavings);
  if ($("total-presupuesto")) $("total-presupuesto").textContent = formatMoney(budget);
  if ($("total-disponible")) $("total-disponible").textContent = formatMoney(availableMoney);
  if ($("ahorros-total-pagina")) $("ahorros-total-pagina").textContent = formatMoney(totalSavings);

  const greeting = state.userName
    ? t("helloName").replace("{name}", safeText(state.userName))
    : t("hello");

  if ($("greeting-personalizado")) $("greeting-personalizado").textContent = greeting;

  if ($("estadistica-ingresos")) $("estadistica-ingresos").textContent = formatMoney(totalIncome);
  if ($("estadistica-gastos")) $("estadistica-gastos").textContent = formatMoney(totalExpense);
  if ($("estadistica-ahorros")) $("estadistica-ahorros").textContent = formatMoney(totalSavings);
  if ($("estadistica-balance")) $("estadistica-balance").textContent = formatMoney(balance);

  const spent = sumConverted(expenses);
  const percentage = budget > 0 ? Math.min(100, spent / budget * 100) : 0;

  if ($("porcentaje-presupuesto")) {
    $("porcentaje-presupuesto").textContent = `${Math.round(budget > 0 ? spent / budget * 100 : 0)}%`;
  }

  if ($("barra-presupuesto")) $("barra-presupuesto").style.width = `${percentage}%`;
  if ($("presupuesto-gastado")) $("presupuesto-gastado").textContent = formatMoney(spent);
  if ($("presupuesto-restante")) {
    $("presupuesto-restante").textContent = budget > 0
      ? formatMoney(budget - spent)
      : t("emptyBudget");
  }

  renderList("lista-movimientos-inicio", state.movements.slice(0, 5), t("noMovements"));
  renderFilteredMovements();
  renderList("lista-ahorros", state.savings, t("noSavings"), true);
}

/* =========================================================
   ALERTAS FINANCIERAS
   ========================================================= */

function renderAlerts() {
  const container = $("lista-alertas");
  if (!container) return;

  const alerts = [];
  const expenses = state.movements.filter(item => item.type === "expense");
  const budget = convertToBase(state.budget.amount, state.budget.currency) ?? 0;
  const spent = sumConverted(expenses);

  if (budget > 0 && spent > budget) {
    alerts.push(`⚠️ Has superado tu presupuesto mensual por ${formatMoney(spent - budget)}.`);
  } else if (budget > 0 && spent >= budget * 0.8) {
    alerts.push(`🔔 Has utilizado más del 80% de tu presupuesto mensual.`);
  }

  const overdue = state.debts.filter(debt => debtStatus(debt) === "overdue");
  if (overdue.length) {
    alerts.push(`📅 Tienes ${overdue.length} deuda(s) vencida(s). Revisa sus fechas y saldos.`);
  }

  const dueSoon = state.debts.filter(debt => {
    if (!debt.dueDate || debtStatus(debt) !== "pending") return false;
    const days = (new Date(debt.dueDate + "T12:00:00") - new Date(todayISO() + "T12:00:00")) / 86400000;
    return days >= 0 && days <= 7;
  });

  if (dueSoon.length) {
    alerts.push(`⏰ Tienes ${dueSoon.length} deuda(s) con vencimiento en los próximos 7 días.`);
  }

  const goalsOverdue = state.goals.filter(goal =>
    goal.targetDate && goal.targetDate < todayISO() && Number(goal.current) < Number(goal.amount)
  );

  if (goalsOverdue.length) {
    alerts.push(`🎯 Tienes ${goalsOverdue.length} meta(s) cuya fecha objetivo ya pasó.`);
  }

  const goalsCompleted = state.goals.filter(goal =>
    Number(goal.current) >= Number(goal.amount)
  );

  if (goalsCompleted.length) {
    alerts.push(`🎉 ¡Has completado ${goalsCompleted.length} meta(s) financieras!`);
  }

  container.innerHTML = alerts.length
    ? alerts.map(alert => `<div class="alert-item">${safeText(alert)}</div>`).join("")
    : `<div class="empty-state">${t("noAlerts")}</div>`;
}

/* =========================================================
   ASISTENTE FINANCIERO
   ========================================================= */

function renderAssistant() {
  const container = $("resumen-asistente");
  if (!container) return;

  if (!state.movements.length && !state.debts.length && !state.goals.length) {
    container.innerHTML = `<p>${t("assistantEmpty")}</p>`;
    return;
  }

  const income = sumConverted(state.movements.filter(item => item.type === "income"));
  const expenses = sumConverted(state.movements.filter(item => item.type === "expense"));
  const savings = sumConverted(state.savings);
  const debtTotals = getDebtPaymentTotals();

  const messages = [];
  const net = income - expenses;

  if (income > 0) {
    const ratio = expenses / income;

    if (ratio > 0.9) {
      messages.push("🔴 Tus gastos representan más del 90% de tus ingresos registrados. Revisa los gastos que puedes reducir.");
    } else if (ratio > 0.7) {
      messages.push("🟠 Tus gastos representan más del 70% de tus ingresos. Intenta reservar una parte mayor para ahorro.");
    } else {
      messages.push("🟢 Tus gastos están por debajo del 70% de tus ingresos registrados. Mantén el seguimiento.");
    }
  }

  if (net < 0) {
    messages.push("⚠️ Tus gastos superan tus ingresos registrados. Conviene revisar tu presupuesto.");
  }

  if (savings > 0) {
    messages.push(`🐷 Has registrado ${formatMoney(savings)} en ahorros. ¡Sigue construyendo tu reserva!`);
  }

  const receivable = sumConverted(
    state.debts.filter(debt => debt.type === "receivable"),
    "currency", "remaining"
  );

  const payable = sumConverted(
    state.debts.filter(debt => debt.type === "payable"),
    "currency", "remaining"
  );

  if (payable > 0) {
    messages.push(`💳 Tienes ${formatMoney(payable)} pendientes de pago. Revisa vencimientos y condiciones.`);
  }

  if (receivable > 0) {
    messages.push(`📥 Tienes ${formatMoney(receivable)} pendientes por cobrar. Da seguimiento a esos pagos.`);
  }

  if (state.goals.length) {
    const completed = state.goals.filter(goal => Number(goal.current) >= Number(goal.amount)).length;
    messages.push(`🎯 Tienes ${state.goals.length} metas activas y ${completed} completada(s).`);
  }

  if (debtTotals.received || debtTotals.paid) {
    messages.push(`ℹ️ Los abonos de deudas ya están incluidos en el cálculo de dinero disponible, no en tus ingresos o gastos normales.`);
  }

  container.innerHTML = messages.map(message =>
    `<p class="assistant-tip">${safeText(message)}</p>`
  ).join("");
}

/* =========================================================
   COMPARACIÓN MENSUAL
   ========================================================= */

function monthTotals(date) {
  const month = date.toISOString().slice(0, 7);
  const items = state.movements.filter(item => (item.date || "").slice(0, 7) === month);

  return {
    income: sumConverted(items.filter(item => item.type === "income")),
    expense: sumConverted(items.filter(item => item.type === "expense"))
  };
}

function renderMonthlyComparison() {
  const container = $("comparacion-mensual");
  if (!container) return;

  const now = new Date();
  const current = monthTotals(now);
  const previousDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previous = monthTotals(previousDate);

  const difference = current.expense - previous.expense;
  const expenseMessage = difference > 0
    ? `Tus gastos aumentaron ${formatMoney(difference)}.`
    : difference < 0
      ? `Tus gastos disminuyeron ${formatMoney(Math.abs(difference))}.`
      : "Tus gastos son iguales a los del mes anterior.";

  container.innerHTML = `
    <div class="comparison-grid">
      <div class="comparison-item">
        <strong>${t("currentMonth")}</strong>
        <p>${t("income")}: ${formatMoney(current.income)}</p>
        <p>${t("expenses")}: ${formatMoney(current.expense)}</p>
      </div>
      <div class="comparison-item">
        <strong>${t("previousMonth")}</strong>
        <p>${t("income")}: ${formatMoney(previous.income)}</p>
        <p>${t("expenses")}: ${formatMoney(previous.expense)}</p>
      </div>
    </div>
    <p>${safeText(expenseMessage)}</p>
  `;
}

/* =========================================================
   ESTADÍSTICAS Y GRÁFICO
   ========================================================= */

function renderChart() {
  const container = $("grafico-resumen");
  if (!container) return;

  const totals = {};

  state.movements.filter(item => item.type === "expense").forEach(item => {
    const value = convertToBase(item.amount, item.currency);
    if (value !== null) {
      totals[item.category] = (totals[item.category] || 0) + value;
    }
  });

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const maximum = Math.max(1, ...entries.map(entry => entry[1]));

  container.innerHTML = entries.length
    ? entries.map(([category, amount]) => `
      <div class="chart-row">
        <span>${safeText(categoryName(category))}</span>
        <div class="chart-track">
          <div class="chart-bar" style="width:${amount / maximum * 100}%"></div>
        </div>
        <strong>${formatMoney(amount)}</strong>
      </div>
    `).join("")
    : `<div class="empty-state">${t("noMovements")}</div>`;
}

/* =========================================================
   TIPOS DE CAMBIO
   ========================================================= */

function renderManualRates() {
  const container = $("campos-tasas");
  if (container) {
    container.innerHTML = CURRENCIES.filter(code => code !== "CRC").map(code => `
      <div class="manual-rate-row">
        <span>${code}</span>
        <input type="number" min="0.000001" step="any"
          data-rate="${code}"
          value="${Number(state.manualRates[code]) || ""}"
          aria-label="${code}">
      </div>
    `).join("");
  }

  document.querySelectorAll('input[name="modo-cambio"]').forEach(radio => {
    radio.checked = radio.value === state.exchangeMode;
  });

  if ($("tasas-manuales")) {
    $("tasas-manuales").hidden = state.exchangeMode === "automatic";
  }
}

async function updateExchangeRates() {
  if ($("estado-cambios")) $("estado-cambios").textContent = t("loading");

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      cache: "no-store"
    });

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    if (data.result !== "success" || !data.rates) throw new Error("Invalid rates");

    const usdToCRC = Number(data.rates.CRC);
    if (!usdToCRC) throw new Error("CRC rate missing");

    const rates = { CRC: 1 };

    CURRENCIES.filter(code => code !== "CRC").forEach(code => {
      const usdToCurrency = Number(data.rates[code]);
      if (usdToCurrency > 0) rates[code] = usdToCRC / usdToCurrency;
    });

    state.onlineRates = rates;
    state.ratesUpdatedAt = data.time_last_update_utc || new Date().toISOString();

    saveState();
    renderAll();

    if ($("estado-cambios")) {
      $("estado-cambios").textContent = t("rateSource") + " " + state.ratesUpdatedAt;
    }

    showToast(t("ratesUpdated"));
  } catch (error) {
    if ($("estado-cambios")) $("estado-cambios").textContent = t("ratesError");
    showToast(t("ratesError"));
  }
}

/* =========================================================
   EXPORTAR E IMPORTAR RESPALDOS
   ========================================================= */

function exportData() {
  const backup = {
    app: "Mis Finanzas",
    version: 2,
    exportedAt: new Date().toISOString(),
    data: state
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mis-finanzas-backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(t("exported"));
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const imported = parsed.data || parsed;

      if (!imported || typeof imported !== "object" ||
          !Array.isArray(imported.movements) ||
          !Array.isArray(imported.savings)) {
        throw new Error("Invalid backup");
      }

      if (!confirm("Importar este respaldo reemplazará los datos actuales de esta aplicación en este dispositivo. ¿Deseas continuar?")) {
        event.target.value = "";
        return;
      }

      state = {
        ...cloneDefault(),
        ...imported,
        movements: Array.isArray(imported.movements) ? imported.movements : [],
        savings: Array.isArray(imported.savings) ? imported.savings : [],
        recurring: Array.isArray(imported.recurring) ? imported.recurring : [],
        debts: Array.isArray(imported.debts) ? imported.debts : [],
        goals: Array.isArray(imported.goals) ? imported.goals : [],
        budget: { ...DEFAULT_STATE.budget, ...(imported.budget || {}) },
        manualRates: { ...DEFAULT_STATE.manualRates, ...(imported.manualRates || {}) }
      };

      saveState();
      setupCurrencies();
      translatePage();
      renderAll();
      showToast(t("imported"));
    } catch (error) {
      showToast(t("importError"));
    }

    event.target.value = "";
  };

  reader.onerror = () => {
    showToast(t("importError"));
    event.target.value = "";
  };

  reader.readAsText(file);
}

/* =========================================================
   ELIMINACIÓN DE REGISTROS
   ========================================================= */

function deleteRecord(type, id) {
  if (!confirm(t("confirmDelete"))) return;

  if (type === "movement") {
    state.movements = state.movements.filter(item => item.id !== id);
  } else if (type === "saving") {
    state.savings = state.savings.filter(item => item.id !== id);
  } else if (type === "recurring") {
    state.recurring = state.recurring.filter(item => item.id !== id);
  }

  saveState();
  renderAll();
  showToast(t("deleted"));
}

function setupDeleteButtons() {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-delete]");
    if (!button) return;
    deleteRecord(button.dataset.delete, button.dataset.id);
  });

  if ($("clear-movements")) {
    $("clear-movements").addEventListener("click", () => {
      if (!confirm(t("confirmClear"))) return;
      state.movements = [];
      saveState();
      renderAll();
    });
  }
}

/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

function setupSettings() {
  if ($("selector-idioma")) {
    $("selector-idioma").addEventListener("change", event => {
      state.language = event.target.value;
      saveState();
      translatePage();
    });
  }

  if ($("moneda-principal")) {
    $("moneda-principal").addEventListener("change", event => {
      state.baseCurrency = event.target.value;
      saveState();

      document.querySelectorAll(".currency-select").forEach(select => {
        if (!select.value) select.value = state.baseCurrency;
      });

      renderAll();
    });
  }

  if ($("guardar-nombre")) {
    $("guardar-nombre").addEventListener("click", () => {
      state.userName = $("nombre-usuario").value.trim().slice(0, 40);
      saveState();
      renderAll();
      showToast(t("nameSaved"));
    });
  }

  document.querySelectorAll('input[name="modo-cambio"]').forEach(radio => {
    radio.addEventListener("change", event => {
      state.exchangeMode = event.target.value;
      saveState();
      renderAll();
    });
  });

  if ($("guardar-tasas")) {
    $("guardar-tasas").addEventListener("click", () => {
      document.querySelectorAll("[data-rate]").forEach(input => {
        const value = Number(input.value);
        if (value > 0) state.manualRates[input.dataset.rate] = value;
      });

      saveState();
      renderAll();
      showToast(t("ratesSaved"));
    });
  }

  if ($("actualizar-cambios")) {
    $("actualizar-cambios").addEventListener("click", updateExchangeRates);
  }

  if ($("exportar-datos")) {
    $("exportar-datos").addEventListener("click", exportData);
  }

  if ($("importar-datos")) {
    $("importar-datos").addEventListener("change", importData);
  }

  if ($("boton-salir")) {
    $("boton-salir").addEventListener("click", () => {
      if (!confirm(t("confirmExit"))) return;
      window.close();
      showToast(t("exitHelp"));
    });
  }
}

/* =========================================================
   FORMULARIOS
   ========================================================= */

function setupForms() {
  const forms = [
    ["form-movimiento", addMovement],
    ["form-ahorro", addSaving],
    ["form-presupuesto", saveBudget],
    ["form-recurrente", addRecurring],
    ["form-deuda", addDebt],
    ["form-meta", addGoal]
  ];

  forms.forEach(([id, handler]) => {
    if ($(id)) $(id).addEventListener("submit", handler);
  });
}

/* =========================================================
   RENDERIZADO GENERAL
   ========================================================= */

function renderAll() {
  renderDashboard();
  renderRecurring();
  renderChart();
  renderManualRates();
  renderDebts();
  renderGoals();
  renderAlerts();
  renderAssistant();
  renderMonthlyComparison();

  if ($("monto-presupuesto")) {
    $("monto-presupuesto").value = state.budget.amount || "";
  }

  if ($("moneda-presupuesto")) {
    $("moneda-presupuesto").value = state.budget.currency || state.baseCurrency;
  }
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function initialize() {
  setupCurrencies();
  setupNavigation();
  setupForms();
  setupDeleteButtons();
  setupDebtButtons();
  setupGoalButtons();
  setupMovementFilters();
  setupSettings();
  setupGuide();

  if ($("selector-idioma")) $("selector-idioma").value = state.language;
  if ($("moneda-principal")) $("moneda-principal").value = state.baseCurrency;
  if ($("nombre-usuario")) $("nombre-usuario").value = state.userName || "";

  document.querySelectorAll(".currency-select").forEach(select => {
    if (!select.value) select.value = state.baseCurrency;
  });

  if ($("moneda-presupuesto")) {
    $("moneda-presupuesto").value = state.budget.currency;
  }

  ["fecha-movimiento", "fecha-ahorro", "fecha-creacion-deuda"].forEach(id => {
    if ($(id) && !$(id).value) $(id).value = todayISO();
  });

  if ($("moneda-meta")) $("moneda-meta").value = state.baseCurrency;

  translatePage();
  saveState();

  if (!state.onlineRates && navigator.onLine) {
    updateExchangeRates();
  }
}

document.addEventListener("DOMContentLoaded", initialize);
