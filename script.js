const $ = id => document.getElementById(id);

let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
let presupuestos = JSON.parse(localStorage.getItem("presupuestos")) || [];
let recurrentes = JSON.parse(localStorage.getItem("recurrentes")) || [];

let moneda = localStorage.getItem("moneda") || "CRC";
let filtroActual = null;
let grafico = null;

const simbolos = {
CRC: "₡",
USD: "$",
EUR: "€",
MXN: "$",
GBP: "£",
BRL: "R$",
COP: "$",
CAD: "$"
};

function guardarDatos() {
localStorage.setItem("movimientos", JSON.stringify(movimientos));
localStorage.setItem("presupuestos", JSON.stringify(presupuestos));
localStorage.setItem("recurrentes", JSON.stringify(recurrentes));
localStorage.setItem("moneda", moneda);
}

function formato(monto) {
return (simbolos[moneda] || "") +
Number(monto || 0).toLocaleString("es-CR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function fechaActual() {
const fecha = new Date();
const año = fecha.getFullYear();
const mes = String(fecha.getMonth() + 1).padStart(2, "0");
const dia = String(fecha.getDate()).padStart(2, "0");

return `${año}-${mes}-${dia}`;

}

function cambiarMoneda() {
moneda = $("selectorMoneda").value;
guardarDatos();
actualizarTodo();
}

function agregarMovimiento() {
const tipo = $("tipo").value;
const descripcion = $("descripcion").value.trim();
const monto = Number($("monto").value);
const categoria = $("categoria").value;
const tipoGasto = $("tipoGasto").value;

if (!descripcion || !Number.isFinite(monto) || monto <= 0) {
    alert("Completa la descripción y coloca un monto válido.");
    return;
}

movimientos.push({
    id: Date.now(),
    tipo,
    descripcion,
    monto,
    categoria,
    tipoGasto: tipo === "gasto" ? tipoGasto : null,
    fecha: fechaActual()
});

$("descripcion").value = "";
$("monto").value = "";

filtroActual = null;
guardarDatos();
actualizarTodo();

alert("Movimiento agregado correctamente.");

}

function obtenerMovimientos() {
if (!filtroActual) return movimientos;

return movimientos.filter(m =>
    m.fecha.startsWith(filtroActual)
);

}

function calcularResumen() {
const lista = obtenerMovimientos();

const ingresos = lista
    .filter(m => m.tipo === "ingreso")
    .reduce((s, m) => s + m.monto, 0);

const gastos = lista
    .filter(m => m.tipo === "gasto")
    .reduce((s, m) => s + m.monto, 0);

const fijos = lista
    .filter(m => m.tipo === "gasto" && m.tipoGasto === "fijo")
    .reduce((s, m) => s + m.monto, 0);

const variables = lista
    .filter(m => m.tipo === "gasto" && m.tipoGasto === "variable")
    .reduce((s, m) => s + m.monto, 0);

return {
    ingresos,
    gastos,
    fijos,
    variables,
    disponible: ingresos - gastos
};

}

function actualizarDashboard() {
const r = calcularResumen();

$("dashboardIngresos").textContent = formato(r.ingresos);
$("dashboardFijos").textContent = formato(r.fijos);
$("dashboardVariables").textContent = formato(r.variables);
$("dashboardDisponible").textContent = formato(r.disponible);

const compromiso = r.ingresos > 0
    ? (r.gastos / r.ingresos) * 100
    : 0;

$("porcentajeCompromiso").textContent =
    Math.round(compromiso) + "%";

$("barraCompromiso").style.width =
    Math.min(100, Math.max(0, compromiso)) + "%";

let mensaje = "";

if (r.ingresos === 0) {
    mensaje = "Agrega tus ingresos para comenzar a controlar tus finanzas.";
} else if (r.disponible < 0) {
    mensaje = "Atención: tus gastos superan tus ingresos.";
} else if (compromiso >= 80) {
    mensaje = "Cuidado: tienes gran parte de tus ingresos comprometidos.";
} else if (compromiso >= 50) {
    mensaje = "Vas avanzando. Revisa tus gastos para mejorar tu ahorro.";
} else {
    mensaje = "¡Excelente! Mantienes tus gastos bajo control.";
}

$("mensajeDashboard").textContent = mensaje;

$("totalIngresos").textContent = formato(r.ingresos);
$("totalGastos").textContent = formato(r.gastos);
$("saldo").textContent = formato(r.disponible);

$("dineroIngresos").textContent = formato(r.ingresos);
$("dineroFijos").textContent = formato(r.fijos);
$("dineroDespuesFijos").textContent =
    formato(r.ingresos - r.fijos);
$("dineroVariables").textContent = formato(r.variables);
$("dineroDisponible").textContent = formato(r.disponible);

}

function filtrarPorMes() {
filtroActual = $("filtroMes").value || null;
actualizarTodo();
}

function mostrarTodos() {
filtroActual = null;
$("filtroMes").value = "";
actualizarTodo();
}

function mostrarMovimientos() {
const contenedor = $("listaMovimientos");
contenedor.innerHTML = "";

const lista = [...obtenerMovimientos()].reverse();

if (lista.length === 0) {
    contenedor.textContent = "No hay movimientos registrados.";
    return;
}

lista.forEach(m => {
    const item = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = m.descripcion;

    const detalle = document.createElement("p");
    detalle.textContent =
        `${m.fecha} | ${m.categoria} | ` +
        `${m.tipo === "ingreso" ? "Ingreso" : "Gasto"}`;

    const monto = document.createElement("p");
    monto.textContent = formato(m.monto);
    monto.style.fontWeight = "bold";
    monto.style.color =
        m.tipo === "ingreso" ? "#059669" : "#dc2626";

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.onclick = () => eliminarMovimiento(m.id);

    item.append(titulo, detalle, monto, eliminar);
    contenedor.appendChild(item);
});

}

function eliminarMovimiento(id) {
if (!confirm("¿Deseas eliminar este movimiento?")) return;

movimientos = movimientos.filter(m => m.id !== id);

guardarDatos();
actualizarTodo();

}

function actualizarGrafico() {
if (typeof Chart === "undefined") return;

const gastos = {};

obtenerMovimientos()
    .filter(m => m.tipo === "gasto")
    .forEach(m => {
        gastos[m.categoria] =
            (gastos[m.categoria] || 0) + m.monto;
    });

const canvas = $("graficoGastos");
if (!canvas) return;

if (grafico) grafico.destroy();

grafico = new Chart(canvas, {
    type: "doughnut",
    data: {
        labels: Object.keys(gastos),
        datasets: [{
            data: Object.values(gastos),
            backgroundColor: [
                "#2563eb",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
                "#06b6d4",
                "#ec4899",
                "#64748b"
            ],
            borderWidth: 2
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
                    label: context =>
                        context.label + ": " +
                        formato(context.raw)
                }
            }
        }
    }
});

}

