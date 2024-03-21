document.addEventListener('DOMContentLoaded', async function () {
  await crearHtmlCompras()
  //  BOTONES DE MENU
  const btnRegistro = document.querySelector('.btn-registro')
  const btnRequisicion = document.querySelector('.btn-requisicion')

  //  SECCIONES DE REGISTRO Y REQUISICION

  const solicitudesContenido = document.querySelector('.solicitudes')
  const registroContenido = document.querySelector('.registro-seccion')

  //  CAMBIAR SECCION DE REQUISICION A REGISTRO

  btnRequisicion.addEventListener('click', (e) => {
    e.preventDefault()
    btnRequisicion.classList.add('active')
    btnRegistro.classList.remove('active')

    registroContenido.style.display = 'none'
    solicitudesContenido.style.display = 'block'
  })

  //  CAMBIAR SECCION DE REGISTRO A REQUISICION

  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault()
    btnRequisicion.classList.remove('active')
    btnRegistro.classList.add('active')

    solicitudesContenido.style.display = 'none'
    registroContenido.style.display = 'block'
  })
})

async function getProducts (params) {
  const response = await fetch('/api/inventario/products')
  return await response.json()
}// Devuelve array con todos los articulos creados

async function getProductName (id) {
  const products = await getProducts()
  const product = products.find((product) => product.id === id)
  return product ? product.description : 'Product not found'
}

async function crearHtmlCompras () {
  const compras = await getCompras()
  const comprasMostrarLaUltima = await compras.slice().reverse()
  console.log(compras)
  const seccionCompras = document.getElementById('registros-hechos')
  seccionCompras.innerHTML = ''

  comprasMostrarLaUltima.forEach(async requisicion => {
    const productName = await getProductName(requisicion.productId)
    seccionCompras.innerHTML += `
      <div class="registro">
      <h2>${productName}</h2>
      <p>Cantidad: ${requisicion.cantidad}</p>
      <p>Total: ${requisicion.monto}</p>
      <div style="display: flex;">
        <a onclick="cargarProductos('${requisicion.id}')" class="btn-open">Ver</a>
      </div>
      </div>
      `
  })
}

async function getCompras () {
  try {
    //  Realizar la solicitud GET al servidor mediante la API
    const response = await fetch('/api/compras/compras', {
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
