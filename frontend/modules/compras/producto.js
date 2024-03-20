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

function cargarProductos (id) {
  const modal = document.querySelector('.modal')
  crearModal(id)
  modal.classList.add('modal-show')
}

//  CREAR PROVEDORES

async function crearHtml () {
  const materiaPrima = await getRequisicion()
  const seccionRequisiciones = document.getElementById('tarjetasSolicitudes')
  seccionRequisiciones.innerHTML = ''

  materiaPrima.forEach(async requisicion => {
    const productName = await getProductName(requisicion.productId)
    seccionRequisiciones.innerHTML += `
    <div class="solicitud">
    <h2>${productName}</h2>
    <p>Cantidad: ${requisicion.cantidad}</p>
    <div style="display: flex;">
      <a onclick="cargarProductos('${requisicion.id}')" class="btn-open">Efectuar</a>
      <a onclick="eliminarRequisicion('${requisicion.id}')" style="background-color: tomato; margin-left: 5px" class="btn-eliminar">Eliminar</a>
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

async function agregarRequisicion() {
  const product = document.getElementById('vproducts')
  const cantidad = document.getElementById('vcantidad')
  const productValue = product.options[product.selectedIndex].value
  const cantidadValue = document.getElementById('vcantidad').value
  if (cantidadValue) {
    await insertRequisicion({ productValue, cantidadValue })
    await crearHtml()
    cantidad.value = ''
  // eslint-disable-next-line no-undef
  } else alert("Ponga cantidad mi pana")
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

async function getProductName(id) {
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
async function generarCompra (id) {
  const requisiciones = await getRequisicion()
  const requisicion = requisiciones.find((req) => req.id === id)
  const params = {
    productValue: requisicion.id,
    cantidadValue: requisicion.cantidad
  }
  await insertCompra(params)
  await eliminarRequisicion(requisicion.id)
  cerrarModal()
}

function crearModal (id) {
  const modal = document.getElementById('modal')

  modal.innerHTML = `
  <div class="efectuar-modal">
              <div class="efectuar-modal-header">
                <h2>Provedores</h2>
                <a onclick="cerrarModal()" class="salir">X</a>
              </div>

              <div class="seccion-provedores"></div>

              <div class="seccion-calculos">
                <h2>Calculos</h2>

                <div class="zona-calculos">
                  <div class="cantidadContenedor">
                    <h4>Cantidad</h4>
                    <p>12</p>
                  </div>

                  <div class="precioPorUnidad">
                    <h4>Monto</h4>
                    <p>1.5$</p>
                  </div>

                  <div class="montoDeprecioPorUnidad">
                    <h4>Monto</h4>
                    <p>1200$</p>
                  </div>

                  <div class="IvaContenedor">
                    <h4>Iva</h4>
                    <p>1200$</p>
                  </div>

                  <div class="totalContenedor">
                    <h4>Total</h4>
                    <p>1200$</p>
                  </div>
                </div>
              </div>
              <a onclick="generarCompra(${id})" class="btn-ordenDeCompra">Enviar orden de compra</a>
            </div>

            
  `
  const contenedor = document.querySelector('.seccion-provedores')

  const tarjetas = [
    {
      nombre: 'Empresa 1',
      categoria: 'Categoría A',
      costo: 100,
      tardanza: '2 días'
    },
    {
      nombre: 'Empresa 2',
      categoria: 'Categoría B',
      costo: 200,
      tardanza: '3 días'
    },
    {
      nombre: 'Empresa 3',
      categoria: 'Categoría C',
      costo: 300,
      tardanza: '4 días'
    }
  ]

  tarjetas.forEach(tarjeta => {
    const divTarjeta = document.createElement('div')
    divTarjeta.classList.add('tarjeta-proveedor')

    const h2Nombre = document.createElement('h2')
    h2Nombre.textContent = tarjeta.nombre
    divTarjeta.appendChild(h2Nombre)

    const pCategoria = document.createElement('p')
    pCategoria.textContent = `Categoría: ${tarjeta.categoria}`
    divTarjeta.appendChild(pCategoria)

    const pCosto = document.createElement('p')
    pCosto.textContent = `Costo: ${tarjeta.costo} $`
    divTarjeta.appendChild(pCosto)

    const pTardanza = document.createElement('p')
    pTardanza.textContent = `Tardanza en despachar: ${tarjeta.tardanza}`
    divTarjeta.appendChild(pTardanza)

    contenedor.appendChild(divTarjeta)
  })
}
