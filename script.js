let movimientos =
    JSON.parse(localStorage.getItem("movimientos")) || [];

let presupuestos =
    JSON.parse(localStorage.getItem("presupuestos")) || {};

let recurrentes =
    JSON.parse(localStorage.getItem("recurrentes")) || [];

let filtroActual = null;

let grafico = null;

let estaEnInicio = true;


/* =========================
   GUARDAR
========================= */

function guardarMovimientos() {
    localStorage.setItem(
        "movimientos",
        JSON.stringify(movimientos)
    );
}

function guardarPresupuestos() {
    localStorage.setItem(
        "presupuestos",
        JSON.stringify(presupuestos)
    );
}

function guardarRecurrentes() {
    localStorage.setItem(
        "recurrentes",
        JSON.stringify(recurrentes)
    );
}


/* =========================
   MONEDA
========================= */

function formatoMoneda(valor) {

    return new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC",
        maximumFractionDigits: 0
    }).format(valor);

}


/* =========================
   INICIO
========================= */

function irAInicio() {

    estaEnInicio = true;

    window.scrollTo(0, 0);

}


/* =========================
   AGREGAR MOVIMIENTO
========================= */

function agregarMovimiento() {

    const tipo =
        document.getElementById("tipo").value;

    const descripcion =
        document.getElementById("descripcion").value.trim();

    const monto =
        Number(
            document.getElementById("monto").value
        );

    const categoria =
        document.getElementById("categoria").value;

    const tipoGasto =
        document.getElementById("tipoGasto").value;


    if (!descripcion || monto <= 0) {

        alert(
            "Completa la descripción y el monto."
        );

        return;
    }


    movimientos.push({

        id: Date.now(),

        tipo: tipo,

        descripcion: descripcion,

        monto: monto,

        categoria: categoria,

        tipoGasto:
            tipo === "gasto"
                ? tipoGasto
                : "",

        fecha:
            new Date().toISOString()

    });


    guardarMovimientos();


    document.getElementById(
        "descripcion"
    ).value = "";


    document.getElementById(
        "monto"
    ).value = "";


    actualizarTodo();


    irAInicio();

}


/* =========================
   ELIMINAR
========================= */

function eliminarMovimiento(id) {

    movimientos =
        movimientos.filter(
            m => m.id !== id
        );

    guardarMovimientos();

    actualizarTodo();

}


function eliminarTodos() {

    if (movimientos.length === 0) {

        alert("No hay movimientos.");

        return;
    }


    if (
        !confirm(
            "¿Seguro que quieres eliminar todos los movimientos?"
        )
    ) {

        return;

    }


    movimientos = [];

    guardarMovimientos();

    actualizarTodo();

}


/* =========================
   FILTRO
========================= */

function filtrarPorMes() {

    const valor =
        document.getElementById(
            "filtroMes"
        ).value;

    filtroActual =
        valor || null;

    actualizarTodo();

}


function mostrarTodos() {

    filtroActual = null;

    document.getElementById(
        "filtroMes"
    ).value = "";

    actualizarTodo();

}


/* =========================
   MOVIMIENTOS FILTRADOS
========================= */

function obtenerMovimientosFiltrados() {

    if (!filtroActual) {

        return movimientos;

    }


    return movimientos.filter(m => {

        if (!m.fecha) return false;


        const fecha =
            new Date(m.fecha);


        const año =
            fecha.getFullYear();


        const mes =
            String(
                fecha.getMonth() + 1
            ).padStart(2, "0");


        return `${año}-${mes}` ===
            filtroActual;

    });

}


/* =========================
   FINANZAS
========================= */

function calcularFinanzas(lista) {

    let ingresos = 0;

    let fijos = 0;

    let variables = 0;


    lista.forEach(m => {

        if (m.tipo === "ingreso") {

            ingresos +=
                Number(m.monto);

        }


        if (m.tipo === "gasto") {

            if (
                m.tipoGasto === "fijo"
            ) {

                fijos +=
                    Number(m.monto);

            }

            else {

                variables +=
                    Number(m.monto);

            }

        }

    });


    const gastos =
        fijos + variables;


    const disponible =
        ingresos - gastos;


    return {
        ingresos,
        fijos,
        variables,
        gastos,
        disponible
    };

}


