// id = mD# es maquinas disponibles

// id = mU# es maquinas en uso

// id = mM# es maquinas en mantenimiento **preguntar a mantenimiento si tienen esto

// # es el numero de la linea de produccion de 1-10
/* ID DE MATERIA PRIMA con su unidad
    11 CACAO gramos
    12 CHOCOLATE NEGRO gramos
    13 CHOCOLATE CON LECHE gramos
    14 MANZANA unidad
    15 AZUCAR gramos
    16 JARABE DE MAIZ ml
    17 CHOCOLATE NEGRO gramos
    18 TAZA de ALMENDRAS gramos
    19 QUESO CREMA ml
    20 MANTEQUILLA DE MANI gramos
    21 COCO gramos
    22 CHISPAS DE CHOCOLATE gramos
    23 HARINA gramos
    24 CHOCOLATE SEMIDULCE gramos
    25 LECHE CONDENSADA ml
    26 LECHE ml
    27 MALVADISCO gramos
    */

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

/*
•    Wonka bar: Barra Wonka:
50 gramos de cacao
125 gramos de chocolate negro
150 gramos de chocolate con leche

•    Candied apples: Manzanas acarameladas:
300 gramos de azúcar blanco refinado
1 manzana
100 gramos de mantequilla

•    Wonka Swirl Lollipops: Chupeta espiral Wonka
1 taza de azúcar
125ml de jarabe de maíz

•    Bluebird's egg candy: Caramelo de huevo de pájaro azul
225ml de queso crema
100 gramos de mantequilla
300 gramos azúcar
300 gramos de mantequilla de maní
300 gramos de coco
200 gramos de chispas de chocolate semidulce

•    Rompemuelas eterno: Rompemuelas eterno:
500 gr coco rallado
1000 gramos harina
250 gr azucar

•    Three-course dinner gum: Chicle de cena de tres platos
1000 gramos harina
5 manzanas
300 gramos de azucar
125ml de jarabe de maiz
300 gramos de chocolate con leche

•    Stained-glass hard candy: Caramelo duro de vidriera
400 gramos de azúcar
200 ml jarabe de maíz ligero

•    Wonka whipple-scrumptious fudgemallow delight: Barra delicia de crema, malvavisco y fudge Wonka
180 gramos de galletas de barquillo de chocolate
150 gramos de chocolate amargo
100 gramos de malvaviscos

Fudge:
350 ml de leche condensada
75 mililitros de leche
225 gramos de azúcar
60 gramos de mantequilla

•    Wonka nutty chocolate surprise: Barra sorpresa de chocolate de nueces Wonka
50 gramos de cacao
125 gramos de chocolate negro
150 gramos de chocolate con leche
50 g taza de almendras (picadas, en hojuelas o enteras)

•    Edible grass: Hierba comestible
240 g coco rallado
*/

