// Keep track of ids of machines
let ids = []

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
  ids = []

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

    // Añadir id a la lista de ids
    ids.push(machine.id)
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

  // Limpiar formularios antes de añadir las máquinas
  prevSelect.innerHTML = '<option value="">Seleccionar máquina</option>'
  predSelect.innerHTML = '<option value="">Seleccionar máquina</option>'
  corSelect.innerHTML = '<option value="">Seleccionar máquina</option>'
  mPlanSelect.innerHTML = '<option value="">Seleccionar máquina</option>'
  mManSelect.innerHTML = '<option value="">Seleccionar máquina</option>'

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

// Obtener el id de la máquina del formulario
idAddInput.onkeyup = async () => {
  const id = idAddInput.valueAsNumber
  const repeated = ids.some((id) => id === idAddInput.valueAsNumber)

  if (!isNaN(id) && id > 0 && !repeated) {
    idAddInput.style.border = '1.5px solid lightgreen'
  } else {
    idAddInput.style.border = '1.5px solid lightcoral'
  }
}

// Evento al enviar el formulario
addForm.addEventListener('submit', async (e) => {
  // Evitar que se recargue la página
  e.preventDefault()
  // Obtener el tipo de máquina del formulario y cantidad
  const tipo = document.getElementById('tipo-select').value.toLowerCase()
  const idInput = document.getElementById('id-maquina')
  const id = idInput.valueAsNumber
  let repeated = ids.some((id) => id === idInput.valueAsNumber)

  // Validar que input no esté vacío o sea menor que 0
  if (isNaN(id) || id < 1) {
    alert("Por favor ingrese un id válido")
    return
  }

  // Crear máquina con tipo dado en la base de datos
  if (!repeated) {
    const response = await fetch('http://localhost:3000/api/mantenimiento/machine/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, type: tipo })
    })

    // Actualizar las máquinas visibles si la respuesta es exitosa
    if(response.status !== 500) {
      alert(`Máquina ${id} tipo ${tipo} añadida`)

      // Clear form
      idInput.value = ''

      const machines = await getMachines().then((json) => { return json.machines })
      displayMachines(machines)
      displayMaintenanceForms(machines)

    } else {
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
  // Validar id entre las máquinas
  const repeated = ids.some((id) => id === idDeleteInput.valueAsNumber)
  
  if (repeated) {
    idDeleteInput.style.border = '1.5px solid lightgreen'
  } else {
    idDeleteInput.style.border = '1.5px solid lightcoral'
  }
}

// Evento al enviar el formulario
deleteForm.addEventListener('submit', async (e) => {
  // Evitar que se recargue la página
  e.preventDefault()

  const idInput = document.getElementById('id-delete')
  const id = document.getElementById('id-delete').value
  // Validar id entre las máquinas
  const valid = ids.some((id) => id === idInput.valueAsNumber)

  if (valid) {
    // Eliminar máquina con id dado en la base de datos
    const response = await fetch(`http://localhost:3000/api/mantenimiento/machine/${id}`, {
      method: 'DELETE'
    })
     
    // Actualizar las máquinas visibles si la respuesta es exitosa
    if(response.status !== 500) {
      alert(`Máquina ${id} eliminada`)

      // Clear form
      idInput.value = ''
      idInput.style.border = '1.5px solid lightgray'

      updateDisplays()

    } else {
      console.error(error)
      alert('Error al eliminar máquina, revise la consola y/o servidor')
    }
  } else {
    alert('Id de máquina no encontrada, por favor ingrese un id diferente')
  }
})

// Formatear fechas del HTML para evitar cosas locas del GMT
function strToDate(dateString) {
  if (dateString === "") {
    return dateString
  }
  return new Date(dateString.replaceAll('-', '/'))
}

// Planificar mantenimiento preventivo
// Obtener formulario de planificación
const prevForm = document.getElementById('prevent').children[0]
// Evento al enviarlo
prevForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Fecha para validación
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  // Obtener los datos del formulario
  const id = document.getElementById('prevent-select').value
  const typeMaintenance = 'preventivo'
  let dateMaintenance = strToDate(document.getElementById('prevent-date').value)
  console.log(dateMaintenance)
  let dateAvailability = strToDate(document.getElementById('prevent-release').value)

  // Validar id
  if (id === '') {
    alert('Por favor seleccione una máquina')
    return
  }
  // Validar fechas
  if (dateMaintenance === '' || dateMaintenance < date) {
    alert('Fecha de mantenimiento no válida, asegúrese de que sea mayor que la fecha actual')
    return
  }
  if (dateAvailability === '' || dateAvailability < dateMaintenance) {
    alert('Fecha de disponibilidad no válida, asegúrese de que sea mayor o igual que la fecha de mantenimiento')
    return
  }

  // Crear mantenimiento preventivo en la base de datos
  dateMaintenance = dateMaintenance.toISOString().split('T')[0]
  dateAvailability = dateAvailability.toISOString().split('T')[0]

  const response = await fetch('http://localhost:3000/api/mantenimiento/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: typeMaintenance, dateMaintenance: dateMaintenance, dateAvailability: dateAvailability, machineId: id })
  })

  // Actualizar las máquinas visibles si la respuesta es exitosa
  if(response.status !== 500) { 
    alert('Mantenimiento preventivo planificado')

    // Clear form
    document.getElementById('prevent-select').value = ''
    document.getElementById('prevent-date').value = ''
    document.getElementById('prevent-release').value = ''

    // Actualizar las máquinas y mantenimientos visibles
    updateDisplays()
    
  } else {
    alert('Error al planificar mantenimiento, revise la consola y/o el servidor')
  }
})