/* =========================
   DISPONIBLE
========================= */

function actualizarDineroDisponible() {

    const finanzas =
        calcularFinanzas(
            obtenerMovimientosFiltrados()
        );


    document.getElementById(
        "dineroIngresos"
    ).textContent =
        formatoMoneda(
            finanzas.ingresos
        );


    document.getElementById(
        "dineroFijos"
    ).textContent =
        formatoMoneda(
            finanzas.fijos
        );


    document.getElementById(
        "dineroDespuesFijos"
    ).textContent =
        formatoMoneda(
            finanzas.ingresos -
            finanzas.fijos
        );


    document.getElementById(
        "dineroVariables"
    ).textContent =
        formatoMoneda(
            finanzas.variables
        );


    document.getElementById(
        "dineroDisponible"
    ).textContent =
        formatoMoneda(
            finanzas.disponible
        );

}


/* =========================
   DASHBOARD
========================= */

function actualizarDashboard() {

    const finanzas =
        calcularFinanzas(
            obtenerMovimientosFiltrados()
        );


    document.getElementById(
        "dashboardIngresos"
    ).textContent =
        formatoMoneda(
            finanzas.ingresos
        );


    document.getElementById(
        "dashboardFijos"
    ).textContent =
        formatoMoneda(
            finanzas.fijos
        );


    document.getElementById(
        "dashboardVariables"
    ).textContent =
        formatoMoneda(
            finanzas.variables
        );


    document.getElementById(
        "dashboardDisponible"
    ).textContent =
        formatoMoneda(
            finanzas.disponible
        );


    let porcentaje = 0;


    if (finanzas.ingresos > 0) {

        porcentaje =
            (
                finanzas.gastos /
                finanzas.ingresos
            ) * 100;

    }


    document.getElementById(
        "porcentajeCompromiso"
    ).textContent =
        Math.round(porcentaje) + "%";


    document.getElementById(
        "barraCompromiso"
    ).style.width =
        Math.min(
            porcentaje,
            100
        ) + "%";


    const mensaje =
        document.getElementById(
            "mensajeDashboard"
        );


    if (
        finanzas.ingresos === 0
    ) {

        mensaje.textContent =
            "Agrega un ingreso para comenzar.";

    }

    else if (
        finanzas.disponible < 0
    ) {

        mensaje.textContent =
            "🚨 Estás gastando más de lo que ingresas.";

    }

    else if (
        porcentaje >= 80
    ) {

        mensaje.textContent =
            "⚠️ La mayor parte de tus ingresos está comprometida.";

    }

    else if (
        porcentaje >= 50
    ) {

        mensaje.textContent =
            "⚠️ Más de la mitad de tus ingresos está comprometida.";

    }

    else {

        mensaje.textContent =
            "✅ Tu nivel de gastos está bajo control.";

    }

}


/* =========================
   RESUMEN
========================= */

function actualizarResumen() {

    const finanzas =
        calcularFinanzas(
            obtenerMovimientosFiltrados()
        );


    document.getElementById(
        "totalIngresos"
    ).textContent =
        formatoMoneda(
            finanzas.ingresos
        );


    document.getElementById(
        "totalGastos"
    ).textContent =
        formatoMoneda(
            finanzas.gastos
        );


    document.getElementById(
        "saldo"
    ).textContent =
        formatoMoneda(
            finanzas.disponible
        );

}


/* =========================
   TIPOS
========================= */

function actualizarTiposGasto() {

    const finanzas =
        calcularFinanzas(
            obtenerMovimientosFiltrados()
        );


    document.getElementById(
        "totalFijos"
    ).textContent =
        formatoMoneda(
            finanzas.fijos
        );


    document.getElementById(
        "totalVariables"
    ).textContent =
        formatoMoneda(
            finanzas.variables
        );

}