const recetas = {
  'Wonka Bar': [
    { ingrediente: 'cacao', cantidad: 50, id: 11, unidad: 'gramos' },
    { ingrediente: 'chocolate negro', cantidad: 125, id: 12, unidad: 'gramos' },
    { ingrediente: 'chocolate con leche', cantidad: 150, id: 13, unidad: 'gramos' }
  ],
  'Candied Apple': [
    { ingrediente: 'manzana', cantidad: 1, id: 14, unidad: 'unidad' },
    { ingrediente: 'azucar', cantidad: 300, id: 15, unidad: 'gramos' },
    { ingrediente: 'mantequilla', cantidad: 100, id: 19, unidad: 'gramos' }
  ],
  'Wonka Swirl Lollipops': [
    { ingrediente: 'jarabe de maiz', cantidad: 125, id: 16, unidad: 'mililitros' },
    { ingrediente: 'azucar', cantidad: 340, id: 15, unidad: 'gramos' }
  ],
  'Bluebirds egg candy': [
    { ingrediente: 'azucar', cantidad: 300, id: 15, unidad: 'gramos' },
    { ingrediente: 'mantequilla de mani', cantidad: 300, id: 20, unidad: 'gramos' },
    { ingrediente: 'queso crema', cantidad: 225, id: 16, unidad: 'mililitros' },
    { ingrediente: 'mantequilla', cantidad: 150, id: 19, unidad: 'gramos' },
    { ingrediente: 'coco', cantidad: 300, id: 21, unidad: 'gramos' },
    { ingrediente: 'chispas de chocolate', cantidad: 200, id: 22, unidad: 'gramos' }
  ],
  'Wonka nutty chocolate surprise': [
    { ingrediente: 'cacao', cantidad: 50, id: 11, unidad: 'gramos' },
    { ingrediente: 'chocolate negro', cantidad: 125, id: 12, unidad: 'gramos' },
    { ingrediente: 'chocolate con leche', cantidad: 150, id: 13, unidad: 'gramos' },
    { ingrediente: 'taza de almendras', cantidad: 50, id: 18, unidad: 'gramos' }
  ],
  'Rompemuelas eterno': [
    { ingrediente: 'harina', cantidad: 1000, id: 23, unidad: 'gramos' },
    { ingrediente: 'azucar', cantidad: 250, id: 15, unidad: 'gramos' },
    { ingrediente: 'coco', cantidad: 500, id: 21, unidad: 'gramos' }
  ],
  'Three-course dinner gum': [
    { ingrediente: 'harina', cantidad: 1000, id: 23, unidad: 'gramos' },
    { ingrediente: 'manzana', cantidad: 5, id: 14, unidad: 'unidad' },
    { ingrediente: 'azucar', cantidad: 500, id: 15, unidad: 'gramos' },
    { ingrediente: 'jarabe de maiz', cantidad: 125, id: 16, unidad: 'mililitros' },
    { ingrediente: 'chocolate con leche', cantidad: 300, id: 13, unidad: 'gramos' }
  ],
  'Stained-glass hard candy': [
    { ingrediente: 'azucar', cantidad: 400, id: 15, unidad: 'gramos' },
    { ingrediente: 'jarabe de maiz', cantidad: 200, id: 16, unidad: 'mililitros' }
  ],
  Fudge: [
    { ingrediente: 'leche condensada', cantidad: 350, id: 25, unidad: 'mililitros' },
    { ingrediente: 'leche', cantidad: 75, id: 26, unidad: 'mililitros' },
    { ingrediente: 'azucar', cantidad: 225, id: 15, unidad: 'gramos' },
    { ingrediente: 'mantequilla', cantidad: 60, id: 19, unidad: 'gramos' }
  ],
  'Edible grass': [
    { ingrediente: 'coco', cantidad: 240, id: 21, unidad: 'gramos' }
  ],
  'Wonka whipple-scrumptious fudgemallow delight': [
    { ingrediente: 'malvadiscos', cantidad: 100, id: 27, unidad: 'gramos' },
    { ingrediente: 'cacao', cantidad: 50, id: 11, unidad: 'gramos' },
    { ingrediente: 'chocolate negro', cantidad: 125, id: 12, unidad: 'gramos' }
  ]

}
// PARA AGREGAR UNA COMPRA
// COMPRAS
async function insertRequisicion (params) {
  try {
    const response = await fetch('/api/compras/new/requisicion', {
      method: 'POST',
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
    // // console.error('Error de red:', error)
  }
}

// Función para calcular los ingredientes totales
async function calcularIngredientesTotales (productos) {
  const ingredientesTotales = {}
  let m = 0
  materiaP = await getProductsa()
  productos.forEach((producto) => {
    const { productName, productQuantity } = producto
    const receta = recetas[productName]

    receta.forEach((unidad) => {
      const { ingrediente, cantidad, id } = unidad
      const materiaPrima = materiaP.find(item => item.id === id) // agarra
      console.log(materiaPrima)
      if (!ingredientesTotales[ingrediente]) {
        ingredientesTotales[ingrediente] = 0
      }
      ingredientesTotales[ingrediente] += cantidad * productQuantity
      console.log(ingredientesTotales[ingrediente])

      const codValue = unidad.id
      const cantidadValue = ingredientesTotales[ingrediente]
      const costoValue = producto.productPrice
      const obserValue = 'produccion'
      const productValue = unidad.id
      console.log(materiaPrima.stock)

      if (ingredientesTotales[ingrediente] <= materiaPrima.stock) {
        const removeProduct = {
          productId: codValue,
          motivo: 'AJU',
          tipo: 'DESCARGO',
          units: cantidadValue,
          total: costoValue * cantidadValue,
          observ: obserValue
        }
        insertStock(removeProduct)
        m = 1
      } else {
        insertRequisicion({ productValue, cantidadValue })
        m = 0
      }
    })
  })
  return m
}
// LLAMANDO A LA API EL ORDERID CUANDO SE DA CLICK A BOTON "ENVIAR"
async function Verificar () {
  const codigoIngresado = document.getElementById('factura').value
  try {
    // Realizar la solicitud GET al servidor mediante la API
    const response = await fetch(`/api/ventas/orders/${codigoIngresado}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    })

    if (response.ok) {
      // Obtener la respuesta en formato JSON
      const Order = await response.json()
      return await Order
    } else {
      // Error al obtener la �ltima orden
      console.error('Hubo un error al obtener la ultima orden. Codigo de estado:', response.status)
      alert('Hubo un error al obtener la ultima orden. Por favor, intentelo de nuevo mas tarde.')
    }
  } catch (error) {
    console.error('Error al obtener la ultima orden:', error)
    alert('Hubo un error al obtener la ultima orden. Por favor, revise la consola para mas detalles.')
  }
}
function receta (n) {
  const modal = document.getElementById('recipe-modal')
  const detail = document.getElementById('recipe-detail')
  const rece = document.getElementById(`producto${n}`)
  const receta = recetas[rece.innerText]
  let recipeDetails = '<h3>Receta de Chocolate</h3><p>Ingredientes:</p>'
  receta.forEach((id) => {
    const { ingrediente, cantidad, unidad } = id
    recipeDetails += `
            <ul>
                <li>${ingrediente} ${cantidad} ${unidad}</li>
            </ul>
        `
  })

  // Set the recipe details inside the detail element
  detail.innerHTML = recipeDetails

  // Open the modal
  modal.style.display = 'block'

  // Close the modal when the close button is clicked
  const closeButton = modal.querySelector('.close-modal')
  closeButton.addEventListener('click', function () {
    modal.style.display = 'none'
  })

  // Close the modal when clicking outside the modal content
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  })
}
const m = 0
async function crearHTML () {
  try {
    const orders = await Verificar()
  if (orders.status === 'fabricado' || orders.status === 'entregado' ){
    alert("Su orden ya fue procesada, porfavor verificar con ventas!")
    return
  }
     // Espera a que se resuelva la promesa
    const seccionOrder = document.getElementById('tabla_info')
    seccionOrder.innerHTML = ''
    seccionOrder.innerHTML += `
        <thead>
          <tr>
            <th rowspan="2">
              <h3>N# ${orders.orderId}</h3>
            </th>
            <th colspan="4">
              <h2 id="fuck">${orders.name}</h2>
            </th>
          </tr>
          <tr>
            <th>${orders.customerId}</th>
            <th>${orders.email}</th>
            <th>${orders.phoneNumber}</th>
            <th>Total: ${orders.totalPriceOrder}bs</th>
          </tr>
        </thead>
        `
    const seccionMantenimiento = document.getElementById('tabla_productos')
    const total = document.getElementById('NumeroTotal')
    const response = await fetch('/api/inventario/products')
    const productoss = await response.json()

    // Filtrar los productos seg�n el atributo categoryId sea igual a 2
    const filteredProducts = productoss.filter(product => product.categoryId === 2)

    // Llamar a la funci�n que agrega los productos filtrados al select
    seccionMantenimiento.innerHTML = ''
    total.innerHTML = 'Numero total'
    let total_productos = 0
    let n = 1
    filteredProducts.forEach(product => {
      seccionMantenimiento.innerHTML += `
       <table id="${product.id}" class="center">
                        <thead>
                            <tr>
                                <th rowspan="2">
                                    <h3>N# ${n}</h3>
                                </th>
                                <th colspan="3">
                                    <h2 id=producto${n}>${product.description}</h2>
                                </th>
                                <th>
                                    <button onclick="receta(${n})"> Receta </button>
                                </th>
                            </tr>
                    <tr>
                        <th id="pp${n}">Productos por producir: </th>
                        <th id="mU">Maquinas en uso: ${machineCount(n)}</th>
                        <th id="pf${n}">Productos fabricados: 0</th>
                    </tr>
                        </thead>
                    </table>
        `
      n++
    })
    n = 1

    orders.products.forEach(producto => {
      const table = document.getElementById(`pp${producto.productId}`)
      table.innerHTML += `${producto.productQuantity}`

      n++
      total_productos += producto.productQuantity
    })
    total.innerHTML = `${total_productos}`
  } catch (error) {
    console.error('Error al crear el HTML:', error)
    alert('Hubo un error al crear el HTML. Por favor, revise la consola para mas detalles.')
  }}


// PRODUCTOS TERMINADOS
async function getProducts () {
  try {
    const response = await fetch('/api/inventario/products')
    const products = await response.json()

    // Filtrar los productos seg�n el atributo categoryId sea igual a 2 que busca solo productos no materia prima
    filteredProducts = products.filter(product => product.categoryId === 1)

    // Llamar a la funci�n que agrega los productos filtrados al select
    crearHTML(filteredProducts)
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}
// MATERIA PRIMA
async function getProductsa () {
  try {
    const response = await fetch('/api/inventario/products')
    const products = await response.json()

    // Filtrar los productos seg�n el atributo categoryId sea igual a 2 que busca solo productos no materia prima
    filteredProducts = products.filter(product => product.categoryId === 1)

    // Llamar a la funci�n que agrega los productos filtrados al select
    return filteredProducts
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

let interval
async function counterToProduce (dayto) {
  const inputDay = document.getElementById('counter-days')
  const dayinput = dayto
  const today = new Date()
  const difference = dayinput - today
  if (difference < 0) {
    clearInterval(interval)
    await generateProduction()
    localStorage.removeItem('tomorrow-prod')
    return
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  inputDay.innerHTML = `Tiempo para iniciar la producion: ${days}d ${hours}h ${minutes}m ${seconds}s`
  inputDay.style.display = 'block'
  inputDay.style.textAlign = 'center'
}

let orders = []
// BOTON PRODUCIR
async function Producir () {
  const inputDay = document.getElementById('day-to')
  const today = new Date()
  const isTitle = document.getElementById('fuck')

  if (isTitle == null) {
    alert('no hay factura ingreda para la produccion')
    return
  }

  if (inputDay.value === '') {
    await generateProduction()
  } else {
    const day = new Date(inputDay.value)
    if (day < today) {
      alert('La fecha de produccion no puede ser menor a la fecha actual')
    } else {
      const dayTo = new Date(inputDay.value)
      const codigoIngresado = document.getElementById('factura').value
      localStorage.setItem('tomorrow-prod', JSON.stringify({ date: inputDay.value, code: codigoIngresado }))

      interval = setInterval(() => { counterToProduce(dayTo) }, 1000)
    }
  }
}

async function generateProduction () {
  orders = await Verificar()
  if (orders.status === 'fabricado' || orders.status === 'entregado' ){
    alert("Su orden ya fue procesada, porfavor verificar con ventas!")
    return
  }
  const prima = await getProductsa()
  const v = await calcularIngredientesTotales(orders.products)
  n = 1
  orders.products.forEach(producto => {
    const codValue = producto.productId
    const cantidadValue = producto.productQuantity
    const costoValue = producto.productPrice
    const obserValue = 'produccion'
//comprometido orden 
    const addProduct = {
      productId: codValue,
      motivo: 'AJU',
      tipo: 'CARGO',
      units: cantidadValue,
      total: costoValue * cantidadValue,
      observ: obserValue
    }
    if (v === 1) {
      insertStock(addProduct)
      productoProducido = document.getElementById(`pf${n}`)
      productoProducido.innerHTML = `
      Producto Producido: ${producto.productQuantity}
    `
      n++
      cambiarstatus()
      alert('Porduccion generada correctamente!')
    } else {
      alert('Se necesita materia prima, ya se notifico a Compras!')
    }
  })
}

async function insertStock (params) {
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
    // // console.error('Error de red:', error)
  }
}
function generateNumberList (m) {
  const numberList = []
  for (let i = 1; i <= m; i++) {
    numberList.push(i)
  }
  return numberList
}

// COMIENZO DE MAQUINAS ************************
// ���������������� CARGAR M�QUINAS, MANTENIMIENTOS Y L�NEAS DISPONIBLES ����������������
let machines = []

document.addEventListener('DOMContentLoaded', async () => {
  // {date:inputDay.value,code:codigoIngresado}
  document.getElementById('detener').addEventListener('click', () => {
    if (interval) {
      clearInterval(interval)
      const inputDay = document.getElementById('counter-days')
      inputDay.innerHTML = ''
      localStorage.removeItem('tomorrow-prod')
    } else {
      alert('No hay produccion programada')
    }
  })

  const data = JSON.parse(localStorage.getItem('tomorrow-prod'))
  if (data) {
    const { date, code } = data
    document.getElementById('day-to').value = date
    document.getElementById('factura').value = code

    await crearHTML()
    await Producir()
  }

  // Cargar m�quinas
  machines = await getMachines().then((json) => { return json.machines })

  // Cargar mantenimientos
  updateMaintenance()

  const lineas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // TODO ANGEL: Cargar l�neas disponibles
  // Cargar l�neas disponibles
  // lineas = await getLines().then((json) => { return json.lines })
  // Esto es para las pruebas
  const openRecipeButtons = document.querySelectorAll('.open-recipe')

  openRecipeButtons.forEach(button => {
    button.addEventListener('click', () => {
      receta()
    })
  })

  const closeRecipeButtons = document.querySelectorAll('.close-modal')

  closeRecipeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      modal.classList.remove('is-visible')
    })
  })

  // Actualizar las líneas disponibles en los formularios de asignación y liberación
  const lineasRelease = document.getElementById('release-line')
  const lineasAssign = document.getElementById('assign-line')
  updateLines(lineas, lineasRelease, lineasAssign)
})

// Obtener m�quinas del servidor
async function getMachines () {
  const response = await fetch('/api/mantenimiento/')
  return response.json()
}

// A�adir l�neas seg�n las disponibles
function updateLines (lineas, lineasRelease, lineasAssign) {
  lineas.forEach((line) => {
    const option = document.createElement('option')
    option.value = line
    option.textContent = `Línea ${line}`
    lineasRelease.appendChild(option)
    lineasAssign.appendChild(option.cloneNode(true))
  })
}

// Revisar mantenimientos de m�quinas
function updateMaintenance () {
  // Obtener elemento del DOM
  const mantenimientos = document.getElementById('mantenimientos')

  //
  let count = 0
  const maintainMachines = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Limpiar mantenimientos
  mantenimientos.innerHTML = ''

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
    alert(`Alerta: Hay ${count} maquinas con mantenimientos proximos.`)
    // Sortear m�quinas por fecha de mantenimiento
    maintainMachines.sort((a, b) => {
      return strToDate(a.dateMaintenance) - strToDate(b.dateMaintenance)
    })

    // Agregar a lista de mantenimientos
    maintainMachines.forEach((machine) => {
      const dateMaintenance = strToDate(machine.dateMaintenance)
      const diferencia = dateMaintenance - today
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
      mantenimientos.innerHTML += `<li> Maquina ${machine.id}: Linea ${machine.line} - Mantenimiento ${machine.typeMaintenance} en ${dias} dias. </li>`
    })
  }
}

// Formatear fechas de DB a formato local
// Formatear fechas del HTML para evitar cosas locas del GMT
function strToDate (dateString) {
  return new Date(dateString.replaceAll('-', '/'))
}

// ————————————————— CARGAR CANTIDAD DE MÁQUINAS —————————————————
function machineCount (line) {
  const machinesLine = machines.filter((machine) => machine.line == line)
  return machinesLine.length
}

// ���������������� NOTIFICAR M�QUINA ����������������
const notifyForm = document.getElementById('notify-form')
const idInput = document.getElementById('id-number')
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
  } else {
    idInput.style.border = '1.5px solid lightcoral'
    validId = false
  }
})

// A�adir evento de notificaci�n
notifyForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  let state = document.getElementById('machine-state').value
  const machine = machines.find((machine) => machine.id == idInput.value)

  if (validId) {
    // Notificaci�n de irregularidad
    if (state === 'irregularidad') {
      const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ state: 'notificada', line: machine.line, availability: machine.availability })
        })

      // Respuesta seg�n el estado de la petici�n
      if (response.status !== 500) {
        // Limpiar formulario
        idInput.value = ''
        state = ''

        // Notificar al usuario
        alert(`Maquina ${machine.id} notificada con irregularidad.`)

        // Actualizar lista de m�quinas
        machines = await getMachines().then((json) => { return json.machines })
        updateMaintenance()
      } else {
        alert('Error al añadir maquina, revise la consola y/o servidor')
      }
    }
    // Notificaci�n de defecto
    else if (state === 'defectuosa') {
      const response = await fetch(`/api/mantenimiento/machine/${idInput.value}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ state: 'defectuosa', line: 0, availability: 0 })
        })

      // Respuesta seg�n el estado de la petici�n
      if (response.status !== 500) {
        // Limpiar formulario
        idInput.value = ''
        state = ''

        // Notificar al usuario
        if (machine.line !== 0) {
          alert(`Maquina ${machine.id} notificada con defecto, la misma ha sido removida de la linea ${machine.line}.`)
        } else {
          alert(`Maquina ${machine.id} notificada con defecto.`)
        }

        // Actualizar lista de m�quinas
        machines = await getMachines().then((json) => { return json.machines })
      } else {
        alert('Error al añadir maquina, revise la consola y/o servidor')
      }
    } else {
      alert('Seleccione un estado para el reporte.')
    }
  } else {
    alert('Ingrese una id v�lida. Recuerde que la m�quina debe estar disponible o en uso.')
  }
})

