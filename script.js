"use strict";

/* =====================================================
   MIS FINANZAS - MOTOR PRINCIPAL
   Moneda base: CRC
   Datos locales + conversión automática/manual
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
    appTitle: "Mis Finanzas", appSubtitle: "Tu dinero, bajo control",
    totalBalance: "Balance total", availableBalance: "Disponible en tu moneda principal",
    income: "Ingresos", expenses: "Gastos", savings: "Ahorros", budget: "Presupuesto",
    quickActions: "Acciones rápidas", addIncome: "Ingreso", addExpense: "Gasto",
    addSaving: "Ahorrar", setBudget: "Presupuesto", availableMoney: "Dinero disponible",
    availableDescription: "Ingresos menos gastos y ahorros registrados.",
    recentMovements: "Movimientos recientes", seeAll: "Ver todos",
    movements: "Movimientos", movementsDescription: "Controla tus ingresos y gastos.",
    newMovement: "Nuevo movimiento", movementType: "Tipo de movimiento",
    description: "Descripción", amount: "Monto", currency: "Moneda",
    category: "Categoría", date: "Fecha", saveMovement: "Guardar movimiento",
    history: "Historial", clearHistory: "Borrar historial",
    savingsDescription: "Construye tus metas financieras.", totalSaved: "Total ahorrado",
    registerSaving: "Registrar ahorro", savingGoal: "Nombre del ahorro o meta",
    saveSaving: "Guardar ahorro", savingHistory: "Historial de ahorros",
    budgetDescription: "Establece límites para tus gastos.",
    monthlyBudget: "Presupuesto mensual", budgetAmount: "Monto del presupuesto",
    saveBudget: "Guardar presupuesto", budgetProgress: "Uso del presupuesto",
    spent: "Gastado", remaining: "Restante", recurring: "Movimientos recurrentes",
    recurringDescription: "Organiza tus pagos e ingresos frecuentes.",
    frequency: "Frecuencia", monthly: "Mensual", weekly: "Semanal", yearly: "Anual",
    saveRecurring: "Guardar recurrente", statistics: "Estadísticas",
    statisticsDescription: "Un resumen de tus finanzas.", netBalance: "Balance neto",
    expenseDistribution: "Distribución de gastos", tips: "Consejos financieros",
    tipsDescription: "Pequeños hábitos para mejorar tus finanzas.",
    tip1Title: "Págate primero", tip1Text: "Aparta una parte de tus ingresos para ahorrar antes de gastar.",
    tip2Title: "Define metas", tip2Text: "Divide tus objetivos de ahorro en cantidades pequeñas y alcanzables.",
    tip3Title: "Controla tu presupuesto", tip3Text: "Revisa tus gastos cada semana y ajusta tus límites cuando sea necesario.",
    tip4Title: "Reduce gastos hormiga", tip4Text: "Identifica compras pequeñas y frecuentes que afectan tu dinero.",
    tip5Title: "Crea un fondo de emergencia", tip5Text: "Construye una reserva para imprevistos y evita depender del crédito.",
    tip6Title: "Atiende tus deudas", tip6Text: "Prioriza las deudas con intereses altos y evita nuevos compromisos innecesarios.",
    settings: "Configuración", settingsDescription: "Personaliza tu aplicación.",
    language: "Idioma", mainCurrency: "Moneda principal", exchangeRates: "Tipos de cambio",
    exchangeDescription: "La aplicación puede consultar tasas automáticas o utilizar tasas manuales.",
    automatic: "Automático", manual: "Manual", both: "Ambos",
    updateRates: "Actualizar tipos de cambio", manualRates: "Tasas manuales",
    manualRatesDescription: "Indica cuánto vale una unidad de cada moneda en CRC.",
    saveRates: "Guardar tasas manuales", dataManagement: "Datos",
    dataDescription: "Tus registros se guardan localmente en este dispositivo.",
    exportData: "Exportar copia de datos", more: "Más",
    moreDescription: "Otras herramientas de Mis Finanzas.", home: "Inicio",
    catSalary: "Salario", catBusiness: "Negocio", catFood: "Alimentación",
    catHousing: "Vivienda", catTransport: "Transporte", catHealth: "Salud",
    catEntertainment: "Entretenimiento", catDebt: "Deudas", catOther: "Otros",
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
    monthlyShort: "Mensual", today: "Hoy",
    rateStatus: "Última actualización: ", loading: "Consultando tipos de cambio...",
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
    exitHelp: "Para cerrar la aplicación, utiliza el botón de inicio o las aplicaciones recientes de Android."
  },

  en: {
    appTitle: "My Finances", appSubtitle: "Your money, under control",
    totalBalance: "Total balance", availableBalance: "Available in your main currency",
    income: "Income", expenses: "Expenses", savings: "Savings", budget: "Budget",
    quickActions: "Quick actions", addIncome: "Income", addExpense: "Expense",
    addSaving: "Save", setBudget: "Budget", availableMoney: "Available money",
    availableDescription: "Income minus recorded expenses and savings.",
    recentMovements: "Recent transactions", seeAll: "See all",
    movements: "Transactions", movementsDescription: "Track your income and expenses.",
    newMovement: "New transaction", movementType: "Transaction type",
    description: "Description", amount: "Amount", currency: "Currency",
    category: "Category", date: "Date", saveMovement: "Save transaction",
    history: "History", clearHistory: "Clear history",
    savingsDescription: "Build your financial goals.", totalSaved: "Total saved",
    registerSaving: "Record savings", savingGoal: "Savings name or goal",
    saveSaving: "Save savings", savingHistory: "Savings history",
    budgetDescription: "Set limits for your expenses.",
    monthlyBudget: "Monthly budget", budgetAmount: "Budget amount",
    saveBudget: "Save budget", budgetProgress: "Budget usage",
    spent: "Spent", remaining: "Remaining", recurring: "Recurring transactions",
    recurringDescription: "Organize your regular income and payments.",
    frequency: "Frequency", monthly: "Monthly", weekly: "Weekly", yearly: "Yearly",
    saveRecurring: "Save recurring item", statistics: "Statistics",
    statisticsDescription: "An overview of your finances.", netBalance: "Net balance",
    expenseDistribution: "Expense distribution", tips: "Financial tips",
    tipsDescription: "Small habits to improve your finances.",
    tip1Title: "Pay yourself first", tip1Text: "Set aside part of your income for savings before spending.",
    tip2Title: "Set goals", tip2Text: "Break your savings goals into small, achievable amounts.",
    tip3Title: "Track your budget", tip3Text: "Review your expenses weekly and adjust your limits when needed.",
    tip4Title: "Reduce small expenses", tip4Text: "Identify small, frequent purchases that affect your money.",
    tip5Title: "Build an emergency fund", tip5Text: "Build a reserve for unexpected expenses and avoid relying on credit.",
    tip6Title: "Manage your debts", tip6Text: "Prioritize high-interest debts and avoid unnecessary new commitments.",
    settings: "Settings", settingsDescription: "Customize your application.",
    language: "Language", mainCurrency: "Main currency", exchangeRates: "Exchange rates",
    exchangeDescription: "The app can retrieve automatic rates or use manual rates.",
    automatic: "Automatic", manual: "Manual", both: "Both",
    updateRates: "Update exchange rates", manualRates: "Manual rates",
    manualRatesDescription: "Enter how much one unit of each currency is worth in CRC.",
    saveRates: "Save manual rates", dataManagement: "Data",
    dataDescription: "Your records are stored locally on this device.",
    exportData: "Export data backup", more: "More",
    moreDescription: "Other My Finances tools.", home: "Home",
    catSalary: "Salary", catBusiness: "Business", catFood: "Food",
    catHousing: "Housing", catTransport: "Transport", catHealth: "Health",
    catEntertainment: "Entertainment", catDebt: "Debt", catOther: "Other",
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
    monthlyShort: "Monthly", today: "Today",
    rateStatus: "Last updated: ", loading: "Retrieving exchange rates...",
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
    exitHelp: "To close the app, use the Android Home button or the Recent Apps screen."
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
let handlingPopState = false;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("misFinanzasData"));
    return stored ? {
      ...DEFAULT_STATE,
      ...stored,
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
  renderAll();
}

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
}

function todayISO() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
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

  if (state.exchangeMode === "automatic") return automatic || null;
  if (state.exchangeMode === "manual") return manual > 0 ? manual : null;

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

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* Navegación entre secciones y botón Atrás de Android */
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
    handlingPopState = true;

    const previous = event.state?.mfSection;

    if (previous && $(previous)?.classList.contains("page-section")) {
      showSection(previous, { skipHistory: true });
    } else {
      showSection("inicio", { skipHistory: true });
      history.pushState({ mfSection: "inicio" }, "", location.href);
    }

    handlingPopState = false;
  });
}

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

