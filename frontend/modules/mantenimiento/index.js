// Display de las máquinas y su mantenimiento al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  updateDisplays()
})

// Obtener el array de las máquinas
async function getMachines () {
  const response = await fetch('http://localhost:3000/api/mantenimiento/')
  return response.json()
}

// Actualizar todos los displays y formularios
async function updateDisplays () {
  const machines = await getMachines().then((json) => { return json.machines })
  console.log(machines)
  displayMachines(machines)
  displayMaintenance(machines)
  displayMaintenanceForms(machines)
}

// Actualizar el display de las máquinas
function displayMachines (machines) {
  // Obtener los contenedores de las máquinas
  const chocolateras = document.getElementById('chocolateras')
  const caramelizadoras = document.getElementById('caramelizadoras')
  const carameleras = document.getElementById('carameleras')
  const chicleras = document.getElementById('chicleras')

  // Obtener contenedor de los números de máquinas
  const dataGrid = document.getElementById('grid')

  // Limpiar cada contenedor antes de añadir las máquinas
  chocolateras.innerHTML = ''
  caramelizadoras.innerHTML = ''
  carameleras.innerHTML = ''
  chicleras.innerHTML = ''
  dataGrid.innerHTML = `<div class="grid-item"></div>
                        <div class="grid-item">Chocolateras</div>
                        <div class="grid-item">Caramelizadoras</div>
                        <div class="grid-item">Carameleras</div>
                        <div class="grid-item">Chicleras</div>`

  // Crear colección de máquinas por tipo
  const choco = {
    uso: 0,
    disponible: 0,
    notificada: 0,
    mantenimiento: 0,
    defectuosa: 0
  }

  const cara = structuredClone(choco)
  const caramel = structuredClone(choco)
  const chicl = structuredClone(choco)

  // Crear grid de números por tipo de máquina
  let grid = []
  const total = []

  // Añadir máquinas según su tipo
  machines.forEach((machine) => {
    switch (machine.type) {
      case 'chocolatera':
        choco[machine.state] += 1
        break
      case 'caramelizadora':
        cara[machine.state] += 1
        break
      case 'caramelera':
        caramel[machine.state] += 1
        break
      case 'chiclera':
        chicl[machine.state] += 1
        break
    }
  })

  // Agrupar contenedores y tipos de máquinas para iterar
  const col = [[chocolateras, choco], [caramelizadoras, cara], [carameleras, caramel], [chicleras, chicl]]

  // Display de las máquinas en orden
  col.forEach((set) => {
    const [container, type] = set
    for (const state in type) {
      container.innerHTML += `<div class='square ${state}'></div>`.repeat(type[state])
    }
    // Añadir valores al grid
    const values = Object.values(type)
    grid.push(values)
    total.push(values.reduce((a, b) => a + b, 0))
  })

  // Display de los números en orden
  // Trasponer grid para iterar por columnas y agregar total de máquinas por tipo
  grid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]))
  grid.push(total)

  // Iterar para añadir datos al data_grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = -1; j < grid[i].length; j++) {
      if (j === -1) {
        switch (i) {
          case 0:
            dataGrid.innerHTML += '<p style="color: #9f70fd;" class="first-item">En uso </p>'
            break
          case 1:
            dataGrid.innerHTML += '<p style="color: #42c087;" class="first-item">Disponibles </p>'
            break
          case 2:
            dataGrid.innerHTML += '<p style="color: #f17c37;" class="first-item">Notificadas</p>'
            break
          case 3:
            dataGrid.innerHTML += '<p style="color: #f1c40f;" class="first-item"> Mantenimiento</p>'
            break
          case 4:
            dataGrid.innerHTML += '<p style="color: #e74c3c;" class="first-item">Defectuosas</p>'
            break
          case 5:
            dataGrid.innerHTML += '<p style="color: #34495e;" class="first-item">Total</p>'
            break
        }
      } else {
        dataGrid.innerHTML += `<div class='grid-item'>${grid[i][j]}</div>`
      }
    }
  }
}

