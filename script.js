
"use strict";

/* =====================================================
   MIS FINANZAS - MOTOR PRINCIPAL
   Moneda base + conversión automática/manual
   Datos locales + guía interactiva ES/EN
   Módulo de deudas por cobrar y por pagar
   ===================================================== */

const $ = (id) => document.getElementById(id);

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
    appSubtitle: "Tu dinero, bajo control",
    totalBalance: "Balance total",
    availableBalance: "Disponible en tu moneda principal",
    income: "Ingresos",
    expenses: "Gastos",
    savings: "Ahorros",
    budget: "Presupuesto",
    quickActions: "Acciones rápidas",
    addIncome: "Ingreso",
    addExpense: "Gasto",
    addSaving: "Ahorrar",
    setBudget: "Presupuesto",
    availableMoney: "Dinero disponible",
    availableDescription: "Ingresos menos gastos y ahorros, más los abonos recibidos y menos los pagos de deudas.",
    recentMovements: "Movimientos recientes",
    seeAll: "Ver todos",
    movements: "Movimientos",
    movementsDescription: "Controla tus ingresos y gastos.",
    newMovement: "Nuevo movimiento",
    movementType: "Tipo de movimiento",
    description: "Descripción",
    amount: "Monto",
    currency: "Moneda",
    category: "Categoría",
    date: "Fecha",
    saveMovement: "Guardar movimiento",
    history: "Historial",
    clearHistory: "Borrar historial",
    savingsDescription: "Construye tus metas financieras.",
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
    statistics: "Estadísticas",
    statisticsDescription: "Un resumen de tus finanzas.",
    netBalance: "Balance neto",
    expenseDistribution: "Distribución de gastos",
    tips: "Consejos financieros",
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
    settings: "Configuración",
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
    more: "Más",
    moreDescription: "Otras herramientas de Mis Finanzas.",
    home: "Inicio",
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
    deleted: "Registro eliminado.",
    emptyBudget: "Configura tu presupuesto mensual.",
    conversionUnavailable: "No se pudo calcular una conversión.",
    recurringSaved: "Movimiento recurrente guardado.",
    delete: "Eliminar",
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
    debtCashReceived: "Abono recibido",
    debtCashPaid: "Pago de deuda",
    debtNoDueDate: "Sin vencimiento",
    debtProgress: "Progreso de pago",
    guide: "Guía de uso",
    guideWelcomeTitle: "¡Bienvenido a Mis Finanzas!",
    guideWelcomeText: "Aprende a organizar tu dinero paso a paso. Esta guía rápida te ayudará a conocer las principales herramientas.",
    guideIncomeTitle: "1. Registra tus ingresos",
    guideIncomeText: "Anota tu salario, ingresos de negocios u otras entradas de dinero. Así sabrás cuánto dinero recibes.",
    guideExpensesTitle: "2. Controla tus gastos",
    guideExpensesText: "Registra tus compras, pagos y gastos diarios. Utiliza las categorías para identificar dónde gastas más.",
    guideSavingsTitle: "3. Construye tus ahorros 🐷",
    guideSavingsText: "Registra el dinero que apartas para tus metas. Puedes crear diferentes ahorros y consultar cuánto has acumulado.",
    guideBudgetTitle: "4. Organiza tu presupuesto",
    guideBudgetText: "Define cuánto puedes gastar al mes. La aplicación te ayudará a comparar tu presupuesto con tus gastos registrados.",
    guideCurrencyTitle: "5. Utiliza diferentes monedas",
    guideCurrencyText: "Puedes registrar ingresos, gastos, ahorros y deudas en diferentes monedas. Configura tu moneda principal y los tipos de cambio.",
    guideDebtsTitle: "6. Controla tus deudas",
    guideDebtsText: "Registra el dinero que te deben y el que debes pagar. Puedes añadir abonos parciales y consultar el saldo pendiente y el historial. Los abonos recibidos aumentan tu dinero disponible y los pagos lo reducen.",
    guideTipsTitle: "7. Mejora tus finanzas",
    guideTipsText: "Consulta los consejos financieros para desarrollar hábitos de ahorro y administrar mejor tu dinero.",
    guideFinishTitle: "¡Todo listo!",
    guideFinishText: "Ya conoces las herramientas principales. Empieza a registrar tus movimientos y construye mejores hábitos financieros.",
    guideNext: "Siguiente",
    guidePrevious: "Anterior",
    guideSkip: "Omitir guía",
    guideStart: "Comenzar a usar Mis Finanzas",
    guideStep: "Paso"
  },

  en: {
    appTitle: "My Finances",
    appSubtitle: "Your money, under control",
    totalBalance: "Total balance",
    availableBalance: "Available in your main currency",
    income: "Income",
    expenses: "Expenses",
    savings: "Savings",
    budget: "Budget",
    quickActions: "Quick actions",
    addIncome: "Income",
    addExpense: "Expense",
    addSaving: "Save",
    setBudget: "Budget",
    availableMoney: "Available money",
    availableDescription: "Income minus expenses and savings, plus debt payments received and minus debt payments made.",
    recentMovements: "Recent transactions",
    seeAll: "See all",
    movements: "Transactions",
    movementsDescription: "Track your income and expenses.",
    newMovement: "New transaction",
    movementType: "Transaction type",
    description: "Description",
    amount: "Amount",
    currency: "Currency",
    category: "Category",
    date: "Date",
    saveMovement: "Save transaction",
    history: "History",
    clearHistory: "Clear history",
    savingsDescription: "Build your financial goals.",
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
    statistics: "Statistics",
    statisticsDescription: "An overview of your finances.",
    netBalance: "Net balance",
    expenseDistribution: "Expense distribution",
    tips: "Financial tips",
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
    tip5Text: "Build a reserve for unexpected expenses and avoid relying on credit.",
    tip6Title: "Manage your debts",
    tip6Text: "Prioritize high-interest debts and avoid unnecessary new commitments.",
    settings: "Settings",
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
    more: "More",
    moreDescription: "Other My Finances tools.",
    home: "Home",
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
    ratesError: "Exchange rates could not be updated. You can use manual rates.",
    manualRateMissing: "A valid manual exchange rate is missing for ",
    exported: "Data backup downloaded.",
    deleted: "Record deleted.",
    emptyBudget: "Set your monthly budget.",
    conversionUnavailable: "Conversion could not be calculated.",
    recurringSaved: "Recurring transaction saved.",
    delete: "Delete",
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
    exitHelp: "To close the app, use the Android Home button or the Recent Apps screen.",

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
    receivableDescription: "Money that other people or entities owe you.",
    payableDebts: "Payable debts",
    payableDescription: "Money you owe to other people or entities.",
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
    paymentTooHigh: "The payment cannot exceed the outstanding balance.",
    invalidPayment: "Enter a valid payment amount.",
    invalidDebt: "Check the debt amount and details.",
    confirmDeleteDebt: "Do you want to delete this debt and its payment history?",
    debtDeleted: "Debt deleted.",
    debtPersonRequired: "Enter a person or entity.",
    debtCashReceived: "Payment received",
    debtCashPaid: "Debt payment",
    debtNoDueDate: "No due date",
    debtProgress: "Payment progress",
    guide: "User guide",
    guideWelcomeTitle: "Welcome to My Finances!",
    guideWelcomeText: "Learn to organize your money step by step. This quick guide will help you discover the main features.",
    guideIncomeTitle: "1. Record your income",
    guideIncomeText: "Record your salary, business income, or other money received. This helps you understand how much you earn.",
    guideExpensesTitle: "2. Track your expenses",
    guideExpensesText: "Record your purchases, bills, and daily expenses. Use categories to identify where your money goes.",
    guideSavingsTitle: "3. Build your savings 🐷",
    guideSavingsText: "Record the money you set aside for your goals. You can create different savings goals and track your progress.",
    guideBudgetTitle: "4. Organize your budget",
    guideBudgetText: "Set how much you can spend each month. The app helps you compare your budget with your recorded expenses.",
    guideCurrencyTitle: "5. Use different currencies",
    guideCurrencyText: "You can record income, expenses, savings, and debts in different currencies. Set your main currency and exchange rates.",
    guideDebtsTitle: "6. Manage your debts",
    guideDebtsText: "Record money owed to you and money you owe. Add partial payments and check the outstanding balance and payment history. Payments received increase available money and payments made reduce it.",
    guideTipsTitle: "7. Improve your finances",
    guideTipsText: "Explore financial tips to develop saving habits and manage your money better.",
    guideFinishTitle: "You're all set!",
    guideFinishText: "You now know the main features. Start recording your transactions and building better financial habits.",
    guideNext: "Next",
    guidePrevious: "Previous",
    guideSkip: "Skip guide",
    guideStart: "Start using My Finances",
    guideStep: "Step"
  }
};