// ���������������� LIBERAR M�QUINAS ����������������
// Obtener elementos del DOM
const lineasRelease = document.getElementById('release-line')
const displayRelease = document.getElementById('release-display')
const releaseForm = document.getElementById('release-form')

// Display de m�quinas seg�n la l�nea seleccionada
lineasRelease.addEventListener('change', (e) => {
  displayRelease.innerHTML = ''
  const line = lineasRelease.value
  if (line !== '') {
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
  if (lineasRelease.value !== '') {
    const machinesSelected = Array.from(displayRelease.querySelectorAll('input[type="checkbox"]:checked'))

    if (machinesSelected.length > 0) {
      // Liberar m�quinas seleccionadas
      machinesSelected.forEach(async (machine) => {
        const state = machine.state === 'notificada' ? 'notificada' : 'disponible'
        const response = await fetch(`/api/mantenimiento/machine/${machine.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state, line: 0, availability: 1 })
          })

        // Respuesta seg�n el estado de la petici�n
        if (response.status !== 500) {
          // Limpiar formulario
          lineasRelease.value = ''
          displayRelease.innerHTML = ''
        } else {
          alert('Error al liberar maquina, revise la consola y/o servidor')
        }
      })
      // Notificar al usuario
      alert(`Maquinas liberadas de la linea ${lineasRelease.value}.`)

      // Actualizar lista de m�quinas
      machines = await getMachines().then((json) => { return json.machines })
      updateMaintenance()
    } else {
      alert('Seleccione al menos una maquina')
    }
  } else {
    alert('Seleccione una linea')
  }
})

// ����������������� ASIGNAR M�QUINAS �����������������
// Obtener elementos del DOM
const lineasAssign = document.getElementById('assign-line')
const tipoAssign = document.getElementById('assign-type')
const displayAssign = document.getElementById('assign-display')
const assignForm = document.getElementById('assign-form')

// Display de m�quinas seg�n el tipo seleccionado
tipoAssign.addEventListener('change', (e) => {
  const type = tipoAssign.value
  // S�lo aquellas m�quinas disponibles o notificadas
  const machinesType = machines.filter((machine) => machine.type == type && (machine.state === 'disponible' || machine.state === 'notificada'))
  displayAssign.innerHTML = ''
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
  if (lineasAssign.value !== '' && tipoAssign.value !== '') {
    const machinesSelected = Array.from(displayAssign.querySelectorAll('input[type="checkbox"]:checked'))

    if (machinesSelected.length > 0) {
      // Asignar m�quinas seleccionadas
      machinesSelected.forEach(async (machine) => {
        const state = machine.state === 'notificada' ? 'notificada' : 'uso'
        const response = await fetch(`/api/mantenimiento/machine/${machine.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state, line: lineasAssign.value, availability: 0 })
          })

        // Respuesta seg�n el estado de la petici�n
        if (response.status !== 500) {
          // Limpiar formulario
          lineasAssign.value = ''
          tipoAssign.value = ''
          displayAssign.innerHTML = ''
        } else {
          alert('Error al asignar maquina, revise la consola y/o servidor')
        }
      })
      // Notificar al usuario
      alert(`Maquinas asignadas a la linea ${lineasAssign.value}.`)

      // Actualizar lista de m�quinas
      machines = await getMachines().then((json) => { return json.machines })
      updateMaintenance()
    } else {
      alert('Seleccione al menos una maquina')
    }
  } else {
    alert('Seleccione una linea y un tipo de maquina')
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
async function cambiarstatus(){
    
  const id = document.getElementById('factura').value
  try {

      let response = await fetch(`/api/ventas/orders/${id}/status`,{
          method: 'PATCH', headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({

              'status':'fabricado'
          })
      })
      if(response.ok){
      }
  } catch (error) {
  }
  
  
  
}
// TERMINA MAQUINAS
