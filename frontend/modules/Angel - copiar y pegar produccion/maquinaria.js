// –––––––––––––––– CARGAR MÁQUINAS, MANTENIMIENTOS Y LÍNEAS DISPONIBLES ––––––––––––––––
let machines = []
let lineas = []

document.addEventListener("DOMContentLoaded", async () => {
    // Cargar máquinas
    machines = await getMachines().then((json) => { return json.machines })
    console.log('Maquinaria:', machines)

    // Cargar mantenimientos
    updateMaintenance()

    // TODO ANGEL: Cargar líneas disponibles
    // Cargar líneas disponibles
    // lineas = await getLines().then((json) => { return json.lines })
    // Esto es para las pruebas
    lineas = [1, 2, 3]
    // Actualizar las líneas disponibles en los formularios de asignación y liberación
    const lineasRelease = document.getElementById("release-line")
    const lineasAssign = document.getElementById("assign-line")
    updateLines(lineas, lineasRelease, lineasAssign)

})

// Obtener máquinas del servidor
async function getMachines () {
    const response = await fetch('/api/mantenimiento/')
    return response.json()
}

// Añadir líneas según las disponibles
function updateLines(lineas, lineasRelease, lineasAssign) {
    lineas.forEach((line) => {
        const option = document.createElement("option")
        option.value = line
        option.textContent = `Línea ${line}`
        lineasRelease.appendChild(option)
        lineasAssign.appendChild(option.cloneNode(true))
    })
}

// Revisar mantenimientos de máquinas
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

            if(diferencia <= 604800000 && machine.line !== 0) {
                // Notificar al usuario
                maintainMachines.push(machine)
                count +=1
            }
        }
    })

    if (count > 0) {
        // Notificar al usuario
        alert(`Alerta: Hay ${count} máquinas con mantenimientos próximos.`)
        // Sortear máquinas por fecha de mantenimiento
        maintainMachines.sort((a, b) => {
            return strToDate(a.dateMaintenance) - strToDate(b.dateMaintenance)
        })

        // Agregar a lista de mantenimientos
        maintainMachines.forEach((machine) => {
            const dateMaintenance = strToDate(machine.dateMaintenance)
            const diferencia = dateMaintenance - today
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
            mantenimientos.innerHTML += `<li> Máquina ${machine.id}: Línea ${machine.line} - Mantenimiento ${machine.typeMaintenance} en ${dias} días. </li>`
        })
    }
}

// Formatear fechas de DB a formato local
// Formatear fechas del HTML para evitar cosas locas del GMT
function strToDate(dateString) {
    return new Date(dateString.replaceAll('-', '/'))
}


// ————————————————— CARGAR CANTIDAD DE MÁQUINAS —————————————————
function machineCount(line, type) {
    const machinesLine = machines.filter((machine) => machine.line == line && machine.type == type)
    return machinesLine.length
}

// –––––––––––––––– NOTIFICAR MÁQUINA ––––––––––––––––
const notifyForm = document.getElementById("notify-form")
const idInput = document.getElementById("id-number")
let validId = false

// Validar input y cambiar estilo del mismo según se ingrese una id válida
idInput.addEventListener('keyup', (e) => {
    const id = idInput.value 
    // Buscar la máquina con la id ingresada
    const machine = machines.find((machine) => machine.id == id)

    // Sólo se permiten máquinas disponibles o en uso
    if(machine && (machine.state === 'disponible' || machine.state === 'uso')) {
        idInput.style.border = '1.5px solid lightgreen'
        validId = true
    }
    else {
        idInput.style.border = '1.5px solid lightcoral'
        validId = false
    }
})

// Añadir evento de notificación
notifyForm.addEventListener('submit', async (e) => {   
    e.preventDefault()

    let state = document.getElementById("machine-state").value
    const machine = machines.find((machine) => machine.id == idInput.value)

    if (validId) {
        // Notificación de irregularidad
        if (state === "irregularidad") {
            const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state: "notificada", line: machine.line, availability: machine.availability})
            })

            // Respuesta según el estado de la petición
            if (response.status !== 500) {
                // Limpiar formulario
                idInput.value = ""
                state = ""

                // Notificar al usuario
                alert(`Máquina ${machine.id} notificada con irregularidad.`)


                // Actualizar lista de máquinas
                machines = await getMachines().then((json) => { return json.machines })
                updateMaintenance()
            }
            else {
                alert('Error al añadir máquina, revise la consola y/o servidor')
            }
        }
        // Notificación de defecto
        else if (state === "defectuosa") {
            const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state: "defectuosa", line: 0, availability: 0})
            })

            // Respuesta según el estado de la petición
            if (response.status !== 500) {
                // Limpiar formulario
                idInput.value = ""
                state = ""

                // Notificar al usuario
                if (machine.line !== 0) {
                    alert(`Máquina ${machine.id} notificada con defecto, la misma ha sido removida de la línea ${machine.line}.`)
                }
                else {
                    alert(`Máquina ${machine.id} notificada con defecto.`)
                }

                // Actualizar lista de máquinas
                machines = await getMachines().then((json) => { return json.machines })
            }
            else {
                alert('Error al añadir máquina, revise la consola y/o servidor')
            }
        }
        else {
            alert("Seleccione un estado para el reporte.")
        }
    }
    else {
        alert("Ingrese una id válida. Recuerde que la máquina debe estar disponible o en uso.")
    }
})


