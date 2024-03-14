
//id = mD# es maquinas disponibles

//id = mU# es maquinas en uso

//id = mM# es maquinas en mantenimiento **preguntar a mantenimiento si tienen esto

// # es el numero de la linea de produccion de 1-10

/* ID de los productos por numero 
   1 Wonka bar: Barra Wonka
   2 Candied apples: Manzanas acarameladas
   3 Wonka Swirl Lollipops: Chupeta espiral Wonka
   4 Bluebird's egg candy: Caramelo de huevo de p�jaro azul
   5 Rompemuelas eterno: Rompemuelas eterno
   6 Three-course dinner gum: Chicle de cena de tres platos
   7 Stained-glass hard candy: Caramelo duro de vidriera
   8 Wonka whipple-scrumptious fudgemallow delight: Barra delicia de crema, malvavisco y fudge Wonka
   9 Wonka nutty chocolate surprise: Barra sorpresa de chocolate de nueces Wonka
   10 Edible grass: Hierba comestible
*/
/* que hay que hacer?
    4) terminar de decir a mantenimineto de implementar su modulo en los botones (lo haran ellos)
*/

//LLAMANDO A LA API EL ORDERID CUANDO SE DA CLICK A BOTON "ENVIAR"
async function Verificar() {
    const codigoIngresado = document.getElementById('factura').value
    try {
        // Realizar la solicitud GET al servidor mediante la API
        const response = await fetch(`/api/ventas/orders/${codigoIngresado}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        });

        if (response.ok) {
            // Obtener la respuesta en formato JSON
            const Order = await response.json();
            console.log(typeof (Order))
            console.log(Order)
            return await Order
            




        } else {
            // Error al obtener la �ltima orden
            console.error("Hubo un error al obtener la �ltima orden. C�digo de estado:", response.status);
            alert("Hubo un error al obtener la �ltima orden. Por favor, int�ntelo de nuevo m�s tarde.");
        }
    } catch (error) {
        console.error("Error al obtener la �ltima orden:", error);
        alert("Hubo un error al obtener la �ltima orden. Por favor, revise la consola para m�s detalles.");
    }
}
async function getProducts2() {
    try {
        
        
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}
async function crearHTML() {
    try {
        const orders = await Verificar() // Espera a que se resuelva la promesa

        const seccionMantenimiento = document.getElementById('tabla_productos')
        const total = document.getElementById('NumeroTotal')
        const response = await fetch('/api/inventario/products');
        const productoss = await response.json();

        // Filtrar los productos seg�n el atributo categoryId sea igual a 2
        let filteredProducts = productoss.filter(product => product.categoryId === 2);

        // Llamar a la funci�n que agrega los productos filtrados al select
        console.log(filteredProducts)
        seccionMantenimiento.innerHTML = ''
        total.innerHTML = 'Numero total'
        let total_productos = 0
        let n = 1
        console.log(orders)
        filteredProducts.forEach(product => {
            seccionMantenimiento.innerHTML += `
       <table id="${product.id}" class="center">
                        <thead>
                            <tr>
                                <th rowspan="2">
                                    <h3>N# ${n}</h3>
                                </th>
                                <th colspan="4">
                                    <h2>${product.description}</h2>
                                </th>
                            </tr>
                    <tr>
                        <th id="pp${n}">Productos por producir: </th>
                        <th id="mU1">Maquinas en uso: </th>
                        <th id="mM1">Maquinas en mantenimiento: </th>
                        <th id="pf1">Productos fabricados: 0</th>
                    </tr>
                        </thead>
                    </table>
        `
            n++
        })
        n = 1
        orders.products.forEach(producto => {
            const table = document.getElementById(`pp${producto.productId}`);
            table.innerHTML += `${producto.productQuantity}`
                
            n++
            total_productos += producto.productQuantity
        })
        total.innerHTML = `${total_productos}`
    } catch (error) {
        console.error('Error al crear el HTML:', error)
        alert('Hubo un error al crear el HTML. Por favor, revise la consola para m�s detalles.')
    }
}

async function getProducts() {
    try {
        const response = await fetch('/api/inventario/products');
        const products = await response.json();

        // Filtrar los productos seg�n el atributo categoryId sea igual a 2 que busca solo productos no materia prima
        filteredProducts = products.filter(product => product.categoryId === 1);

        // Llamar a la funci�n que agrega los productos filtrados al select
        console.log(filteredProducts)
        crearHTML(filteredProducts);
        filteredProducts.forEach((producto) => {
            const { productId, productQuantity } = producto
            const removeProduct = {
                id: productId,
                sum: '0',
                units: productQuantity
            };
            console.log(removeProduct)
            insertStock(removeProduct);
        });

    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

let orders = []
//BOTON PRODUCIR 
async function Producir() {
    
    orders = await Verificar()
    
    console.log('Maquinaria:', orders)
    const productos = orders.products
    productos.forEach((producto) => {
        const { productId, productQuantity } = producto
        const removeProduct = {
            id: productId,
            sum: 1,
            units: productQuantity
        };
        console.log(removeProduct)
        insertStock(removeProduct);
    });

    
}
async function insertStock(params) {
    try {
        const response = await fetch('/api/inventario/set/product/stock', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        if (response.ok) {
            await response.json()
        } else {
            console.error('Error al insertar el producto:', response.status)
        }
    } catch (error) {
        // console.error('Error de red:', error)
    }
}






// COMIENZO DE MAQUINAS ************************
// ���������������� CARGAR M�QUINAS, MANTENIMIENTOS Y L�NEAS DISPONIBLES ����������������
let machines = []
let lineas = []

document.addEventListener("DOMContentLoaded", async () => {
    // Cargar m�quinas
    machines = await getMachines().then((json) => { return json.machines })
    console.log('Maquinaria:', machines)

    // Cargar mantenimientos
    updateMaintenance()

    // TODO ANGEL: Cargar l�neas disponibles
    // Cargar l�neas disponibles
    // lineas = await getLines().then((json) => { return json.lines })
    // Esto es para las pruebas
    lineas = [1, 2, 3]
    // Actualizar las l�neas disponibles en los formularios de asignaci�n y liberaci�n
    const lineasRelease = document.getElementById("release-line")
    const lineasAssign = document.getElementById("assign-line")
    updateLines(lineas, lineasRelease, lineasAssign)

})

// Obtener m�quinas del servidor
async function getMachines() {
    const response = await fetch('/api/mantenimiento/')
    return response.json()
}

// A�adir l�neas seg�n las disponibles
function updateLines(lineas, lineasRelease, lineasAssign) {
    lineas.forEach((line) => {
        const option = document.createElement("option")
        option.value = line
        option.textContent = `Línea ${line}`
        lineasRelease.appendChild(option)
        lineasAssign.appendChild(option.cloneNode(true))
    })
}

// Revisar mantenimientos de m�quinas
function updateMaintenance() {
    // Obtener elemento del DOM
    const mantenimientos = document.getElementById("mantenimientos")

    // 
    let count = 0
    let maintainMachines = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Limpiar mantenimientos
    mantenimientos.innerHTML = ""

    // Validar proximidad de fecha de mantenimiento
    machines.forEach((machine) => {
        if (machine.typeMaintenance !== null) {
            const dateMaintenance = strToDate(machine.dateMaintenance)
            const diferencia = dateMaintenance - today

            if (diferencia <= 604800000 && machine.line !== 0) {
                // Notificar al usuario
                maintainMachines.push(machine)
                count += 1
            }
        }
    })

    if (count > 0) {
        // Notificar al usuario
        alert(`Alerta: Hay ${count} m�quinas con mantenimientos pr�ximos.`)
        // Sortear m�quinas por fecha de mantenimiento
        maintainMachines.sort((a, b) => {
            return strToDate(a.dateMaintenance) - strToDate(b.dateMaintenance)
        })

        // Agregar a lista de mantenimientos
        maintainMachines.forEach((machine) => {
            const dateMaintenance = strToDate(machine.dateMaintenance)
            const diferencia = dateMaintenance - today
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
            mantenimientos.innerHTML += `<li> M�quina ${machine.id}: L�nea ${machine.line} - Mantenimiento ${machine.typeMaintenance} en ${dias} d�as. </li>`
        })
    }
}

// Formatear fechas de DB a formato local
// Formatear fechas del HTML para evitar cosas locas del GMT
function strToDate(dateString) {
    return new Date(dateString.replaceAll('-', '/'))
}


// ����������������� CARGAR CANTIDAD DE M�QUINAS �����������������
function machineCount(line, type) {
    const machinesLine = machines.filter((machine) => machine.line == line && machine.type == type)
    return machinesLine.length
}

// ���������������� NOTIFICAR M�QUINA ����������������
const notifyForm = document.getElementById("notify-form")
const idInput = document.getElementById("id-number")
let validId = false

// Validar input y cambiar estilo del mismo seg�n se ingrese una id v�lida
idInput.addEventListener('keyup', (e) => {
    const id = idInput.value
    // Buscar la m�quina con la id ingresada
    const machine = machines.find((machine) => machine.id == id)

    // S�lo se permiten m�quinas disponibles o en uso
    if (machine && (machine.state === 'disponible' || machine.state === 'uso')) {
        idInput.style.border = '1.5px solid lightgreen'
        validId = true
    }
    else {
        idInput.style.border = '1.5px solid lightcoral'
        validId = false
    }
})

// A�adir evento de notificaci�n
notifyForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    let state = document.getElementById("machine-state").value
    const machine = machines.find((machine) => machine.id == idInput.value)

    if (validId) {
        // Notificaci�n de irregularidad
        if (state === "irregularidad") {
            const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ state: "notificada", line: machine.line, availability: machine.availability })
                })

            // Respuesta seg�n el estado de la petici�n
            if (response.status !== 500) {
                // Limpiar formulario
                idInput.value = ""
                state = ""

                // Notificar al usuario
                alert(`M�quina ${machine.id} notificada con irregularidad.`)


                // Actualizar lista de m�quinas
                machines = await getMachines().then((json) => { return json.machines })
                updateMaintenance()
            }
            else {
                alert('Error al a�adir m�quina, revise la consola y/o servidor')
            }
        }
        // Notificaci�n de defecto
        else if (state === "defectuosa") {
            const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ state: "defectuosa", line: 0, availability: 0 })
                })

            // Respuesta seg�n el estado de la petici�n
            if (response.status !== 500) {
                // Limpiar formulario
                idInput.value = ""
                state = ""

                // Notificar al usuario
                if (machine.line !== 0) {
                    alert(`M�quina ${machine.id} notificada con defecto, la misma ha sido removida de la l�nea ${machine.line}.`)
                }
                else {
                    alert(`M�quina ${machine.id} notificada con defecto.`)
                }

                // Actualizar lista de m�quinas
                machines = await getMachines().then((json) => { return json.machines })
            }
            else {
                alert('Error al a�adir m�quina, revise la consola y/o servidor')
            }
        }
        else {
            alert("Seleccione un estado para el reporte.")
        }
    }
    else {
        alert("Ingrese una id v�lida. Recuerde que la m�quina debe estar disponible o en uso.")
    }
})


// ���������������� LIBERAR M�QUINAS ����������������
// Obtener elementos del DOM
let lineasRelease = document.getElementById("release-line")
const displayRelease = document.getElementById("release-display")
const releaseForm = document.getElementById("release-form")

// Display de m�quinas seg�n la l�nea seleccionada
lineasRelease.addEventListener('change', (e) => {
    displayRelease.innerHTML = ""
    const line = lineasRelease.value
    if (line !== "") {
        const machinesLine = machines.filter((machine) => machine.line == line)
        machinesLine.forEach((machine) => {
            displayRelease.innerHTML += `<div class='select-square ${machine.state}'> 
                                            <input type="checkbox" id=${machine.id} value=${machine.id}> 
                                            <label for="${machine.id}">${machine.id}</label>
                                        </div>`
        })
    }
})

// A�adir evento de liberaci�n
releaseForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Validar formulario
    if (lineasRelease.value !== "") {
        const machinesSelected = Array.from(displayRelease.querySelectorAll('input[type="checkbox"]:checked'))

        if (machinesSelected.length > 0) {
            // Liberar m�quinas seleccionadas
            machinesSelected.forEach(async (machine) => {
                const state = machine.state === "notificada" ? "notificada" : "disponible"
                console.log(state)
                const response = await fetch(`/api/mantenimiento/machine/${machine.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ state: state, line: 0, availability: 1 })
                    })

                // Respuesta seg�n el estado de la petici�n
                if (response.status !== 500) {
                    // Limpiar formulario
                    lineasRelease.value = ""
                    displayRelease.innerHTML = ""
                }
                else {
                    alert('Error al liberar m�quina, revise la consola y/o servidor')
                }
            })
            // Notificar al usuario
            alert(`M�quinas liberadas de la l�nea ${lineasRelease.value}.`)

            // Actualizar lista de m�quinas
            machines = await getMachines().then((json) => { return json.machines })
            updateMaintenance()
        }
        else {
            alert("Seleccione al menos una m�quina")
        }
    }
    else {
        alert("Seleccione una l�nea")
    }


})