/* =====================================================
   ESTADO INICIAL
   ===================================================== */

const DEFAULT_STATE = {
  language: "es",
  baseCurrency: "CRC",
  exchangeMode: "both",
  userName: "",
  movements: [],
  savings: [],
  recurring: [],
  debts: [],
  budget: { amount: 0, currency: "CRC" },
  manualRates: {
    CRC: 1,
    USD: 500,
    EUR: 540,
    MXN: 29,
    GBP: 630,
    BRL: 95,
    COP: 0.12,
    CAD: 360
  },
  onlineRates: null,
  ratesUpdatedAt: null
};

let state = loadState();
let currentSection = "inicio";

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("misFinanzasData"));

    return stored ? {
      ...DEFAULT_STATE,
      ...stored,
      movements: Array.isArray(stored.movements) ? stored.movements : [],
      savings: Array.isArray(stored.savings) ? stored.savings : [],
      recurring: Array.isArray(stored.recurring) ? stored.recurring : [],
      debts: Array.isArray(stored.debts) ? stored.debts : [],
      budget: { ...DEFAULT_STATE.budget, ...(stored.budget || {}) },
      manualRates: { ...DEFAULT_STATE.manualRates, ...(stored.manualRates || {}) }
    } : JSON.parse(JSON.stringify(DEFAULT_STATE));
  } catch (error) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  localStorage.setItem("misFinanzasData", JSON.stringify(state));
}