// –––––––––––––––– LIBERAR MÁQUINAS ––––––––––––––––
// Obtener elementos del DOM
let lineasRelease = document.getElementById("release-line")
const displayRelease = document.getElementById("release-display")
const releaseForm = document.getElementById("release-form")

// Display de máquinas según la línea seleccionada
lineasRelease.addEventListener('change', (e) => {
    displayRelease.innerHTML = ""
    const line = lineasRelease.value
    if (line !== "") {
        const machinesLine = machines.filter((machine) => machine.line == line)
        machinesLine.forEach((machine) => {
            displayRelease.innerHTML+= `<div class='select-square ${machine.state}'> 
                                            <input type="checkbox" id=${machine.id} value=${machine.id}> 
                                            <label for="${machine.id}">${machine.id}</label>
                                        </div>`
        })
    }
})

// Añadir evento de liberación
releaseForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    // Validar formulario
    if (lineasRelease.value !== "") {
        const machinesSelected = Array.from(displayRelease.querySelectorAll('input[type="checkbox"]:checked'))

        if (machinesSelected.length > 0) {
            // Liberar máquinas seleccionadas
            machinesSelected.forEach(async (machine) => {
                const state = machine.state === "notificada" ? "notificada" : "disponible"
                console.log(state)
                const response = await fetch(`/api/mantenimiento/machine/${machine.id}`, 
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ state: state, line: 0, availability: 1})
                })

                // Respuesta según el estado de la petición
                if (response.status !== 500) {
                    // Limpiar formulario
                    lineasRelease.value = ""
                    displayRelease.innerHTML = ""
                }
                else {
                    alert('Error al liberar máquina, revise la consola y/o servidor')
                }
            })
            // Notificar al usuario
            alert(`Máquinas liberadas de la línea ${lineasRelease.value}.`)

            // Actualizar lista de máquinas
            machines = await getMachines().then((json) => { return json.machines })
            updateMaintenance()
        }
        else {
            alert("Seleccione al menos una máquina")
        }
    }
    else {
        alert("Seleccione una línea")
    }

    
})

// ————————————————— ASIGNAR MÁQUINAS —————————————————
// Obtener elementos del DOM
let lineasAssign = document.getElementById("assign-line")
const tipoAssign = document.getElementById("assign-type")
const displayAssign = document.getElementById("assign-display")
const assignForm = document.getElementById("assign-form")

// Display de máquinas según el tipo seleccionado
tipoAssign.addEventListener('change', (e) => {
    const type = tipoAssign.value
    // Sólo aquellas máquinas disponibles o notificadas
    const machinesType = machines.filter((machine) => machine.type == type && (machine.state === 'disponible' || machine.state === 'notificada'))
    displayAssign.innerHTML = ""
    machinesType.forEach((machine) => {
        displayAssign.innerHTML+= `<div class='select-square ${machine.state}'> 
                                        <input type="checkbox" id=${machine.id}> 
                                        <label for="${machine.id}">${machine.id}</label>
                                    </div>`
    })
})

// Añadir evento de asignación
assignForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    // Validar formulario
    if (lineasAssign.value !== "" && tipoAssign.value !== "") {
        const machinesSelected = Array.from(displayAssign.querySelectorAll('input[type="checkbox"]:checked'))

        if (machinesSelected.length > 0) {
            // Asignar máquinas seleccionadas
            machinesSelected.forEach(async (machine) => {
                const state = machine.state === "notificada" ? "notificada" : "uso"
                const response = await fetch(`/api/mantenimiento/machine/${machine.id}`, 
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ state: state, line: lineasAssign.value, availability: 0})
                })

                // Respuesta según el estado de la petición
                if (response.status !== 500) {
                    // Limpiar formulario
                    lineasAssign.value = ""
                    tipoAssign.value = ""
                    displayAssign.innerHTML = ""
                }
                else {
                    alert('Error al asignar máquina, revise la consola y/o servidor')
                }
            })
            // Notificar al usuario
            alert(`Máquinas asignadas a la línea ${lineasAssign.value}.`)

            // Actualizar lista de máquinas
            machines = await getMachines().then((json) => { return json.machines })
            updateMaintenance()
        }
        else {
            alert("Seleccione al menos una máquina")
        }
    }
    else {
        alert("Seleccione una línea y un tipo de máquina")
    }
})



// –––––––––––––––– FUNCIONALIDAD DE DIALOG PARA BOTONES ––––––––––––––––
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

dialogs.forEach((dialog) => {
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault()
  })
})