/* =========================
   MOVIMIENTOS
========================= */

function mostrarMovimientos() {

    const contenedor =
        document.getElementById(
            "listaMovimientos"
        );


    const lista =
        obtenerMovimientosFiltrados();


    if (lista.length === 0) {

        contenedor.innerHTML =
            "<p>No hay movimientos.</p>";

        return;

    }


    contenedor.innerHTML = "";


    [...lista]
        .reverse()
        .forEach(m => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "movimiento " +
                (
                    m.tipo === "ingreso"
                        ? "movimiento-ingreso"
                        : "movimiento-gasto"
                );


            const fecha =
                m.fecha
                    ? new Date(
                        m.fecha
                    ).toLocaleDateString(
                        "es-CR"
                    )
                    : "";


            const signo =
                m.tipo === "ingreso"
                    ? "+"
                    : "-";


            const tipoTexto =
                m.tipo === "ingreso"
                    ? "Ingreso"
                    : `Gasto ${
                        m.tipoGasto ||
                        "variable"
                    }`;


            div.innerHTML = `

                <div class="movimiento-header">

                    <div class="movimiento-descripcion">
                        ${m.descripcion}
                    </div>

                    <div class="movimiento-monto">
                        ${signo}${formatoMoneda(m.monto)}
                    </div>

                </div>

                <div class="movimiento-info">
                    ${m.categoria}
                    ·
                    ${tipoTexto}
                    ·
                    ${fecha}
                </div>

                <button
                    onclick="eliminarMovimiento(${m.id})"
                >
                    🗑️ Eliminar
                </button>

            `;


            contenedor.appendChild(div);

        });

}


/* =========================
   CATEGORIAS
========================= */

function obtenerCategorias() {

    const categorias = {};


    obtenerMovimientosFiltrados()
        .filter(
            m => m.tipo === "gasto"
        )
        .forEach(m => {

            const categoria =
                m.categoria ||
                "Otros";


            categorias[categoria] =
                (
                    categorias[categoria] ||
                    0
                ) +
                Number(m.monto);

        });


    return categorias;

}


function mostrarCategorias() {

    const contenedor =
        document.getElementById(
            "listaCategorias"
        );


    const categorias =
        obtenerCategorias();


    contenedor.innerHTML = "";


    const ordenadas =
        Object.entries(categorias)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    if (
        ordenadas.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No hay gastos.</p>";

        return;

    }


    ordenadas.forEach(
        ([categoria, monto]) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "categoria-item";


            div.innerHTML = `

                <span>
                    ${categoria}
                </span>

                <strong>
                    ${formatoMoneda(monto)}
                </strong>

            `;


            contenedor.appendChild(div);

        }
    );

}


/* =========================
   GRAFICO
========================= */