// Planificar mantenimiento predictivo
// Obtener formulario de planificación
const predForm = document.getElementById('predict').children[0]

// Evento al enviarlo
predForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Fecha para validación
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  // Obtener los datos del formulario
  const id = document.getElementById('predict-select').value
  const typeMaintenance = 'predictivo'
  let dateMaintenance = strToDate(document.getElementById('predict-date').value)
  let dateAvailability = strToDate(document.getElementById('predict-release').value)

  // Validar id
  if (id === '') {
    alert('Por favor seleccione una máquina')
    return
  }
  // Validar fechas
  if (dateMaintenance === '' || dateMaintenance < date) {
    alert('Fecha de mantenimiento no válida, asegúrese de que sea mayor que la fecha actual')
    return
  }
  if (dateAvailability === '' || dateAvailability < dateMaintenance) {
    alert('Fecha de disponibilidad no válida, asegúrese de que sea mayor o igual que la fecha de mantenimiento')
    return
  }

  // Crear mantenimiento predictivo en la base de datos
  dateMaintenance = dateMaintenance.toISOString().split('T')[0]
  dateAvailability = dateAvailability.toISOString().split('T')[0]

  const response = await fetch('http://localhost:3000/api/mantenimiento/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: typeMaintenance, dateMaintenance: dateMaintenance, dateAvailability: dateAvailability, machineId: id })
  })

  // Actualizar las máquinas visibles si la respuesta es exitosa
  if(response.status !== 500) {
    alert('Mantenimiento predictivo planificado')

    // Clear form
    document.getElementById('predict-select').value = ''
    document.getElementById('predict-date').value = ''
    document.getElementById('predict-release').value = ''

    // Actualizar las máquinas y mantenimientos visibles
    updateDisplays()
    
  } else {
    alert('Error al planificar mantenimiento, revise la consola y/o el servidor')
  }
})

// Planificar mantenimiento correctivo

// Obtener formulario de planificación
const corrForm = document.getElementById('correct').children[0]

// Evento al enviarlo

corrForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Fecha para validación
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  // Obtener los datos del formulario
  const id = document.getElementById('correct-select').value
  const typeMaintenance = 'correctivo'
  let dateMaintenance = date
  let dateAvailability = strToDate(document.getElementById('correct-release').value)

  // Validar id
  if (id === '') {
    alert('Por favor seleccione una máquina')
    return
  }

  // Validar fecha
  if (dateAvailability === '' || dateAvailability < date) {
    alert('Fecha de disponibilidad no válida, asegúrese de que sea mayor que la fecha actual')
    return
  }

  // Crear mantenimiento correctivo en la base de datos
  dateAvailability = dateAvailability.toISOString().split('T')[0]
  dateMaintenance = dateMaintenance.toISOString().split('T')[0]

  const response = await fetch('http://localhost:3000/api/mantenimiento/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: typeMaintenance, dateMaintenance: dateMaintenance, dateAvailability: dateAvailability, machineId: id })
  })

  // Actualizar las máquinas visibles si la respuesta es exitosa
  if(response.status !== 500) {
    alert('Mantenimiento correctivo planificado')

    // Clear form
    document.getElementById('correct-select').value = ''
    document.getElementById('correct-release').value = ''

    // Actualizar las máquinas y mantenimientos visibles
    updateDisplays()
    
  } else {
    alert('Error al planificar mantenimiento, revise la consola y/o el servidor')
  }
})