function agregarPresupuesto() {
const categoria = $("presupuestoCategoria").value;
const monto = Number($("presupuestoMonto").value);

if (!Number.isFinite(monto) || monto <= 0) {
    alert("Ingresa un presupuesto válido.");
    return;
}

presupuestos = presupuestos.filter(p =>
    !(p.categoria === categoria && p.mes === mesActual())
);

presupuestos.push({
    id: Date.now(),
    categoria,
    monto,
    mes: mesActual()
});

$("presupuestoMonto").value = "";

guardarDatos();
mostrarPresupuestos();

alert("Presupuesto guardado.");

}

function mesActual() {
return fechaActual().slice(0, 7);
}

function mostrarPresupuestos() {
const contenedor = $("listaPresupuestos");
contenedor.innerHTML = "";

const mes = filtroActual || mesActual();

const lista = presupuestos.filter(p => p.mes === mes);

if (lista.length === 0) {
    contenedor.textContent = "No hay presupuestos para este mes.";
    return;
}

lista.forEach(p => {
    const gastado = obtenerMovimientos()
        .filter(m =>
            m.tipo === "gasto" &&
            m.categoria === p.categoria &&
            m.fecha.startsWith(p.mes)
        )
        .reduce((s, m) => s + m.monto, 0);

    const restante = p.monto - gastado;

    const item = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = p.categoria;

    const detalle = document.createElement("p");
    detalle.textContent =
        `Presupuesto: ${formato(p.monto)} | Gastado: ${formato(gastado)}`;

    const saldo = document.createElement("p");
    saldo.textContent =
        restante >= 0
            ? `Disponible: ${formato(restante)}`
            : `Excedido por: ${formato(Math.abs(restante))}`;

    saldo.style.color = restante >= 0 ? "#059669" : "#dc2626";

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar presupuesto";
    eliminar.onclick = () => {
        presupuestos = presupuestos.filter(x => x.id !== p.id);
        guardarDatos();
        mostrarPresupuestos();
    };

    item.append(titulo, detalle, saldo, eliminar);
    contenedor.appendChild(item);
});

}