function categoryName(category) {
  const key = {
    salary: "catSalary", business: "catBusiness", food: "catFood",
    housing: "catHousing", transport: "catTransport", health: "catHealth",
    entertainment: "catEntertainment", debt: "catDebt", other: "catOther"
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
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[char]);
}

function renderMovement(item, isSaving = false) {
  const type = isSaving ? "saving" : item.type;
  const sign = type === "income" ? "+" : type === "expense" ? "−" : "";
  const amountClass = type === "income" ? "amount-income" :
    type === "expense" ? "amount-expense" : "";

  const title = isSaving ? item.name : item.description;
  const subtitle = isSaving ? dateText(item.date) :
    `${categoryName(item.category)} · ${dateText(item.date)}`;

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
      <button class="delete-button" type="button" data-delete="${isSaving ? "saving" : "movement"}" data-id="${safeText(item.id)}" aria-label="${t("delete")}">×</button>
    </article>
  `;
}

function renderList(elementId, items, emptyText, isSaving = false) {
  const element = $(elementId);

  if (!items.length) {
    element.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }

  element.innerHTML = items.map(item => renderMovement(item, isSaving)).join("");
}

function renderRecurring() {
  const element = $("lista-recurrentes");

  if (!state.recurring.length) {
    element.innerHTML = `<div class="empty-state">${t("noRecurring")}</div>`;
    return;
  }

  element.innerHTML = state.recurring.map(item => `
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
  `).join("");
}

function renderDashboard() {
  const incomes = state.movements.filter(item => item.type === "income");
  const expenses = state.movements.filter(item => item.type === "expense");

  const totalIncome = sumConverted(incomes);
  const totalExpense = sumConverted(expenses);
  const totalSavings = sumConverted(state.savings);
  const budget = convertToBase(state.budget.amount, state.budget.currency) ?? 0;

  const balance = totalIncome - totalExpense - totalSavings;

  $("balance-total").textContent = formatMoney(balance);
  $("total-ingresos").textContent = formatMoney(totalIncome);
  $("total-gastos").textContent = formatMoney(totalExpense);
  $("total-ahorros").textContent = formatMoney(totalSavings);
  $("total-presupuesto").textContent = formatMoney(budget);
  $("total-disponible").textContent = formatMoney(balance);
  $("ahorros-total-pagina").textContent = formatMoney(totalSavings);

  const greeting = state.userName
    ? t("helloName").replace("{name}", state.userName)
    : t("hello");

  $("greeting-personalizado").textContent = greeting;

  $("estadistica-ingresos").textContent = formatMoney(totalIncome);
  $("estadistica-gastos").textContent = formatMoney(totalExpense);
  $("estadistica-ahorros").textContent = formatMoney(totalSavings);
  $("estadistica-balance").textContent = formatMoney(balance);

  const spent = expenses.reduce((sum, item) =>
    sum + (convertToBase(item.amount, item.currency) ?? 0), 0);

  const percentage = budget > 0 ? Math.min(100, spent / budget * 100) : 0;

  $("porcentaje-presupuesto").textContent =
    `${Math.round(budget > 0 ? spent / budget * 100 : 0)}%`;

  $("barra-presupuesto").style.width = `${percentage}%`;
  $("presupuesto-gastado").textContent = formatMoney(spent);
  $("presupuesto-restante").textContent = formatMoney(budget - spent);

  if (budget <= 0) {
    $("presupuesto-restante").textContent = t("emptyBudget");
  }

  renderList("lista-movimientos-inicio", state.movements.slice(0, 5), t("noMovements"));
  renderList("lista-movimientos", state.movements, t("noMovements"));
  renderList("lista-ahorros", state.savings, t("noSavings"), true);
}

function renderChart() {
  const totals = {};

  state.movements.filter(item => item.type === "expense").forEach(item => {
    const value = convertToBase(item.amount, item.currency);

    if (value !== null) {
      totals[item.category] = (totals[item.category] || 0) + value;
    }
  });

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const maximum = Math.max(1, ...entries.map(entry => entry[1]));

  $("grafico-resumen").innerHTML = entries.length ? entries.map(([category, amount]) => `
    <div class="chart-row">
      <span>${safeText(categoryName(category))}</span>
      <div class="chart-track"><div class="chart-bar" style="width:${amount / maximum * 100}%"></div></div>
      <strong>${formatMoney(amount)}</strong>
    </div>
  `).join("") : `<div class="empty-state">${t("noMovements")}</div>`;
}

function renderManualRates() {
  $("campos-tasas").innerHTML = CURRENCIES.filter(code => code !== "CRC").map(code => `
    <div class="manual-rate-row">
      <span>${code}</span>
      <input type="number" min="0.000001" step="any" data-rate="${code}" value="${Number(state.manualRates[code]) || ""}" aria-label="${code}">
    </div>
  `).join("");

  document.querySelectorAll('input[name="modo-cambio"]').forEach(radio => {
    radio.checked = radio.value === state.exchangeMode;
  });

  $("tasas-manuales").hidden = state.exchangeMode === "automatic";
}

function renderAll() {
  renderDashboard();
  renderRecurring();
  renderChart();
  renderManualRates();

  $("monto-presupuesto").value = state.budget.amount || "";
  $("moneda-presupuesto").value = state.budget.currency || state.baseCurrency;
}

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

  $("clear-movements").addEventListener("click", () => {
    if (!confirm(t("confirmClear"))) return;

    state.movements = [];
    saveState();
    renderAll();
  });
}

function setupSettings() {
  $("selector-idioma").addEventListener("change", event => {
    state.language = event.target.value;
    saveState();
    translatePage();
  });

  $("moneda-principal").addEventListener("change", event => {
    state.baseCurrency = event.target.value;
    saveState();
    renderAll();
  });

  $("guardar-nombre").addEventListener("click", () => {
    state.userName = $("nombre-usuario").value.trim().slice(0, 40);
    saveState();
    renderAll();
    showToast(t("nameSaved"));
  });

  document.querySelectorAll('input[name="modo-cambio"]').forEach(radio => {
    radio.addEventListener("change", event => {
      state.exchangeMode = event.target.value;
      saveState();
      renderAll();
    });
  });

  $("guardar-tasas").addEventListener("click", () => {
    document.querySelectorAll("[data-rate]").forEach(input => {
      const value = Number(input.value);
      if (value > 0) state.manualRates[input.dataset.rate] = value;
    });

    saveState();
    renderAll();
    showToast(t("ratesSaved"));
  });

  $("actualizar-cambios").addEventListener("click", updateExchangeRates);
  $("exportar-datos").addEventListener("click", exportData);

  $("boton-salir").addEventListener("click", () => {
    if (!confirm(t("confirmExit"))) return;

    window.close();
    showToast(t("exitHelp"));
  });
}

async function updateExchangeRates() {
  $("estado-cambios").textContent = t("loading");

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      cache: "no-store"
    });

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid rates");
    }

    const usdToCRC = Number(data.rates.CRC);
    if (!usdToCRC) throw new Error("CRC rate missing");

    const rates = { CRC: 1 };

    CURRENCIES.filter(code => code !== "CRC").forEach(code => {
      const usdToCurrency = Number(data.rates[code]);

      if (usdToCurrency > 0) {
        rates[code] = usdToCRC / usdToCurrency;
      }
    });

    state.onlineRates = rates;
    state.ratesUpdatedAt = data.time_last_update_utc || new Date().toISOString();

    saveState();
    renderAll();

    $("estado-cambios").textContent = t("rateSource") + " " + state.ratesUpdatedAt;
    showToast(t("ratesUpdated"));
  } catch (error) {
    $("estado-cambios").textContent = t("ratesError");
    showToast(t("ratesError"));
  }
}

function exportData() {
  const content = JSON.stringify(state, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "mis-finanzas-backup.json";
  link.click();

  URL.revokeObjectURL(url);
  showToast(t("exported"));
}

function setupForms() {
  $("form-movimiento").addEventListener("submit", addMovement);
  $("form-ahorro").addEventListener("submit", addSaving);
  $("form-presupuesto").addEventListener("submit", saveBudget);
  $("form-recurrente").addEventListener("submit", addRecurring);
}

function initialize() {
  setupCurrencies();
  setupNavigation();
  setupForms();
  setupDeleteButtons();
  setupSettings();

  $("selector-idioma").value = state.language;
  $("moneda-principal").value = state.baseCurrency;
  $("nombre-usuario").value = state.userName || "";

  document.querySelectorAll(".currency-select").forEach(select => {
    select.value = state.baseCurrency;
  });

  $("moneda-presupuesto").value = state.budget.currency;
  $("fecha-movimiento").value = todayISO();
  $("fecha-ahorro").value = todayISO();

  translatePage();
  saveState();

  if (!state.onlineRates && navigator.onLine) {
    updateExchangeRates();
  }
}

document.addEventListener("DOMContentLoaded", initialize);