function t(key) {
  return TEXT[state.language]?.[key] || TEXT.es[key] || key;
}

/* =====================================================
   TRADUCCIÓN
   ===================================================== */

function translatePage() {
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (TEXT[state.language][key]) {
      element.textContent = t(key);
    }
  });

  $("selector-idioma").value = state.language;
  $("moneda-principal").value = state.baseCurrency;
  $("nombre-usuario").value = state.userName || "";

  document.title = t("appTitle");

  const guideButton = $("boton-guia-uso");

  if (guideButton) {
    guideButton.textContent = "📖 " + t("guide");
  }

  if ($("mf-guide-overlay") && !$("mf-guide-overlay").hidden) {
    renderGuideStep();
  }

  renderAll();
}

/* =====================================================
   MONEDAS Y CONVERSIONES
   ===================================================== */

function currencyOptions() {
  return CURRENCIES.map(code =>
    `<option value="${code}">${code} - ${CURRENCY_NAMES[code]}</option>`
  ).join("");
}

function setupCurrencies() {
  document.querySelectorAll(".currency-select").forEach(select => {
    select.innerHTML = currencyOptions();
  });

  $("moneda-principal").innerHTML = currencyOptions();

  document.querySelectorAll(".currency-select").forEach(select => {
    select.value = state.baseCurrency;
  });

  $("moneda-presupuesto").value = state.budget.currency;
  $("moneda-principal").value = state.baseCurrency;
  $("fecha-movimiento").value = todayISO();
  $("fecha-ahorro").value = todayISO();

  if ($("fecha-creacion-deuda")) {
    $("fecha-creacion-deuda").value = todayISO();
  }
}

function todayISO() {
  const date = new Date();
  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
}

