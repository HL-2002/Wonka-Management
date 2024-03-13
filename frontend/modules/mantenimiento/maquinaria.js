// –––––––––––––––– CARGAR MÁQUINAS DISPONIBLES ––––––––––––––––
let machines = []

document.addEventListener("DOMContentLoaded", async () => {
    machines = await getMachines().then((json) => { return json.machines })
    console.log('Maquinaria:', machines)
})

async function getMachines () {
    const response = await fetch('http://localhost:3000/api/mantenimiento/')
    return response.json()
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
            const response = await fetch(`http://localhost:3000/api/mantenimiento/machine/${idInput.value}`, 
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
            }
            else {
                alert('Error al añadir máquina, revise la consola y/o servidor')
            }
        }
        // Notificación de defecto
        else if (state === "defectuosa") {
            const response = await fetch(`http://localhost:3000/api/mantenimiento/machine/${idInput.value}`,
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