// Modificar (o eliminar) plan de mantenimiento
// Obtener formulario de modificación
const mPlanForm = document.getElementById('mPlan').children[0]
let mPlanOption = ''

// Evento al cliclar alguno de los submit
const mPlanSubmit = document.getElementById('mPlan-submit')
const mPlanDelete = document.getElementById('mPlan-delete')

mPlanSubmit.addEventListener('click', async (e) => {
  mPlanOption = 'submit'
})

mPlanDelete.addEventListener('click', async (e) => {  
  mPlanOption = 'delete'
})

// Guardar máquina seleccionada
let machineSelectedPlan = {}

// Evento al seleccionar una máquina
const mPlanSelect = document.getElementById('mPlan-select')

// Obtener máquina seleccionada
mPlanSelect.addEventListener('change', async (e) => {
  const id = parseInt(mPlanSelect.value)
  const machines = await getMachines().then((json) => { return json.machines })

  // Contenedores de las fechas
  const mantPrev = document.getElementById("mPlan-mant-previa")
  const dispPrev = document.getElementById("mPlan-disp-previa")

  // Limpiar contenedores antes de añadir los datos
  mantPrev.innerHTML = 'Mantenimiento previo: '
  dispPrev.innerHTML = 'Disponibilidad previa: '


  // Obtener la máquina seleccionada
  if (!isNaN(id)) {
    for (const machine of machines) {
      if (machine.id === id) {
        // Mostrar datos de la máquina seleccionada
        mantPrev.innerHTML += dateFormat(machine.dateMaintenance)
        dispPrev.innerHTML += dateFormat(machine.dateAvailability)
        machineSelectedPlan = machine
      }
    }
  }
})

// Function to formate date string from yyyy-mm-dd to dd/mm/yyyy
function dateFormat(date) {
  const arr = date.split('-')
  return `${arr[2]}/${arr[1]}/${arr[0]}`
}

// Evento al enviarlo
mPlanForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Fecha para validación
  const date = new Date()
  date.setHours(11, 59, 59, 999)

  // Obtener datos de máquina seleccionada
  const id = machineSelectedPlan.id

  // Validar selección de máquina
  if (id === undefined) {
    alert('Por favor seleccione una máquina')
    return
  }

  if (mPlanOption === 'delete') {
    // Borrar mantenimiento del servidor
    const response = await fetch(`http://localhost:3000/api/mantenimiento/${id}`, {
      method: 'DELETE'
    })

    if(response.status !== 500) {
      alert(`Mantenimiento de la máquina ${machineSelectedPlan.id} eliminado`)

      // Clear form
      document.getElementById('mPlan-select').value = ''
      document.getElementById('mPlan-date').value = ''
      document.getElementById('mPlan-release').value = ''

      // Actualizar las máquinas y mantenimientos visibles
      updateDisplays()
    } else {
      alert('Error al eliminar mantenimiento, revise la consola y/o el servidor')
    }
  }
  else if (mPlanOption === 'submit') {
    const mantPrev = strToDate(machineSelectedPlan.dateMaintenance)
    
    // Obtener los datos del formulario
    let dateMaintenance = strToDate(document.getElementById('mPlan-date').value)
    let dateAvailability = strToDate(document.getElementById('mPlan-release').value)

    // Validar fechas
    if (dateMaintenance < mantPrev) {
      alert('Fechas de mantenimiento, asegúrese de que sea mayor a la fechas previa')
    }
    else if (dateMaintenance === '' || dateMaintenance < date) {
      alert('Fecha de mantenimiento no válida, asegúrese de que sea mayor que la fecha actual')
      return
    }
    else if (dateAvailability === '' || dateAvailability < dateMaintenance) {
      alert('Fecha de disponibilidad no válida, asegúrese de que sea mayor o igual que la nueva fecha de mantenimiento')
      return
    }
    else {
      // Actualizar el mantenimiento
      // Formatear fechas
      dateMaintenance = dateMaintenance.toISOString().split('T')[0]
      dateAvailability = dateAvailability.toISOString().split('T')[0]

      const response = await fetch(`http://localhost:3000/api/mantenimiento/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({dateMaintenance: dateMaintenance, dateAvailability: dateAvailability})
      })

      if (response.status !== 500) {
        alert(`Mantenimiento de la máquina ${machineSelectedPlan.id} modificado`)

        // Clear form
        document.getElementById('mPlan-select').value = ''
        document.getElementById('mPlan-date').value = ''
        document.getElementById('mPlan-release').value = ''

        // Actualizar las máquinas y mantenimientos visibles
        updateDisplays()
      }
    }
  }
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