function crearGrafico() {

    const categorias =
        obtenerCategorias();


    const canvas =
        document.getElementById(
            "graficoCategorias"
        );


    if (grafico) {

        grafico.destroy();

        grafico = null;

    }


    if (
        Object.keys(categorias)
            .length === 0
    ) {

        return;

    }


    grafico =
        new Chart(
            canvas,
            {

                type: "doughnut",

                data: {

                    labels:
                        Object.keys(
                            categorias
                        ),

                    datasets: [

                        {
                            data:
                                Object.values(
                                    categorias
                                )
                        }

                    ]

                },

                options: {

                    responsive: true,

                    animation: false,

                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );

}


/* =========================
   PRESUPUESTO
========================= */

function guardarPresupuesto() {

    const mes =
        document.getElementById(
            "mesPresupuesto"
        ).value;


    const monto =
        Number(
            document.getElementById(
                "montoPresupuesto"
            ).value
        );


    if (
        !mes ||
        monto <= 0
    ) {

        alert(
            "Selecciona un mes y coloca un presupuesto válido."
        );

        return;

    }


    presupuestos[mes] =
        monto;


    guardarPresupuestos();


    actualizarTodo();

}


function actualizarPresupuesto() {

    let mes =
        document.getElementById(
            "mesPresupuesto"
        ).value;


    if (!mes) {

        const hoy =
            new Date();


        mes =
            `${hoy.getFullYear()}-${
                String(
                    hoy.getMonth() + 1
                ).padStart(2, "0")
            }`;


        document.getElementById(
            "mesPresupuesto"
        ).value =
            mes;

    }


    const presupuesto =
        Number(
            presupuestos[mes] || 0
        );


    const movimientosMes =
        movimientos.filter(m => {

            if (!m.fecha)
                return false;


            const fecha =
                new Date(m.fecha);


            const fechaMes =
                `${fecha.getFullYear()}-${
                    String(
                        fecha.getMonth() + 1
                    ).padStart(2, "0")
                }`;


            return fechaMes === mes;

        });


    const gastado =
        movimientosMes
            .filter(
                m => m.tipo === "gasto"
            )
            .reduce(
                (total, m) =>
                    total +
                    Number(m.monto),
                0
            );


    const disponible =
        presupuesto -
        gastado;


    document.getElementById(
        "presupuestoActual"
    ).textContent =
        formatoMoneda(
            presupuesto
        );


    document.getElementById(
        "presupuestoGastado"
    ).textContent =
        formatoMoneda(
            gastado
        );


    document.getElementById(
        "presupuestoDisponible"
    ).textContent =
        formatoMoneda(
            disponible
        );


    let porcentaje = 0;


    if (presupuesto > 0) {

        porcentaje =
            (
                gastado /
                presupuesto
            ) * 100;

    }


    document.getElementById(
        "barraPresupuesto"
    ).style.width =
        Math.min(
            porcentaje,
            100
        ) + "%";


    const mensaje =
        document.getElementById(
            "mensajePresupuesto"
        );


    if (!presupuesto) {

        mensaje.textContent =
            "Define un presupuesto para este mes.";

    }

    else if (
        gastado >= presupuesto
    ) {

        mensaje.textContent =
            "🚨 Has superado tu presupuesto.";

    }

    else if (
        porcentaje >= 80
    ) {

        mensaje.textContent =
            "⚠️ Has utilizado más del 80%.";

    }

    else {

        mensaje.textContent =
            "✅ Vas dentro de tu presupuesto.";

    }

}


/* =========================
   RECURRENTES
========================= */

function agregarRecurrente() {

    const descripcion =
        document.getElementById(
            "recurrenteDescripcion"
        ).value.trim();


    const monto =
        Number(
            document.getElementById(
                "recurrenteMonto"
            ).value
        );


    const categoria =
        document.getElementById(
            "recurrenteCategoria"
        ).value;


    const dia =
        Number(
            document.getElementById(
                "recurrenteDia"
            ).value
        );


    if (
        !descripcion ||
        monto <= 0 ||
        dia < 1 ||
        dia > 31
    ) {

        alert(
            "Completa correctamente los datos."
        );

        return;

    }


    recurrentes.push({

        id: Date.now(),

        descripcion,

        monto,

        categoria,

        dia

    });


    guardarRecurrentes();


    document.getElementById(
        "recurrenteDescripcion"
    ).value = "";


    document.getElementById(
        "recurrenteMonto"
    ).value = "";


    document.getElementById(
        "recurrenteDia"
    ).value = "";


    mostrarRecurrentes();

}


function mostrarRecurrentes() {

    const contenedor =
        document.getElementById(
            "listaRecurrentes"
        );


    contenedor.innerHTML = "";


    if (
        recurrentes.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No tienes gastos recurrentes.</p>";

        return;

    }


    recurrentes.forEach(r => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "recurrente";


        div.innerHTML = `

            <strong>
                ${r.descripcion}
            </strong>

            <p>
                ${formatoMoneda(r.monto)}
                · ${r.categoria}
                · Día ${r.dia}
            </p>

            <button
                onclick="eliminarRecurrente(${r.id})"
            >
                🗑️ Eliminar
            </button>

        `;


        contenedor.appendChild(div);

    });

}


function eliminarRecurrente(id) {

    recurrentes =
        recurrentes.filter(
            r => r.id !== id
        );


    guardarRecurrentes();

    mostrarRecurrentes();

}


function generarRecurrentesDelMes() {

    let mes =
        document.getElementById(
            "mesPresupuesto"
        ).value;


    if (!mes) {

        const hoy =
            new Date();


        mes =
            `${hoy.getFullYear()}-${
                String(
                    hoy.getMonth() + 1
                ).padStart(2, "0")
            }`;

    }


    const partes =
        mes.split("-");


    const año =
        Number(partes[0]);


    const mesNumero =
        Number(partes[1]);


    let generados = 0;


    recurrentes.forEach(r => {

        const yaExiste =
            movimientos.some(m =>
                m.recurrenteId === r.id &&
                m.mesGenerado === mes
            );


        if (yaExiste)
            return;


        const ultimoDia =
            new Date(
                año,
                mesNumero,
                0
            ).getDate();


        const diaReal =
            Math.min(
                r.dia,
                ultimoDia
            );


        const fecha =
            new Date(
                año,
                mesNumero - 1,
                diaReal,
                12,
                0,
                0
            );


        movimientos.push({

            id:
                Date.now() +
                generados,

            tipo: "gasto",

            descripcion:
                r.descripcion,

            monto:
                r.monto,

            categoria:
                r.categoria,

            tipoGasto:
                "fijo",

            fecha:
                fecha.toISOString(),

            recurrenteId:
                r.id,

            mesGenerado:
                mes

        });


        generados++;

    });


    guardarMovimientos();

    actualizarTodo();


    alert(
        generados === 0
            ? "Los gastos de este mes ya estaban generados."
            : `Se generaron ${generados} gasto(s).`
    );

}


/* =========================
   CONSEJOS
========================= */

function generarConsejos() {

    const contenedor =
        document.getElementById(
            "listaConsejos"
        );


    const lista =
        obtenerMovimientosFiltrados();


    const finanzas =
        calcularFinanzas(lista);


    const consejos = [];


    if (
        finanzas.ingresos === 0
    ) {

        consejos.push({

            tipo: "info",

            titulo:
                "💡 Registra tus ingresos",

            texto:
                "Agrega tu salario u otras entradas de dinero para comenzar el análisis."

        });

    }


    if (
        finanzas.disponible < 0
    ) {

        consejos.push({

            tipo: "danger",

            titulo:
                "🚨 Gastas más de lo que ingresas",

            texto:
                `Estás gastando ${formatoMoneda(
                    Math.abs(
                        finanzas.disponible
                    )
                )} más de lo que ingresas.`

        });

    }


    if (
        finanzas.ingresos > 0 &&
        finanzas.disponible > 0
    ) {

        consejos.push({

            tipo: "success",

            titulo:
                "💰 Dinero disponible",

            texto:
                `Tienes ${formatoMoneda(
                    finanzas.disponible
                )} disponibles después de los gastos registrados.`

        });

    }


    if (
        finanzas.ingresos > 0
    ) {

        const compromiso =
            (
                finanzas.gastos /
                finanzas.ingresos
            ) * 100;


        if (
            compromiso >= 80
        ) {

            consejos.push({

                tipo: "danger",

                titulo:
                    "⚠️ Gastos muy altos",

                texto:
                    `Tienes comprometido aproximadamente el ${Math.round(
                        compromiso
                    )}% de tus ingresos.`

            });

        }

        else if (
            compromiso >= 50
        ) {

            consejos.push({

                tipo: "warning",

                titulo:
                    "👀 Vigila tus gastos",

                texto:
                    `Has comprometido aproximadamente el ${Math.round(
                        compromiso
                    )}% de tus ingresos.`

            });

        }

    }


    if (
        finanzas.ingresos > 0
    ) {

        const porcentajeFijos =
            (
                finanzas.fijos /
                finanzas.ingresos
            ) * 100;


        if (
            porcentajeFijos >= 50
        ) {

            consejos.push({

                tipo: "danger",

                titulo:
                    "🔒 Gastos fijos elevados",

                texto:
                    `Tus gastos fijos representan aproximadamente el ${Math.round(
                        porcentajeFijos
                    )}% de tus ingresos.`

            });

        }

        else if (
            porcentajeFijos >= 30
        ) {

            consejos.push({

                tipo: "warning",

                titulo:
                    "🔒 Revisa tus gastos fijos",

                texto:
                    `Tus gastos fijos representan aproximadamente el ${Math.round(
                        porcentajeFijos
                    )}% de tus ingresos.`

            });

        }

    }


    const categorias =
        obtenerCategorias();


    const ordenadas =
        Object.entries(categorias)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    if (
        ordenadas.length > 0 &&
        finanzas.gastos > 0
    ) {

        const categoria =
            ordenadas[0][0];


        const monto =
            ordenadas[0][1];


        const porcentaje =
            (
                monto /
                finanzas.gastos
            ) * 100;


        if (
            porcentaje >= 30
        ) {

            consejos.push({

                tipo: "warning",

                titulo:
                    `📊 Mayor gasto: ${categoria}`,

                texto:
                    `${categoria} representa aproximadamente el ${Math.round(
                        porcentaje
                    )}% de tus gastos.`

            });

        }

    }


    const mes =
        document.getElementById(
            "mesPresupuesto"
        ).value;


    const presupuesto =
        Number(
            presupuestos[mes] || 0
        );


    if (
        presupuesto > 0
    ) {

        const gastado =
            movimientos
                .filter(m => {

                    if (!m.fecha)
                        return false;


                    const fecha =
                        new Date(m.fecha);


                    const fechaMes =
                        `${fecha.getFullYear()}-${
                            String(
                                fecha.getMonth() + 1
                            ).padStart(2, "0")
                        }`;


                    return (
                        fechaMes === mes &&
                        m.tipo === "gasto"
                    );

                })
                .reduce(
                    (total, m) =>
                        total +
                        Number(m.monto),
                    0
                );


        const porcentaje =
            (
                gastado /
                presupuesto
            ) * 100;


        if (
            porcentaje >= 100
        ) {

            consejos.push({

                tipo: "danger",

                titulo:
                    "🚨 Presupuesto superado",

                texto:
                    `Has gastado ${formatoMoneda(
                        gastado
                    )} de ${formatoMoneda(
                        presupuesto
                    )}.`

            });

        }

        else if (
            porcentaje >= 80
        ) {

            consejos.push({

                tipo: "warning",

                titulo:
                    "⚠️ Presupuesto cerca del límite",

                texto:
                    `Ya utilizaste aproximadamente el ${Math.round(
                        porcentaje
                    )}% de tu presupuesto.`

            });

        }

        else {

            consejos.push({

                tipo: "success",

                titulo:
                    "🎯 Presupuesto bajo control",

                texto:
                    `Has utilizado aproximadamente el ${Math.round(
                        porcentaje
                    )}% de tu presupuesto.`

            });

        }

    }


    contenedor.innerHTML = "";


    consejos.forEach(c => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            `consejo ${c.tipo}`;


        div.innerHTML = `

            <strong>
                ${c.titulo}
            </strong>

            <p>
                ${c.texto}
            </p>

        `;


        contenedor.appendChild(div);

    });


    if (
        consejos.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="consejo success">

                <strong>
                    ✅ Todo se ve bien
                </strong>

                <p>
                    Sigue registrando tus movimientos para obtener mejores recomendaciones.
                </p>

            </div>

        `;

    }

}


/* =========================
   EXPORTAR DATOS
========================= */

function exportarDatos() {

    try {

        const datos = {

            version: 1,

            fechaExportacion:
                new Date().toISOString(),

            movimientos:
                movimientos,

            presupuestos:
                presupuestos,

            recurrentes:
                recurrentes

        };


        const contenido =
            JSON.stringify(
                datos,
                null,
                2
            );


        const blob =
            new Blob(
                [contenido],
                {
                    type:
                        "application/json"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const enlace =
            document.createElement(
                "a"
            );


        const fecha =
            new Date()
                .toISOString()
                .split("T")[0];


        enlace.href =
            url;


        enlace.download =
            `mis-finanzas-respaldo-${fecha}.json`;


        enlace.style.display =
            "none";


        document.body.appendChild(
            enlace
        );


        enlace.click();


        setTimeout(() => {

            document.body.removeChild(
                enlace
            );

            URL.revokeObjectURL(
                url
            );

        }, 1000);


        alert(
            "✅ Copia de seguridad preparada. Revisa la carpeta de descargas."
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ No se pudo crear la copia de seguridad."
        );

    }

}


/* =========================
   IMPORTAR DATOS
========================= */

function importarDatos(event) {

    const archivo =
        event.target.files[0];


    if (!archivo)
        return;


    const lector =
        new FileReader();


    lector.onload =
        function(e) {

            try {

                const datos =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !Array.isArray(
                        datos.movimientos
                    ) ||
                    typeof datos.presupuestos !==
                        "object" ||
                    !Array.isArray(
                        datos.recurrentes
                    )
                ) {

                    alert(
                        "❌ El archivo no es un respaldo válido."
                    );

                    return;

                }


                if (
                    !confirm(
                        "Esto reemplazará tus datos actuales. ¿Continuar?"
                    )
                ) {

                    return;

                }


                movimientos =
                    datos.movimientos;


                presupuestos =
                    datos.presupuestos;


                recurrentes =
                    datos.recurrentes;


                guardarMovimientos();

                guardarPresupuestos();

                guardarRecurrentes();


                actualizarTodo();


                alert(
                    "✅ Datos restaurados correctamente."
                );

            }

            catch (error) {

                console.error(error);

                alert(
                    "❌ No se pudo leer el archivo."
                );

            }

        };


    lector.readAsText(
        archivo
    );

}


/* =========================
   ACTUALIZAR TODO
========================= */

function actualizarTodo() {

    actualizarDashboard();

    actualizarDineroDisponible();

    actualizarResumen();

    actualizarTiposGasto();

    actualizarPresupuesto();

    mostrarMovimientos();

    mostrarCategorias();

    crearGrafico();

    mostrarRecurrentes();

    generarConsejos();

}


/* =========================
   BOTÓN ATRÁS ANDROID
========================= */

window.addEventListener(
    "popstate",
    function() {

        if (!estaEnInicio) {

            estaEnInicio = true;

            window.scrollTo(
                0,
                0
            );

            history.pushState(
                {
                    inicio: true
                },
                "",
                "#inicio"
            );

            return;

        }

        /*
         * En navegador no podemos
         * cerrar la aplicación.
         *
         * Cuando esto sea APK,
         * aquí conectaremos el
         * botón Atrás de Android
         * con el cierre real.
         */

        alert(
            "Para salir, cierra la ventana de la aplicación."
        );

    }
);


/* =========================
   DETECTAR NAVEGACION
========================= */

document.addEventListener(
    "click",
    function(event) {

        const enlace =
            event.target.closest(
                ".bottom-nav a"
            );


        if (!enlace)
            return;


        const destino =
            enlace.getAttribute(
                "href"
            );


        if (
            destino !== "#inicio"
        ) {

            estaEnInicio = false;

            history.pushState(
                {
                    seccion: destino
                },
                "",
                destino
            );

        }

        else {

            estaEnInicio = true;

            history.pushState(
                {
                    inicio: true
                },
                "",
                "#inicio"
            );

        }

    }
);


/* =========================
   INICIO
========================= */

history.replaceState(
    {
        inicio: true
    },
    "",
    "#inicio"
);


mostrarRecurrentes();

actualizarTodo();