function formatMoney(amount, currency = state.baseCurrency) {
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

function exchangeRate(currency) {
  if (currency === "CRC") return 1;

  const automatic = state.onlineRates?.[currency];
  const manual = Number(state.manualRates[currency]);

  if (state.exchangeMode === "automatic") {
    return automatic || null;
  }

  if (state.exchangeMode === "manual") {
    return manual > 0 ? manual : null;
  }

  return manual > 0 ? manual : automatic || null;
}

function convertToCRC(amount, currency) {
  if (currency === "CRC") return amount;

  const rate = exchangeRate(currency);

  if (!rate || !Number.isFinite(rate)) return null;

  return amount * rate;
}

function convertToBase(amount, currency) {
  const crc = convertToCRC(amount, currency);

  if (crc === null) return null;

  const baseRate = exchangeRate(state.baseCurrency);

  if (state.baseCurrency === "CRC") return crc;
  if (!baseRate) return null;

  return crc / baseRate;
}

function sumConverted(items, currencyField = "currency", amountField = "amount") {
  let total = 0;

  for (const item of items) {
    const converted = convertToBase(
      Number(item[amountField]),
      item[currencyField]
    );

    if (converted !== null) total += converted;
  }

  return total;
}

/* =====================================================
   MENSAJES
   ===================================================== */

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

/* =====================================================
   GUÍA INTERACTIVA
   ===================================================== */

const GUIDE_STORAGE_KEY = "misFinanzasGuideSeen";

let guideStep = 0;

const GUIDE_STEPS = [
  { icon: "👋", title: "guideWelcomeTitle", text: "guideWelcomeText" },
  { icon: "💰", title: "guideIncomeTitle", text: "guideIncomeText" },
  { icon: "🧾", title: "guideExpensesTitle", text: "guideExpensesText" },
  { icon: "🐷", title: "guideSavingsTitle", text: "guideSavingsText" },
  { icon: "📊", title: "guideBudgetTitle", text: "guideBudgetText" },
  { icon: "💱", title: "guideCurrencyTitle", text: "guideCurrencyText" },
  { icon: "💳", title: "guideDebtsTitle", text: "guideDebtsText" },
  { icon: "🌱", title: "guideTipsTitle", text: "guideTipsText" },
  { icon: "🎉", title: "guideFinishTitle", text: "guideFinishText" }
];

function setupGuide() {
  if (!$("mf-guide-overlay")) {
    const style = document.createElement("style");

    style.textContent = `
      .mf-guide-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(17, 24, 39, .72);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px;
      }

      .mf-guide-overlay[hidden] {
        display: none !important;
      }

      .mf-guide-card {
        width: 100%;
        max-width: 430px;
        background: #fff;
        color: #202938;
        border-radius: 22px;
        padding: 28px 22px 22px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,.22);
        animation: mfGuideIn .25s ease;
      }

      .mf-guide-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .mf-guide-card h2 {
        font-size: 22px;
        margin: 0 0 12px;
        color: #111827;
      }

      .mf-guide-card p {
        font-size: 15px;
        line-height: 1.6;
        color: #657080;
        margin: 0 0 22px;
      }

      .mf-guide-progress {
        height: 6px;
        background: #e7ebf0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 12px;
      }

      .mf-guide-progress span {
        display: block;
        height: 100%;
        background: #159b70;
        transition: width .2s ease;
      }

      .mf-guide-step {
        display: block;
        color: #7b8493;
        font-size: 12px;
        margin-bottom: 20px;
      }

      .mf-guide-actions {
        display: flex;
        gap: 9px;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .mf-guide-actions button {
        border: 0;
        border-radius: 12px;
        padding: 12px 15px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }

      .mf-guide-primary {
        background: #111827;
        color: white;
        flex: 1;
      }

      .mf-guide-secondary {
        background: #f0f2f5;
        color: #374151;
      }

      .mf-guide-skip {
        display: block;
        margin: 17px auto 0;
        border: 0;
        background: none;
        color: #7b8493;
        font-size: 13px;
        cursor: pointer;
      }

      .mf-guide-open-button {
        display: block;
        width: 100%;
        margin-top: 14px;
        padding: 14px;
        border: 1px solid #e7ebf0;
        border-radius: 12px;
        background: white;
        color: #202938;
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        cursor: pointer;
      }

      @keyframes mfGuideIn {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    document.head.appendChild(style);

    const overlay = document.createElement("div");

    overlay.id = "mf-guide-overlay";
    overlay.className = "mf-guide-overlay";
    overlay.hidden = true;

    overlay.innerHTML = `
      <div class="mf-guide-card" role="dialog"
           aria-modal="true" aria-labelledby="mf-guide-title">

        <div class="mf-guide-icon" id="mf-guide-icon"></div>
        <h2 id="mf-guide-title"></h2>
        <p id="mf-guide-text"></p>

        <div class="mf-guide-progress">
          <span id="mf-guide-progress"></span>
        </div>

        <small class="mf-guide-step" id="mf-guide-step"></small>

        <div class="mf-guide-actions">
          <button type="button" class="mf-guide-secondary"
                  id="mf-guide-previous"></button>

          <button type="button" class="mf-guide-primary"
                  id="mf-guide-next"></button>
        </div>

        <button type="button" class="mf-guide-skip"
                id="mf-guide-skip"></button>
      </div>
    `;

    document.body.appendChild(overlay);

    $("mf-guide-next").addEventListener("click", nextGuideStep);
    $("mf-guide-previous").addEventListener("click", previousGuideStep);
    $("mf-guide-skip").addEventListener("click", finishGuide);

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && !$("mf-guide-overlay").hidden) {
        finishGuide();
      }
    });
  }

  const moreSection = $("mas");

  if (moreSection && !$("boton-guia-uso")) {
    const guideButton = document.createElement("button");

    guideButton.id = "boton-guia-uso";
    guideButton.type = "button";
    guideButton.className = "mf-guide-open-button";
    guideButton.textContent = "📖 " + t("guide");

    guideButton.addEventListener("click", openGuide);

    moreSection.appendChild(guideButton);
  }

  if (!localStorage.getItem(GUIDE_STORAGE_KEY)) {
    setTimeout(() => openGuide(), 500);
  }
}

function openGuide() {
  guideStep = 0;

  const overlay = $("mf-guide-overlay");

  if (!overlay) return;

  overlay.hidden = false;
  renderGuideStep();
}

function renderGuideStep() {
  const step = GUIDE_STEPS[guideStep];
  const isLast = guideStep === GUIDE_STEPS.length - 1;

  $("mf-guide-icon").textContent = step.icon;
  $("mf-guide-title").textContent = t(step.title);
  $("mf-guide-text").textContent = t(step.text);

  $("mf-guide-progress").style.width =
    `${((guideStep + 1) / GUIDE_STEPS.length) * 100}%`;

  $("mf-guide-step").textContent =
    `${t("guideStep")} ${guideStep + 1} / ${GUIDE_STEPS.length}`;

  $("mf-guide-previous").textContent = t("guidePrevious");
  $("mf-guide-previous").hidden = guideStep === 0;

  $("mf-guide-next").textContent = isLast
    ? t("guideStart")
    : t("guideNext");

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

  const overlay = $("mf-guide-overlay");

  if (overlay) overlay.hidden = true;
}

/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function showSection(sectionId, options = {}) {
  const target = $(sectionId);

  if (!target || !target.classList.contains("page-section")) return;

  const previousSection = currentSection;

  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.toggle("active", section.id === sectionId);
  });

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle("active", button.dataset.section === sectionId);
  });

  currentSection = sectionId;

  if (!options.skipHistory && previousSection !== sectionId) {
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

      if (type !== "saving") {
        $("tipo-movimiento").value = type;
        $("descripcion-movimiento").focus();
      } else {
        $("nombre-ahorro").focus();
      }
    }
  });

  $("header-settings").addEventListener("click", () => {
    showSection("configuracion");
  });

  $("home-title").addEventListener("click", () => {
    showSection("inicio");
  });

  $("boton-mas").addEventListener("click", () => {
    showSection("mas");
  });

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

/* =====================================================
   INGRESOS Y GASTOS
   ===================================================== */

function addMovement(event) {
  event.preventDefault();

  const amount = Number($("monto-movimiento").value);

  if (!Number.isFinite(amount) || amount <= 0) {
    showToast(t("conversionUnavailable"));
    return;
  }

  const currency = $("moneda-movimiento").value;

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

/* =====================================================
   AHORROS
   ===================================================== */

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

/* =====================================================
   PRESUPUESTO
   ===================================================== */

function saveBudget(event) {
  event.preventDefault();

  const amount = Number($("monto-presupuesto").value);

  if (!Number.isFinite(amount) || amount < 0) return;

  const currency = $("moneda-presupuesto").value;

  if (convertToBase(amount, currency) === null) {
    showToast(t("manualRateMissing") + currency);
    return;
  }

  state.budget = { amount, currency };

  saveState();
  renderAll();
  showToast(t("budgetSaved"));
}

/* =====================================================
   MOVIMIENTOS RECURRENTES
   ===================================================== */

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

/* =====================================================
   MÓDULO DE DEUDAS
   ===================================================== */

function debtStatus(debt) {
  if (Number(debt.remaining) <= 0.000001) {
    return "paid";
  }

  if (debt.dueDate && debt.dueDate < todayISO()) {
    return "overdue";
  }

  return "pending";
}

function debtStatusText(status) {
  return t(status);
}

function debtTotalPaid(debt) {
  return (debt.payments || []).reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );
}

function addDebt(event) {
  event.preventDefault();

  const person = $("persona-deuda").value.trim();
  const description = $("descripcion-deuda").value.trim();
  const amount = Number($("monto-deuda").value);
  const currency = $("moneda-deuda").value;
  const type = $("tipo-deuda").value;
  const createdDate = $("fecha-creacion-deuda").value || todayISO();
  const dueDate = $("fecha-vencimiento-deuda").value;
  const notes = $("notas-deuda").value.trim();

  if (!person) {
    showToast(t("debtPersonRequired"));
    return;
  }

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !["receivable", "payable"].includes(type)
  ) {
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
    description,
    amount,
    remaining: amount,
    currency,
    createdDate,
    dueDate,
    notes,
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

  if (!debt) return;

  if (debtStatus(debt) === "paid") return;

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

  if (debt.remaining < 0.000001) {
    debt.remaining = 0;
  }

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

  const paymentHistory = (debt.payments || []).length
    ? `
      <div class="debt-history">
        <strong>${t("paymentHistory")}</strong>

        ${(debt.payments || []).map(payment => `
          <div class="debt-payment-item">
            <span>${safeText(dateText(payment.date))}</span>
            <strong>${formatMoney(Number(payment.amount), payment.currency || debt.currency)}</strong>
            ${payment.notes
              ? `<small>${safeText(payment.notes)}</small>`
              : ""}
          </div>
        `).join("")}
      </div>
    `
    : `<div class="debt-history"><small>${t("noPayments")}</small></div>`;

  return `
    <article class="debt-item">

      <div class="debt-header">
        <div class="debt-info">
          <strong>${safeText(debt.person)}</strong>
          <small>${safeText(debt.description || t(debt.type))}</small>
        </div>

        <span class="debt-status ${status}">
          ${debtStatusText(status)}
        </span>
      </div>

      <div class="debt-details">
        <div class="debt-detail">
          <small>${t("debtOriginal")}</small>
          <strong>${formatMoney(Number(debt.amount), debt.currency)}</strong>
        </div>

        <div class="debt-detail">
          <small>${t("debtPaid")}</small>
          <strong>${formatMoney(paid, debt.currency)}</strong>
        </div>

        <div class="debt-detail">
          <small>${t("debtBalance")}</small>
          <strong class="debt-amount">
            ${formatMoney(Number(debt.remaining), debt.currency)}
          </strong>
        </div>

        <div class="debt-detail">
          <small>${t("creationDate")}</small>
          <span>${safeText(dateText(debt.createdDate))}</span>
        </div>

        <div class="debt-detail">
          <small>${t("dueDate")}</small>
          <span>${debt.dueDate
            ? safeText(dateText(debt.dueDate))
            : t("debtNoDueDate")}
          </span>
        </div>
      </div>

      <div class="debt-progress-track">
        <div class="debt-progress-fill"
             style="width:${percentage}%"></div>
      </div>

      <small>${t("debtProgress")}: ${Math.round(percentage)}%</small>

      ${debt.notes
        ? `<p class="debt-notes">${safeText(debt.notes)}</p>`
        : ""}

      <div class="debt-actions">
        ${status !== "paid"
          ? `<button type="button"
               class="debt-payment-button"
               data-debt-payment="${safeText(debt.id)}">
               ${t("addPayment")}
             </button>`
          : ""}

        <button type="button"
          class="debt-history-button"
          data-debt-history="${safeText(debt.id)}">
          ${t("paymentHistory")}
        </button>

        <button type="button"
          class="debt-delete-button"
          data-debt-delete="${safeText(debt.id)}">
          ${t("delete")}
        </button>
      </div>

      <div class="debt-history-container" id="debt-history-${safeText(debt.id)}" hidden>
        ${paymentHistory}
      </div>

    </article>
  `;
}

function renderDebts() {
  const receivable = state.debts.filter(
    debt => debt.type === "receivable"
  );

  const payable = state.debts.filter(
    debt => debt.type === "payable"
  );

  const receivableTotal = sumConverted(
    receivable,
    "currency",
    "remaining"
  );

  const payableTotal = sumConverted(
    payable,
    "currency",
    "remaining"
  );

  if ($("total-deudas-cobrar")) {
    $("total-deudas-cobrar").textContent = formatMoney(receivableTotal);
  }

  if ($("total-deudas-pagar")) {
    $("total-deudas-pagar").textContent = formatMoney(payableTotal);
  }

  const receivableList = $("lista-deudas-cobrar");
  const payableList = $("lista-deudas-pagar");

  if (receivableList) {
    receivableList.innerHTML = receivable.length
      ? receivable.map(renderDebt).join("")
      : `<div class="debt-empty">${t("noDebts")}</div>`;
  }

  if (payableList) {
    payableList.innerHTML = payable.length
      ? payable.map(renderDebt).join("")
      : `<div class="debt-empty">${t("noDebts")}</div>`;
  }
}

function setupDebtButtons() {
  document.addEventListener("click", event => {
    const paymentButton = event.target.closest("[data-debt-payment]");

    if (paymentButton) {
      addDebtPayment(paymentButton.dataset.debtPayment);
      return;
    }

    const deleteButton = event.target.closest("[data-debt-delete]");

    if (deleteButton) {
      deleteDebt(deleteButton.dataset.debtDelete);
      return;
    }

    const historyButton = event.target.closest("[data-debt-history]");

    if (historyButton) {
      const id = historyButton.dataset.debtHistory;
      const container = $(`debt-history-${id}`);

      if (container) {
        container.hidden = !container.hidden;
      }
    }
  });
}

/* =====================================================
   CATEGORÍAS Y FORMATO
   ===================================================== */

function categoryName(category) {
  const key = {
    salary: "catSalary",
    business: "catBusiness",
    food: "catFood",
    housing: "catHousing",
    transport: "catTransport",
    health: "catHealth",
    entertainment: "catEntertainment",
    debt: "catDebt",
    other: "catOther"
  }[category];

  return key ? t(key) : category;
}

function dateText(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat(
    state.language === "en" ? "en-US" : "es-CR"
  ).format(new Date(date + "T12:00:00"));
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* =====================================================
   VISUALIZACIÓN DE MOVIMIENTOS
   ===================================================== */

function renderMovement(item, isSaving = false) {
  const type = isSaving ? "saving" : item.type;

  const sign = type === "income" ? "+" :
    type === "expense" ? "−" : "";

  const amountClass = type === "income" ? "amount-income" :
    type === "expense" ? "amount-expense" : "";

  const title = isSaving ? item.name : item.description;

  const subtitle = isSaving
    ? dateText(item.date)
    : `${categoryName(item.category)} · ${dateText(item.date)}`;

  return `
    <article class="movement-item">
      <div class="movement-icon">
        ${type === "income" ? "↗" : type === "expense" ? "↘" : "🐷"}
      </div>

      <div class="movement-info">
        <strong>${safeText(title)}</strong>
        <small>${safeText(subtitle)}</small>
      </div>

      <div class="movement-amount">
        <strong class="${amountClass}">
          ${sign}${formatMoney(Number(item.amount), item.currency)}
        </strong>
        <small>
          ${formatMoney(convertToBase(Number(item.amount), item.currency) ?? 0)}
        </small>
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

  if (!items.length) {
    element.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }

  element.innerHTML = items
    .map(item => renderMovement(item, isSaving))
    .join("");
}

function renderRecurring() {
  const element = $("lista-recurrentes");

  if (!element) return;

  if (!state.recurring.length) {
    element.innerHTML = `<div class="empty-state">${t("noRecurring")}</div>`;
    return;
  }

  element.innerHTML = state.recurring.map(item => `
    <article class="movement-item">
      <div class="movement-icon">🔁</div>

      <div class="movement-info">
        <strong>${safeText(item.description)}</strong>
        <small>
          ${t(item.frequency)} · ${t(item.type === "income" ? "income" : "expenses")}
        </small>
      </div>

      <div class="movement-amount">
        <strong>${formatMoney(item.amount, item.currency)}</strong>
        <small>${formatMoney(convertToBase(item.amount, item.currency) ?? 0)}</small>
      </div>

      <button class="delete-button" type="button"
        data-delete="recurring" data-id="${safeText(item.id)}">×</button>
    </article>
  `).join("");
}

/* =====================================================
   PANEL PRINCIPAL
   ===================================================== */

function renderDashboard() {
  const incomes = state.movements.filter(
    item => item.type === "income"
  );

  const expenses = state.movements.filter(
    item => item.type === "expense"
  );

  const totalIncome = sumConverted(incomes);
  const totalExpense = sumConverted(expenses);
  const totalSavings = sumConverted(state.savings);

  const budget = convertToBase(
    state.budget.amount,
    state.budget.currency
  ) ?? 0;

  // Balance tradicional: no incluye abonos de deudas.
  const balance = totalIncome - totalExpense - totalSavings;

  // Abonos recibidos aumentan el dinero disponible.
  const receivedPayments = state.debts
    .filter(debt => debt.type === "receivable")
    .flatMap(debt => debt.payments || []);

  // Abonos pagados reducen el dinero disponible.
  const paidPayments = state.debts
    .filter(debt => debt.type === "payable")
    .flatMap(debt => debt.payments || []);

  const receivedTotal = sumConverted(receivedPayments);
  const paidTotal = sumConverted(paidPayments);

  const availableMoney = balance + receivedTotal - paidTotal;

  $("balance-total").textContent = formatMoney(balance);
  $("total-ingresos").textContent = formatMoney(totalIncome);
  $("total-gastos").textContent = formatMoney(totalExpense);
  $("total-ahorros").textContent = formatMoney(totalSavings);
  $("total-presupuesto").textContent = formatMoney(budget);
  $("total-disponible").textContent = formatMoney(availableMoney);
  $("ahorros-total-pagina").textContent = formatMoney(totalSavings);

  const greeting = state.userName
    ? t("helloName").replace("{name}", safeText(state.userName))
    : t("hello");

  $("greeting-personalizado").textContent = greeting;

  $("estadistica-ingresos").textContent = formatMoney(totalIncome);
  $("estadistica-gastos").textContent = formatMoney(totalExpense);
  $("estadistica-ahorros").textContent = formatMoney(totalSavings);
  $("estadistica-balance").textContent = formatMoney(balance);

  const spent = expenses.reduce((sum, item) =>
    sum + (convertToBase(item.amount, item.currency) ?? 0), 0);

  const percentage = budget > 0
    ? Math.min(100, spent / budget * 100)
    : 0;

  $("porcentaje-presupuesto").textContent =
    `${Math.round(budget > 0 ? spent / budget * 100 : 0)}%`;

  $("barra-presupuesto").style.width = `${percentage}%`;
  $("presupuesto-gastado").textContent = formatMoney(spent);
  $("presupuesto-restante").textContent = formatMoney(budget - spent);

  if (budget <= 0) {
    $("presupuesto-restante").textContent = t("emptyBudget");
  }

  renderList(
    "lista-movimientos-inicio",
    state.movements.slice(0, 5),
    t("noMovements")
  );

  renderList(
    "lista-movimientos",
    state.movements,
    t("noMovements")
  );

  renderList(
    "lista-ahorros",
    state.savings,
    t("noSavings"),
    true
  );
}

/* =====================================================
   ESTADÍSTICAS
   ===================================================== */

function renderChart() {
  const totals = {};

  state.movements
    .filter(item => item.type === "expense")
    .forEach(item => {
      const value = convertToBase(item.amount, item.currency);

      if (value !== null) {
        totals[item.category] =
          (totals[item.category] || 0) + value;
      }
    });

  const entries = Object.entries(totals)
    .sort((a, b) => b[1] - a[1]);

  const maximum = Math.max(
    1,
    ...entries.map(entry => entry[1])
  );

  $("grafico-resumen").innerHTML = entries.length
    ? entries.map(([category, amount]) => `
      <div class="chart-row">
        <span>${safeText(categoryName(category))}</span>

        <div class="chart-track">
          <div class="chart-bar"
               style="width:${amount / maximum * 100}%"></div>
        </div>

        <strong>${formatMoney(amount)}</strong>
      </div>
    `).join("")
    : `<div class="empty-state">${t("noMovements")}</div>`;
}

/* =====================================================
   TIPOS DE CAMBIO
   ===================================================== */

function renderManualRates() {
  $("campos-tasas").innerHTML = CURRENCIES
    .filter(code => code !== "CRC")
    .map(code => `
      <div class="manual-rate-row">
        <span>${code}</span>

        <input type="number" min="0.000001" step="any"
          data-rate="${code}"
          value="${Number(state.manualRates[code]) || ""}"
          aria-label="${code}">
      </div>
    `).join("");

  document.querySelectorAll('input[name="modo-cambio"]')
    .forEach(radio => {
      radio.checked = radio.value === state.exchangeMode;
    });

  $("tasas-manuales").hidden =
    state.exchangeMode === "automatic";
}

/* =====================================================
   ACTUALIZACIÓN GENERAL
   ===================================================== */

function renderAll() {
  renderDashboard();
  renderRecurring();
  renderChart();
  renderManualRates();
  renderDebts();

  $("monto-presupuesto").value =
    state.budget.amount || "";

  $("moneda-presupuesto").value =
    state.budget.currency || state.baseCurrency;
}

/* =====================================================
   ELIMINACIÓN DE REGISTROS
   ===================================================== */

function deleteRecord(type, id) {
  if (!confirm(t("confirmDelete"))) return;

  if (type === "movement") {
    state.movements = state.movements.filter(
      item => item.id !== id
    );
  } else if (type === "saving") {
    state.savings = state.savings.filter(
      item => item.id !== id
    );
  } else if (type === "recurring") {
    state.recurring = state.recurring.filter(
      item => item.id !== id
    );
  }

  saveState();
  renderAll();
  showToast(t("deleted"));
}

function setupDeleteButtons() {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-delete]");

    if (!button) return;

    deleteRecord(
      button.dataset.delete,
      button.dataset.id
    );
  });

  $("clear-movements").addEventListener("click", () => {
    if (!confirm(t("confirmClear"))) return;

    state.movements = [];

    saveState();
    renderAll();
  });
}