function agregarRecurrente() {
const descripcion = $("recurrenteDescripcion").value.trim();
const monto = Number($("recurrenteMonto").value);
const categoria = $("recurrenteCategoria").value;
const frecuencia = $("recurrenteFrecuencia").value;

if (!descripcion || !Number.isFinite(monto) || monto <= 0) {
    alert("Completa los datos del gasto recurrente.");
    return;
}

recurrentes.push({
    id: Date.now(),
    descripcion,
    monto,
    categoria,
    frecuencia
});

$("recurrenteDescripcion").value = "";
$("recurrenteMonto").value = "";

guardarDatos();
mostrarRecurrentes();

}

function mostrarRecurrentes() {
const contenedor = $("listaRecurrentes");
contenedor.innerHTML = "";

if (recurrentes.length === 0) {
    contenedor.textContent = "No tienes gastos recurrentes registrados.";
    return;
}

recurrentes.forEach(r => {
    const item = document.createElement("div");

    const titulo = document.createElement("strong");
    titulo.textContent = r.descripcion;

    const detalle = document.createElement("p");
    detalle.textContent =
        `${formato(r.monto)} | ${r.categoria} | ${r.frecuencia}`;

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.onclick = () => {
        recurrentes = recurrentes.filter(x => x.id !== r.id);
        guardarDatos();
        mostrarRecurrentes();
    };

    item.append(titulo, detalle, eliminar);
    contenedor.appendChild(item);
});

}

function mostrarConsejos() {
const r = calcularResumen();
const consejos = [];

if (r.ingresos === 0) {
    consejos.push("Registra tus ingresos para conocer tu capacidad financiera.");
} else {
    const porcentaje = r.gastos / r.ingresos * 100;

    if (porcentaje > 80) {
        consejos.push("Tus gastos son elevados. Revisa cuáles puedes reducir.");
    } else {
        consejos.push("Mantén el control de tus gastos y evita compras innecesarias.");
    }

    if (r.disponible > 0) {
        consejos.push("Considera destinar parte de tu dinero disponible al ahorro.");
    } else {
        consejos.push("Prioriza los gastos esenciales y evita aumentar tus deudas.");
    }
}

consejos.push("Establece presupuestos para controlar tus gastos por categoría.");
consejos.push("Revisa periódicamente tus gastos recurrentes.");

const contenedor = $("listaConsejos");
contenedor.innerHTML = "";

consejos.forEach(consejo => {
    const item = document.createElement("div");
    item.textContent = "💡 " + consejo;
    contenedor.appendChild(item);
});

}

function actualizarTodo() {
actualizarDashboard();
mostrarMovimientos();
actualizarGrafico();
mostrarPresupuestos();
mostrarRecurrentes();
mostrarConsejos();
}

document.addEventListener("DOMContentLoaded", () => {
$("selectorMoneda").value = moneda;

if (typeof Chart === "undefined") {
    console.warn("Chart.js no está disponible.");
}

actualizarTodo();

});
