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
    notificada: 0,
    disponible: 0,
    mantenimiento : 0,
    defectuosa: 0
  }

  let cara = structuredClone(choco)
  let caramel = structuredClone(choco)
  let chicl = structuredClone(choco)

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
  })
}

function display_maintenance(machines) {
  return null
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