// ����������������� ASIGNAR M�QUINAS �����������������
// Obtener elementos del DOM
let lineasAssign = document.getElementById("assign-line")
const tipoAssign = document.getElementById("assign-type")
const displayAssign = document.getElementById("assign-display")
const assignForm = document.getElementById("assign-form")

// Display de m�quinas seg�n el tipo seleccionado
tipoAssign.addEventListener('change', (e) => {
    const type = tipoAssign.value
    // S�lo aquellas m�quinas disponibles o notificadas
    const machinesType = machines.filter((machine) => machine.type == type && (machine.state === 'disponible' || machine.state === 'notificada'))
    displayAssign.innerHTML = ""
    machinesType.forEach((machine) => {
        displayAssign.innerHTML += `<div class='select-square ${machine.state}'> 
                                        <input type="checkbox" id=${machine.id}> 
                                        <label for="${machine.id}">${machine.id}</label>
                                    </div>`
    })
})

// A�adir evento de asignaci�n
assignForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Validar formulario
    if (lineasAssign.value !== "" && tipoAssign.value !== "") {
        const machinesSelected = Array.from(displayAssign.querySelectorAll('input[type="checkbox"]:checked'))

        if (machinesSelected.length > 0) {
            // Asignar m�quinas seleccionadas
            machinesSelected.forEach(async (machine) => {
                const state = machine.state === "notificada" ? "notificada" : "uso"
                const response = await fetch(`/api/mantenimiento/machine/${machine.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ state: state, line: lineasAssign.value, availability: 0 })
                    })

                // Respuesta seg�n el estado de la petici�n
                if (response.status !== 500) {
                    // Limpiar formulario
                    lineasAssign.value = ""
                    tipoAssign.value = ""
                    displayAssign.innerHTML = ""
                }
                else {
                    alert('Error al asignar m�quina, revise la consola y/o servidor')
                }
            })
            // Notificar al usuario
            alert(`M�quinas asignadas a la l�nea ${lineasAssign.value}.`)

            // Actualizar lista de m�quinas
            machines = await getMachines().then((json) => { return json.machines })
            updateMaintenance()
        }
        else {
            alert("Seleccione al menos una m�quina")
        }
    }
    else {
        alert("Seleccione una l�nea y un tipo de m�quina")
    }
})



// ���������������� FUNCIONALIDAD DE DIALOG PARA BOTONES ����������������
// obtener los botones de abrir y cerrar
const btns = document.querySelectorAll('.btn-open')
const btnsClose = document.querySelectorAll('.close-button')

// recorrer los botones de abrir y agregar el evento click
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dialog = document.getElementById(btn.value)
        dialog.classList.remove('close')
        dialog.classList.add('open')
        dialog.showModal()
    })
})

const dialogs = document.querySelectorAll('.dialog')


btnsClose.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        const dialog = document.getElementById(e.target.parentElement.parentElement.parentElement.id)
        dialog.classList.remove('open')
        dialog.classList.add('close')

        const close = () => {
            dialog.close()
            dialog.removeEventListener('animationend', close)
        }

        dialog.addEventListener('animationend', close)
    })
}
)

dialogs.forEach((dialog) => {
    dialog.addEventListener('cancel', (e) => {
        e.preventDefault()
    })
})

//TERMINA MAQUINAS