function displayMaintenance (machines) {
  // Obtener el contenedor de las máquinas en mantenimiento
  const planificado = document.getElementById('planificado')
  const realizando = document.getElementById('realizando')
  const planificacion = []; const realizacion = []

  // Limpiar contenedores antes de añadir los mantenimientos
  planificado.innerHTML = '<h3> Planificado </h3>'
  realizando.innerHTML = '<h3> Realizando </h3>'

  // Obtener la fecha actual
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  // Obtener máquinas con mantenimiento
  machines.forEach((machine) => {
    if (machine.typeMaintenance !== null) {
      // Obtener fechas de mantenimiento
      machine.dateMaintenance = new Date(machine.dateMaintenance)
      machine.dateAvailability = new Date(machine.dateAvailability)

      // Agrupar máquinas según fecha de mantenimiento
      // Si es menor que la fecha actual o no la tiene, se está realizando
      if (machine.dateMaintenance < date || machine.dateMaintenance === null) {
        realizacion.push(machine)
      } else {
        planificacion.push(machine)
      }
    }
  })

  // Sortear máquinas por fecha de mantenimiento
  planificacion.sort((a, b) => a.dateMaintenance - b.dateMaintenance)
  realizacion.sort((a, b) => a.dateAvailability - b.dateAvailability)

  // Agregar máquinas a su contenedor correspondiente
  planificacion.forEach((machine) => {
    const days = Math.ceil((machine.dateMaintenance - date) / (1000 * 60 * 60 * 24))
    const tag = `<div class="state-container">
                      <div class="state ${machine.typeMaintenance}">${machine.id}</div>
                      <div class="state-info">Mantenimiento en ${days} día(s)</div>
                 </div>`
    planificado.innerHTML += tag
  })

  realizacion.forEach((machine) => {
    const days = Math.ceil((machine.dateAvailability - date) / (1000 * 60 * 60 * 24))
    const tag = `<div class="state-container">
                      <div class="state ${machine.typeMaintenance}">${machine.id}</div>
                      <div class="state-info">Disponible en ${days} día(s)</div>
                 </div>`
    realizando.innerHTML += tag
  })
}

function displayMaintenanceForms (machines) {
  // Formulario de mantenimiento preventivo
  const prevSelect = document.getElementById('prevent-select')
  // Formulario de mantenimiento predictivo
  const predSelect = document.getElementById('predict-select')
  // Formulario de mantenimiento correctivo
  const corSelect = document.getElementById('correct-select')
  // Formulario de modificación de plan
  const mPlanSelect = document.getElementById('mPlan-select')
  // Formulario de modificación de mantenimiento
  const mManSelect = document.getElementById('mMan-select')
  // Fecha para validación
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  machines.forEach((machine) => {
    if ((machine.state === 'uso' || machine.state === 'disponible') &&
        machine.typeMaintenance === null) {
      prevSelect.innerHTML += `<option value="${machine.id}">Máquina ${machine.id}</option>`
    } else if (machine.state === 'notificada' && machine.typeMaintenance !== 'predictivo') {
      predSelect.innerHTML += `<option value="${machine.id}">Máquina ${machine.id}</option>`
    } else if (machine.state === 'defectuosa' && machine.typeMaintenance !== 'correctivo') {
      corSelect.innerHTML += `<option value="${machine.id}">Máquina ${machine.id}</option>`
    } else if ((machine.typeMaintenance === 'preventivo' || machine.typeMaintenance === 'predictivo') &&
            machine.dateMaintenance > date) {
      mPlanSelect.innerHTML += `<option value="${machine.id}">Máquina ${machine.id}</option>`
    } else if (machine.dateAvailability > date) {
      mManSelect.innerHTML += `<option value="${machine.id}">Máquina ${machine.id}</option>`
    }
  })
}

// Añadir máquinas
const addForm = document.getElementById('add').children[0]

// Display validación de id
const idAddInput = document.getElementById('id-maquina')

let Machines

