document.addEventListener('DOMContentLoaded', async function () {
  await fillSelect()
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

function cargarProductos (productId, cantidad, nombre, idRequisicion) {
  const modal = document.querySelector('.modal')
  console.log(productId, 'ID DE LA TARJETA')
  crearModal(productId, cantidad, nombre, idRequisicion)
  modal.classList.add('modal-show')
}

//  CREAR PROVEDORES

async function crearHtml () {
  const materiaPrima = await getRequisicion()
  const seccionRequisiciones = document.getElementById('tarjetasSolicitudes')
  seccionRequisiciones.innerHTML = ''

  materiaPrima.forEach(async requisicion => {
    console.log(requisicion.productId)
    const productId = requisicion.productId
    const productName = await getProductName(requisicion.productId)
    const cantidadFormateada = requisicion.cantidad
    let medidas = ''

    if (productId == 16 || productId == 19 || productId == 25 || productId == 26 || productId == 28) {
      if (cantidadFormateada > 1000) {
        medidas = cantidadFormateada + ' ml'
      } else {
        medidas = cantidadFormateada + ' ml'
      }
    } else {
      if (cantidadFormateada > 1000) {
        medidas = cantidadFormateada + 'gr'
      } else {
        medidas = cantidadFormateada + ' gr'
      }
    }
    seccionRequisiciones.innerHTML += `
    <div class="solicitud">
    <h2>${productName}</h2>
    <p>Cantidad: ${medidas}</p>
    <div style="display: flex;">
      <a onclick="cargarProductos('${requisicion.productId}', '${requisicion.cantidad}', '${productName}', '${requisicion.id}')" class="btn-open">Efectuar</a>
      <a onclick="eliminarRequisicion('${requisicion.id}')" class="btn-eliminar">Eliminar</a>
    </div>
    </div>
    `
  })
}

// eslint-disable-next-line no-unused-vars
async function eliminarRequisicion (id) {
  try {
    const response = await fetch(`/api/compras/requisicion/delete/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      await response.json()
      await crearHtml()
    } else {
      console.error('Error al insertar el producto:', response.status)
    }
  } catch (error) {
    // console.error('Error de red:', error)
  }
}

async function agregarRequisicion () {
  const product = document.getElementById('vproducts')
  const cantidad = document.getElementById('vcantidad')
  const productValue = product.options[product.selectedIndex].value
  const cantidadValue = document.getElementById('vcantidad').value
  if (cantidadValue) {
    await insertRequisicion({ productValue, cantidadValue })
    await crearHtml()
    cantidad.value = ''
  // eslint-disable-next-line no-undef
  } else alert('Ingrese una cantidad')
}

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

async function insertCompra (params) {
  try {
    const response = await fetch('/api/compras/new/compra', {
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

async function getProductName (id) {
  const products = await getProducts()
  const product = products.find((product) => product.id === id)
  return product ? product.description : 'Product not found'
}

async function fillSelect () {
  const lstProducts = await getProducts()
  const listMateriaPrima = lstProducts.filter(item => item.categoryId === 1)

  const options = listMateriaPrima.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('vproducts')
  selectElement.innerHTML = options.join('')
}
async function getProducts (params) {
  const response = await fetch('/api/inventario/products')
  return await response.json()
}// Devuelve array con todos los articulos creados

// Cambiar de 1 al 2 en el modulo de Andres

//  Haciendo el fecth

async function getRequisicion () {
  try {
  //  Realizar la solicitud GET al servidor mediante la API
    const response = await fetch('/api/compras/requisicion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      // Obtener la respuesta en formato JSON
      const requisicion = await response.json()
      return requisicion
      // return await calcularIngredientesTotales(requisicion)
    } else {
      // Error al obtener la última orden
      console.error('Hubo un error al obtener la última orden. Código de estado:', response.status)
    }
  } catch (error) {
    console.error('Error al obtener la última orden:', error)
    alert('Hubo un error al obtener la última orden. Por favor, revise la consola para más detalles.')
  }
}
// eslint-disable-next-line no-unused-vars
function cerrarModal () {
  const modal = document.getElementById('modal')
  modal.classList.remove('modal-show')
}
// eslint-disable-next-line no-unused-vars
async function generarCompra (productId, cantidad, idRequisicion, monto) {
  console.log(monto)
  const params = {
    productValue: productId,
    cantidadValue: cantidad
  }
  await insertCompra(params)
  await eliminarRequisicion(idRequisicion)
  await actualizarStock(params)
  cerrarModal()
}

async function actualizarStock (params) {
  const product = {
    productId: params.productValue,
    motivo: 'COMP',
    tipo: 'CARGO',
    units: params.cantidadValue,
    total: 1 * 1,
    observ: 'Compra de mercancia'
  }
  console.log(product)
  await insertStock(product)
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
function crearModal (productId, cantidad, nombre, idRequisicion) {
  const modal = document.getElementById('modal')

  let monto

  const costo = document.getElementById('costoNumero')

  if (costo) {
    monto = parseFloat(costo.textContent || 0)
  } else {
    monto = 0
  }

  modal.innerHTML = `
  <div class="efectuar-modal">
              <div class="efectuar-modal-header">
                <h2>Provedores</h2>
                <a onclick="cerrarModal()" class="salir">X</a>
              </div>

              <div class="seccion-provedores">

              </div>

              <div class="seccion-calculos">
                <h2>Calculos</h2>

                <div class="zona-calculos">
                  <div class="cantidadContenedor">
                    <h4>Cantidad</h4>
                    <p>${cantidad}</p>
                  </div>

                  <div class="precioPorUnidad">
                    <h4>Monto Por unidad</h4>
                    <p id="costoNumero">${monto}</p>
                  </div>


              </div>
              <a onclick="generarCompra(${productId}, ${cantidad}, ${idRequisicion}, ${monto})" class="btn-ordenDeCompra">Enviar orden de compra</a>
            </div>
            
  `
  const randomNumber = 0.5 + Math.random()

  const tarjetas = [
    {
      nombre: 'Empresa 1',
      costo: (randomNumber * 0.8).toFixed(2),
      calidad: 'Baja Calidad'
    },
    {
      nombre: 'Empresa 2',
      costo: (randomNumber * 1.2).toFixed(2),
      calidad: 'Calidad media'
    },
    {
      nombre: 'Empresa 3',
      costo: (randomNumber * 1.5).toFixed(2),
      calidad: 'Alta calidad'
    }
  ]

  const contenedor = document.querySelector('.seccion-provedores')
  tarjetas.forEach(tarjeta => {
    const divTarjeta = document.createElement('div')
    divTarjeta.classList.add('tarjeta-proveedor')
    divTarjeta.addEventListener('click', () => {
      const costo = document.getElementById('costoNumero')
      costo.textContent = tarjeta.costo
      console.log(parseFloat(costo.textContent))
      console.log(typeof (parseFloat(costo.textContent)))
    })

    const h2Nombre = document.createElement('h2')
    h2Nombre.textContent = tarjeta.nombre
    divTarjeta.appendChild(h2Nombre)

    const pCosto = document.createElement('p')
    pCosto.textContent = `Costo: ${tarjeta.costo} bs`
    divTarjeta.appendChild(pCosto)

    const pCalidad = document.createElement('p')
    pCalidad.textContent = tarjeta.calidad
    divTarjeta.appendChild(pCalidad)

    contenedor.appendChild(divTarjeta)
  })

  console.log(randomNumber)
  console.log(randomNumber)
}