/* =====================================================
   CONFIGURACIÓN
   ===================================================== */

function setupSettings() {
  $("selector-idioma").addEventListener("change", event => {
    state.language = event.target.value;

    saveState();
    translatePage();
  });

  $("moneda-principal").addEventListener("change", event => {
    state.baseCurrency = event.target.value;

    saveState();

    document.querySelectorAll(".currency-select").forEach(select => {
      if (!select.value) {
        select.value = state.baseCurrency;
      }
    });

    renderAll();
  });

  $("guardar-nombre").addEventListener("click", () => {
    state.userName = $("nombre-usuario")
      .value.trim()
      .slice(0, 40);

    saveState();
    renderAll();
    showToast(t("nameSaved"));
  });

  document.querySelectorAll('input[name="modo-cambio"]')
    .forEach(radio => {
      radio.addEventListener("change", event => {
        state.exchangeMode = event.target.value;

        saveState();
        renderAll();
      });
    });

  $("guardar-tasas").addEventListener("click", () => {
    document.querySelectorAll("[data-rate]").forEach(input => {
      const value = Number(input.value);

      if (value > 0) {
        state.manualRates[input.dataset.rate] = value;
      }
    });

    saveState();
    renderAll();
    showToast(t("ratesSaved"));
  });

  $("actualizar-cambios").addEventListener(
    "click",
    updateExchangeRates
  );

  $("exportar-datos").addEventListener("click", exportData);

  $("boton-salir").addEventListener("click", () => {
    if (!confirm(t("confirmExit"))) return;

    window.close();
    showToast(t("exitHelp"));
  });
}

