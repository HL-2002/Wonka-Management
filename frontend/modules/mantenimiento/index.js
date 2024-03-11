document.addEventListener('DOMContentLoaded', async () => { 
  const machines = await getMachines().then((json)=>{return json.machines})
  console.log(machines)
  display_machines(machines)
  display_maintenance(machines)

})

// Obtener el array de las máquinas
async function getMachines() {
  const response = await fetch('http://localhost:3000/api/mantenimiento/')
  return response.json()
}

// Actualizar el display de las máquinas
function display_machines(machines) {
  // Obtener los contenedores de las máquinas
  const chocolateras = document.getElementById('chocolateras')
  const caramelizadoras = document.getElementById('caramelizadoras')
  const carameleras = document.getElementById('carameleras')
  const chicleras = document.getElementById('chicleras')

  // Crear colección de máquinas por tipo
  let choco = {
    uso: 0,
    disponible: 0,
    notificada: 0,
    mantenimiento : 0,
    defectuosa: 0
  }

  let cara = structuredClone(choco)
  let caramel = structuredClone(choco)
  let chicl = structuredClone(choco)

  // Crear grid de números por tipo de máquina
  let grid = []
  let total = []

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
    for (state in type) {
      container.innerHTML += `<div class='square ${state}'></div>`.repeat(type[state])
    }
    // Añadir valores al grid
    values = Object.values(type)
    grid.push(values)
    total.push(values.reduce((a, b) => a + b, 0))
  })

  // Display de los números en orden
  const data_grid = document.getElementById('grid')
  // Trasponer grid para iterar por columnas y agregar total de máquinas por tipo
  grid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
  grid.push(total)
  console.log(grid)

  // Iterar para añadir datos al data_grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = -1; j < grid[i].length; j++) {
      if (j == -1) {
        switch (i) {
          case 0:
            data_grid.innerHTML += `<p style="color: #9f70fd;" class="first-item">En uso </p>`
            break
          case 1:
            data_grid.innerHTML += `<p style="color: #42c087;" class="first-item">Disponibles </p>`
            break
          case 2:
            data_grid.innerHTML += `<p style="color: #f17c37;" class="first-item">Notificadas</p>`
            break
          case 3:
            data_grid.innerHTML += `<p style="color: #f1c40f;" class="first-item"> Mantenimiento</p>`
            break
          case 4:
            data_grid.innerHTML += `<p style="color: #e74c3c;" class="first-item">Defectuosas</p>`
            break
          case 5:
            data_grid.innerHTML += `<p style="color: #34495e;" class="first-item">Total</p>`
            break
        }
      }
      else {
        data_grid.innerHTML += `<div class='grid-item'>${grid[i][j]}</div>`
      }
    }
  }
}

function display_maintenance(machines) {
  // Obtener el contenedor de las máquinas en mantenimiento
  const planificado = document.getElementById('planificado')
  const realizando = document.getElementById('realizando')
  let planificados = 0, realizandos = 0

  // Añadir máquinas en mantenimiento
  machines.forEach((machine) => {
    // Validar tipo de mantenimiento y generar estado y mensaje
    if (machine.state != "disponible") {
      state = "correctivo"
    }

    if (machine.state === 'maintenance') {
      const tag = `<div class="state-container">
                      <div class="state ${state}">${machine.id}</div>
                      <div class="state-info">Preventivo</div>
                   </div>`
      mantenimiento.innerHTML += tag
    }
  })
}


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
