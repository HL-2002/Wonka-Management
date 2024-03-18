document.addEventListener('DOMContentLoaded', async function () {
  await crearHtml()
})
// Receta de cada producto

const recetas = {
  'Wonka Bar': [
    { ingrediente: 'cacao', cantidad: 50 },
    { ingrediente: 'chocolate negro', cantidad: 125 },
    { ingrediente: 'chocolate con leche', cantidad: 150 }
  ],
  'Manzanas acarameladas': [
    { ingrediente: 'manzana', cantidad: 1 },
    { ingrediente: 'azucar', cantidad: 300 },
    { ingrediente: 'mantequilla', cantidad: 100 }
  ],
  'Chupeta espiral Wonka': [
    { ingrediente: 'jarabe de maiz', cantidad: 115 },
    { ingrediente: 'azucar', cantidad: 340 }
  ],
  'Barra sorpresa de chocolate de nueces Wonka': [
    { ingrediente: 'cacao', cantidad: 50 },
    { ingrediente: 'chocolate negro', cantidad: 125 },
    { ingrediente: 'chocolate con leche', cantidad: 150 },
    { ingrediente: 'taza de almendras', cantidad: 50 }
  ]
}

// Función para calcular los ingredientes totales
async function calcularIngredientesTotales (productos) {
  const ingredientesTotales = {}

  productos.forEach((producto) => {
    const { productName, productQuantity } = producto
    const receta = recetas[productName]

    receta.forEach((ingrediente) => {
      const { ingrediente: nombre, cantidad } = ingrediente
      if (!ingredientesTotales[nombre]) {
        ingredientesTotales[nombre] = 0
      }
      ingredientesTotales[nombre] += cantidad * productQuantity
    })
  })

  const resultado = Object.entries(ingredientesTotales).map(([nombre, cantidad]) => ({
    ingrediente: nombre,
    cantidad
  }))

  return resultado
}

function cargarProductos (ingre, cantidad) {
  const modal = document.querySelector('.modal')
  modal.classList.add('modal-show')
}

//  CREAR PROVEDORES

async function crearHtml (resultado) {
  const materiaPrima = await getLatestOrder()
  console.log(materiaPrima, 'Hola')

  const seccionRequisiciones = document.getElementById('tarjetasSolicitudes')

  materiaPrima.forEach(requisicion => {
    seccionRequisiciones.innerHTML += `
    <div class="solicitud">
    <h2>${requisicion.ingrediente}</h2>
    <p>${requisicion.cantidad}</p>
    <a onclick="cargarProductos('${requisicion.ingrediente}', '${requisicion.cantidad}')" class="btn-open">Efectuar</a>
    </div>
    `
  })
}

// Cambiar de 1 al 2 en el modulo de Andres

//  Haciendo el fecth

async function getLatestOrder () {
  try {
  //  Realizar la solicitud GET al servidor mediante la API
    const response = await fetch('/api/ventas/latestOrder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      // Obtener la respuesta en formato JSON
      const latestOrder = await response.json()
      console.log(typeof (latestOrder))
      console.log(latestOrder)
      return await calcularIngredientesTotales(latestOrder.products)
    } else {
      // Error al obtener la última orden
      console.error('Hubo un error al obtener la última orden. Código de estado:', response.status)
      alert('Hubo un error al obtener la última orden. Por favor, inténtelo de nuevo más tarde.')
    }
  } catch (error) {
    console.error('Error al obtener la última orden:', error)
    alert('Hubo un error al obtener la última orden. Por favor, revise la consola para más detalles.')
  }
}