// Obtener el id de la máquina del formulario
idAddInput.onkeyup = async () => {
  const id = idAddInput.value
  if (Machines === undefined) {
    Machines = await getMachines().then((json) => { return json.machines })
  }
  // Validar id entre las máquinas
  for (let i = 0; i < Machines.length; i++) {
    if (Machines[i].id == id) {
      idAddInput.style.border = '1.5px solid lightgreen'
      break
    } else {
      idAddInput.style.border = '1.5px solid lightcoral'
    }
  }
}

// Evento al enviar el formulario
addForm.addEventListener('submit', async (e) => {
  // Evitar que se recargue la página
  e.preventDefault()
  // Obtener el tipo de máquina del formulario y cantidad
  const tipo = document.getElementById('tipo-select').value.toLowerCase()
  const idInput = document.getElementById('id-maquina')
  const id = idInput.value
  if (Machines === undefined) {
    Machines = await getMachines().then((json) => { return json.machines })
  }
  let repeated = false

  // Validar id entre las máquinas
  for (let i = 0; i < Machines.length; i++) {
    if (Machines[i].id == id) {
      repeated = true
      break
    }
  }

  // Crear máquina con tipo dado en la base de datos
  if (!repeated) {
    try {
      const response = await fetch('http://localhost:3000/api/mantenimiento/machine/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, type: tipo })
      })
      alert(`Máquina ${id} tipo ${tipo} añadida`)

      // Clear form
      idInput.value = ''

      // Actualizar las máquinas visibles
      const machines = await getMachines().then((json) => { return json.machines })
      displayMachines(machines)

      displayMaintenanceForms(machines)
      Machines = undefined
    } catch (error) {
      console.error(error)
      alert('Error al añadir máquina, revise la consola y/o servidor')
    }
  } else {
    alert('Id de máquina ya asignada, por favor ingrese un id diferente')
  }
})

// Eliminar máquinas
const deleteForm = document.getElementById('delete').children[0]
// Display validación de id
const idDeleteInput = document.getElementById('id-delete')

// Obtener el id de la máquina del formulario
idDeleteInput.onkeyup = async () => {
  const id = idDeleteInput.value
  if (Machines === undefined) {
    Machines = await getMachines().then((json) => { return json.machines })
  }

  // Validar id entre las máquinas
  for (let i = 0; i < Machines.length; i++) {
    if (Machines[i].id == id) {
      idDeleteInput.style.border = '1.5px solid lightgreen'
      break
    } else {
      idDeleteInput.style.border = '1.5px solid lightcoral'
    }
  }
}

// Evento al enviar el formulario
deleteForm.addEventListener('submit', async (e) => {
  // Evitar que se recargue la página
  e.preventDefault()

  const idInput = document.getElementById('id-delete')
  const id = document.getElementById('id-delete').value

  // Validar id entre las máquinas
  let valid = false
  if (Machines === undefined) {
    Machines = await getMachines().then((json) => { return json.machines })
  }

  for (let i = 0; i < Machines.length; i++) {
    if (Machines[i].id == id) {
      valid = true
    }
  }
  if (valid) {
    try {
      // Eliminar máquina con id dado en la base de datos
      const response = await fetch(`http://localhost:3000/api/mantenimiento/machine/${id}`, {
        method: 'DELETE'
      }).then(() => { alert(`Máquina ${id} eliminada`) })
      console.log(response)

      // Clear form
      idInput.value = ''
      idInput.style.border = '1.5px solid lightgray'

      // Actualizar las máquinas y mantenimientos visibles
      updateDisplays()
      Machines = undefined
    } catch (error) {
      console.error(error)
      alert('Error al eliminar máquina, revise la consola y/o servidor')
    }
  } else {
    alert('Id de máquina no encontrada, por favor ingrese un id diferente')
  }
})

// Planificar mantenimiento preventivo
// Obtener formulario de planificación
const prevForm = document.getElementById('prevent').children[0]
// Evento al enviarlo
prevForm.addEventListener('submit', async (e) => {
  e.preventDefault()
})

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

// recorrer los botones de cerrar y agregar el evento click
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