/* =====================================================
   ACTUALIZACIÓN AUTOMÁTICA DE DIVISAS
   ===================================================== */

async function updateExchangeRates() {
  $("estado-cambios").textContent = t("loading");

  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid rates");
    }

    const usdToCRC = Number(data.rates.CRC);

    if (!usdToCRC) {
      throw new Error("CRC rate missing");
    }

    const rates = { CRC: 1 };

    CURRENCIES
      .filter(code => code !== "CRC")
      .forEach(code => {
        const usdToCurrency = Number(data.rates[code]);

        if (usdToCurrency > 0) {
          rates[code] = usdToCRC / usdToCurrency;
        }
      });

    state.onlineRates = rates;

    state.ratesUpdatedAt =
      data.time_last_update_utc || new Date().toISOString();

    saveState();
    renderAll();

    $("estado-cambios").textContent =
      t("rateSource") + " " + state.ratesUpdatedAt;

    showToast(t("ratesUpdated"));
  } catch (error) {
    $("estado-cambios").textContent = t("ratesError");
    showToast(t("ratesError"));
  }
}

/* =====================================================
   EXPORTACIÓN DE DATOS
   ===================================================== */

function exportData() {
  const content = JSON.stringify(state, null, 2);

  const blob = new Blob(
    [content],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "mis-finanzas-backup.json";
  link.click();

  URL.revokeObjectURL(url);

  showToast(t("exported"));
}

/* =====================================================
   FORMULARIOS
   ===================================================== */

function setupForms() {
  $("form-movimiento").addEventListener(
    "submit",
    addMovement
  );

  $("form-ahorro").addEventListener(
    "submit",
    addSaving
  );

  $("form-presupuesto").addEventListener(
    "submit",
    saveBudget
  );

  $("form-recurrente").addEventListener(
    "submit",
    addRecurring
  );

  const debtForm = $("form-deuda");

  if (debtForm) {
    debtForm.addEventListener("submit", addDebt);
  }
}

/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

function initialize() {
  setupCurrencies();
  setupNavigation();
  setupForms();
  setupDeleteButtons();
  setupDebtButtons();
  setupSettings();
  setupGuide();

  $("selector-idioma").value = state.language;
  $("moneda-principal").value = state.baseCurrency;
  $("nombre-usuario").value = state.userName || "";

  document.querySelectorAll(".currency-select").forEach(select => {
    if (!select.value) {
      select.value = state.baseCurrency;
    }
  });

  $("moneda-presupuesto").value = state.budget.currency;

  $("fecha-movimiento").value = todayISO();
  $("fecha-ahorro").value = todayISO();

  if ($("fecha-creacion-deuda")) {
    $("fecha-creacion-deuda").value = todayISO();
  }

  translatePage();
  saveState();

  if (!state.onlineRates && navigator.onLine) {
    updateExchangeRates();
  }
}

document.addEventListener("DOMContentLoaded", initialize);
