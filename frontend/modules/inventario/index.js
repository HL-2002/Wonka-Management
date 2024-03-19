const openEls = document.querySelectorAll('[data-open]')
const closeEls = document.querySelectorAll('[data-close]')
const isVisible = 'is-visible'

/* //Modal animation
-------------------- */
const reportes = document.getElementById('generar-button')
reportes.addEventListener('click', function () {
  obtenerDatosGenerales()
})

for (const el of openEls) {
  el.addEventListener('click', function () {
    const modalId = this.dataset.open
    document.getElementById(modalId).classList.add(isVisible)
  })
}

for (const el of closeEls) {
  el.addEventListener('click', function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible)
  })
}

document.addEventListener('click', e => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
})

document.addEventListener('keyup', e => {
  if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
})

/* //Buscadores
-------------------- */

document.getElementById('products').addEventListener('change', (evt) => {
  const option = evt.currentTarget.selectedOptions[0]
  fillModal(option.value)
})
document.getElementById('category').addEventListener('change', (evt) => {
  const option = evt.currentTarget.selectedOptions[0]
  fillModalC(option.value)
})

document.getElementById('cargo').addEventListener('change', (evt) => {
  const option = evt.currentTarget.selectedOptions[0]
  fillModalCargo(option.value)
})

document.getElementById('descargo').addEventListener('change', (evt) => {
  const option = evt.currentTarget.selectedOptions[0]
  fillModalDescargo(option.value)
})
async function fillSearch () {
  const lstProducts = await getProducts()

  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('products')
  selectElement.innerHTML = options.join('')
}
async function fillSearchC () {
  const lstCategory = await getCategory()
  const options = lstCategory.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('category')
  selectElement.innerHTML = options.join('')
}
async function fillSearchCargo () {
  const lstProducts = await getProducts()

  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('cargo')
  selectElement.innerHTML = options.join('')
}
async function fillSearchDescargo () {
  const lstProducts = await getProducts()

  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('descargo')
  selectElement.innerHTML = options.join('')
}

/* //Reutilizables
-------------------- */

// eslint-disable-next-line no-unused-vars
async function addItem (params) {
  const codValue = document.getElementById('codigo')
  const desValue = document.getElementById('descripcion')
  const categorValue = document.getElementById('categoria')
  const save = document.getElementById('saveButton')
  const precioValue = document.getElementById('precio')
  const costoValue = document.getElementById('costo')
  const stock = document.getElementById('stock')
  save.style.backgroundColor = 'initial'
  const lstCategory = await getCategory()
  const options = lstCategory.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('categoria')
  selectElement.innerHTML = options.join('')

  codValue.value = ''
  desValue.value = ''
  categorValue.value = ''
  precioValue.value = ''
  costoValue.value = ''
  stock.value = '0'

  desValue.readOnly = false
  categorValue.readOnly = false
  precioValue.readOnly = false
  costoValue.readOnly = false
  save.disabled = false
}
// eslint-disable-next-line no-unused-vars
async function deleteProduct (id) {
  await removeProducts(id)
  await fillModal()
}

// eslint-disable-next-line no-unused-vars
async function saveProduct () {
  const codValue = document.getElementById('codigo').value
  const desValue = document.getElementById('descripcion').value
  const categorValue = document.getElementById('categoria').value
  const precioValue = document.getElementById('precio').value
  const costoValue = document.getElementById('costo').value
  const units = document.getElementById('stock').value

  const product = {
    id: codValue,
    description: desValue,
    categoryId: categorValue,
    cost: costoValue,
    pre: precioValue,
    stock: units
  }
  if (codValue === '') {
    await insertProducts(product)
  } else {
    await updateProducts(product)
  }
  await fillModal()
}
// eslint-disable-next-line no-unused-vars
async function saveCargo () {
  const codValue = document.getElementById('codigoC').value
  const cantidadValue = document.getElementById('cantidadC').value
  const costoValue = document.getElementById('costoC').value
  const obserValue = document.getElementById('costoC').value

  const product = {
    productId: codValue,
    motivo: 'AJU',
    tipo: 'CARGO',
    units: cantidadValue,
    total: costoValue * cantidadValue,
    observ: obserValue
  }
  await insertStock(product)
  await fillModalCargo()
}
// eslint-disable-next-line no-unused-vars
async function saveDescargo () {
  const codValue = document.getElementById('codigoD').value
  const cantidadValue = document.getElementById('cantidadD').value
  const costoValue = document.getElementById('costoD').value
  const obserValue = document.getElementById('costoD').value

  const product = {
    productId: codValue,
    motivo: 'AJU',
    tipo: 'DESCARGO',
    units: cantidadValue,
    total: costoValue * cantidadValue,
    observ: obserValue
  }
  await insertStock(product)
  await fillModalDescargo()
}

// eslint-disable-next-line no-unused-vars
async function modProduct (id, des, category) {
  const save = document.getElementById('saveButton')
  save.disabled = false
  save.style.backgroundColor = 'initial'
  const desValue = document.getElementById('descripcion')
  const categorValue = document.getElementById('categoria')
  const precioValue = document.getElementById('precio')
  const costoValue = document.getElementById('costo')

  desValue.readOnly = false
  categorValue.readOnly = false
  precioValue.readOnly = false
  costoValue.readOnly = false

  const lstCategory = await getCategory()
  const options = lstCategory.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('categoria')
  selectElement.innerHTML = options.join('')
}

// eslint-disable-next-line no-unused-vars
async function addCategory (params) {
  const codValue = document.getElementById('codigo')
  const desValue = document.getElementById('descripcion')
  const save = document.getElementById('saveButtonC')

  codValue.value = ''
  desValue.value = ''
  desValue.readOnly = false
  save.disabled = false
  save.style.backgroundColor = 'initial'
}

// eslint-disable-next-line no-unused-vars
async function saveCategory () {
  const codValue = document.getElementById('codigo').value
  const desValue = document.getElementById('descripcion').value

  const category = {
    id: codValue,
    description: desValue
  }
  if (codValue === '') {
    await insertCategory(category)
  } else {
    await updateCategory(category)
  }
  await fillModalC()
}

// eslint-disable-next-line no-unused-vars
async function modCategory (id, des) {
  const desValue = document.getElementById('descripcion')
  const save = document.getElementById('saveButtonC')
  save.disabled = false
  save.style.backgroundColor = 'initial'
  desValue.readOnly = false
}

// eslint-disable-next-line no-unused-vars
async function deleteCategory (id) {
  await removeCategory(id)
  await fillModalC()
}

/* //PRODUCTOS
-------------------- */
async function fillModal (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  const lstCategory = await getCategory()

  const selectedCategoty = id ? lstCategory.find(item => item.id === parseInt(selected.categoryId)) : lstCategory[1]

  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const viewCategory = selectedCategoty?.description || ''
  const viewPrice = selected?.price || ''
  const viewCost = selected?.cost || ''
  const viewStock = selected?.stock || 0
  const viewStockComprometido = selected?.comprometido || 0
  let viewStockDisponible = selected?.stock - selected?.comprometido || 0
  if (viewStockDisponible < 0) {
    viewStockDisponible = 0
  }

  const status = 'readonly'

  const actions = `
    <button id="dProduct" onclick="deleteProduct(${viewID})" class="close-modal" >Eliminar</button>
    <button id="dProduct" onclick="modProduct(${viewID})" class="close-modal" >Modificar</button>
    <button id="saveButton" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
    <button onclick="addItem()" class="close-modal" >Nuevo</button>

  `
  if (!id) {
    await fillSearch()
  }
  const detalles = `
  <article class="grid">
  <h2>Detalles</h2>
  <div class="article-wrapper">
      <div class="details-row">
          <strong>Codigo:</strong>
          <input type="text" id="codigo" name="codigo" placeholder="Codigo" value="${viewID}" ${status}>
      </div>
      <div class="details-row">
          <strong>Descripcion:</strong>
          <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción" value="${viewDescription}" ${status}>
      </div>
      <div class="details-row">
          <strong>Categoria:</strong>
          <select id="categoria" name="categoria" ${status} text = "a">${viewCategory}"
          <option >${viewCategory}</option>
          </select>
      </div>
      <div class="details-row">
          <strong>Precio:</strong>
          <input type="text" id="precio" name="precio" placeholder="Precio" value="${viewPrice}" ${status}>
      </div>
      <div class="details-row">
          <strong>Costo:</strong>
          <input type="text" id="costo" name="costo" placeholder="Costo" value="${viewCost}" ${status}>
      </div>
      <div class="details-row">
          <strong>Stock:</strong>
          <input type="text" id="stock" name="stock" placeholder="Stock" value="${viewStock}" ${status}>
      </div>
      <div class="details-row">
          <strong>Stock Comprometido:</strong>
          <input type="text" id="stock" name="stock" placeholder="Stock" value="${viewStockComprometido}" ${status}>
      </div>
      <div class="details-row">
          <strong>Stock Disponible:</strong>
          <input type="text" id="stock" name="stock" placeholder="Stock" value="${viewStockDisponible}" ${status}>
      </div>
  </div>
</article>

  `
  document.getElementById('actions').innerHTML = actions
  document.getElementById('modal-detail').innerHTML = detalles
  document.getElementById('saveButton').style.backgroundColor = 'grey'
}

/* //Category
-------------------- */
async function fillModalC (id) {
  const lstProducts = await getCategory()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const status = 'readonly'

  const actions = `
    <button id="dW" onclick="deleteCategory(${viewID})" class="close-modal" >Eliminar</button>
    <button id="mW" onclick="modCategory(${viewID})" class="close-modal" >Modificar</button>
    <button id="saveButtonC" onclick="saveCategory()" class="close-modal" disabled >Guardar</button>
    <button onclick="addCategory()" class="close-modal" >Nuevo</button>
  `
  if (!id) {
    await fillSearchC()
  }
  const detalles = `
    <article class="grid">
      <h2>Detalles</h2>
      <div class="article-wrapper">
        <div style="display: flex; flex-direction:row; justify-content:center; align-items:center" class="article-body">
          <p style="margin: 0; padding-left: 10px;"><strong>Codigo:</strong> <input type="text" id="codigo" name="codigo" placeholder="Codigo" value="${viewID}" ${status}></p>
          <p style="margin: 0; padding-left: 10px;"><strong style="padding-left: 10px;">Descripcion:</strong> <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción" value="${viewDescription}" ${status}></p>
        </div>
      </div>
    </article>
  `
  document.getElementById('actionC').innerHTML = actions
  document.getElementById('modal-detailC').innerHTML = detalles
  document.getElementById('saveButtonC').style.backgroundColor = 'grey'
}
/* //Cargo
-------------------- */
async function fillModalCargo (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]

  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const viewCost = selected?.cost || ''
  const status = 'readonly'
  const actions = `
    <button id="saveCargo" onclick="saveCargo()" class="close-modal" >Guardar</button>
  `

  if (!id) {
    await fillSearchCargo()
  }
  const detalles = `
    <article class="grid">
      <h2>Nuevo Movimiento</h2>
      <div class="article-wrapper">
      <div style="display: flex; flex-direction:row; justify-content:center; align-items:center" class="article-body">
        <p style="margin: 0; padding-left: 10px;"><strong>Codigo:</strong> <input type="text" id="codigoC" name="codigo" placeholder="Codigo" value="${viewID}" ${status}></p>
        <p style="margin: 0; padding-left: 10px;"><strong style="padding-left: 10px;">Descripcion:</strong> <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción" value="${viewDescription}" ${status}></p>
        <p style="margin: 0; padding-left: 10px; width: 180px;"><strong style="padding-left: 10px;">Costo:</strong> <input style="width: 80px;" type="text" id="costoC" name="costoD" value="${viewCost}" ${status}></p>
        <p style="margin: 0; padding-left: 10px;"><strong>Cantidad:</strong> <input type="text" id="cantidadC" name="cantidad" placeholder="Ingrese la cantidad" ></p>
      </div>
      </div>
    </article>
  `
  document.getElementById('actionsCa').innerHTML = actions
  document.getElementById('modal-detailCa').innerHTML = detalles
}

/* //Descargo
-------------------- */
async function fillModalDescargo (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  const viewCost = selected?.cost || ''
  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const status = 'readonly'
  const actions = `
    <button id="saveDescargo" onclick="saveDescargo()" class="close-modal" >Guardar</button>
  `

  if (!id) {
    await fillSearchDescargo()
  }
  const detalles = `
    <article class="grid">
      <h2>Nuevo Movimiento</h2>
      <div class="article-wrapper">
        <div style="display: flex; flex-direction:row; justify-content:center; align-items:center" class="article-body">
          <p style="margin: 0; padding-left: 10px;"><strong>Codigo:</strong> <input type="text" id="codigoD" name="codigo" placeholder="Codigo" value="${viewID}" ${status}></p>
          <p style="margin: 0; padding-left: 10px;"><strong style="padding-left: 10px;">Descripcion:</strong> <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción" value="${viewDescription}" ${status}></p>
          <p style="margin: 0; padding-left: 10px; width: 180px;"><strong style="padding-left: 10px;">Costo:</strong> <input style="width: 80px;" type="text" id="costoD" name="costoD" value="${viewCost}" ${status}></p>
          <p style="margin: 0; padding-left: 10px;"><strong>Cantidad:</strong> <input type="text" id="cantidadD" name="cantidad" placeholder="Ingrese la cantidad" ></p>
        </div>
      </div>
    </article>
  `
  document.getElementById('actionsDe').innerHTML = actions
  document.getElementById('modal-detailDe').innerHTML = detalles
}

/* //CONTROLERS
-------------------- */

async function getProducts (params) {
  const response = await fetch('/api/inventario/products')
  return await response.json()
}// Devuelve array con todos los articulos creados

// eslint-disable-next-line no-unused-vars
async function getWarehouse (params) {
  const response = await fetch('/api/inventario/warehouse')
  return await response.json()
}
async function getCategory (params) {
  const response = await fetch('/api/inventario/category')
  return await response.json()
}
async function insertProducts (params) {
  try {
    const response = await fetch('/api/inventario/new/product', {
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
    // console.error('Error de red:', error)
  }
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

async function updateProducts (params) {
  try {
    const response = await fetch(`/api/inventario/set/product/${params.id}`, {
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
    // console.error('Error de red:', error)
  }
}

async function removeProducts (id) {
  try {
    const response = await fetch(`/api/inventario/products/delete/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      await response.json()
    } else {
      console.error('Error al insertar el producto:', response.status)
    }
  } catch (error) {
    // console.error('Error de red:', error)
  }
}

// Create category
async function insertCategory (params) {
  try {
    const response = await fetch('/api/inventario/new/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (response.ok) {
      await response.json()
    } else {
      console.error('Error al insertar la categoria:', response.status)
    }
  } catch (error) {
    // console.error('Error de red:', error)
  }
}

// Update category

async function updateCategory (params) {
  try {
    const response = await fetch(`/api/inventario/set/category/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (response.ok) {
      await response.json()
    } else {
      console.error('Error al insertar la categoria:', response.status)
    }
  } catch (error) {
    // console.error('Error de red:', error)
  }
}

async function removeCategory (id) {
  try {
    const response = await fetch(`/api/inventario/category/delete/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      await response.json()
    } else {
      // eslint-disable-next-line no-undef
      alert('Existen productos asociado a esta categoria')
      console.error('Error al insertar el categoria:', response.status)
    }
  } catch (error) {
    // console.error('Error de red:', error)
  }
}

// REPORTES

// Nueva funcion para obtener los datos de productos, almacenes, categorias y recetas
// eslint-disable-next-line no-unused-vars
async function obtenerDatosGenerales () {
  const select = document.getElementById('report-list')
  const selected = select.options[select.selectedIndex].value
  const [productos, inventario, categorias] = await Promise.all([
    fetch('/api/inventario/products'),
    fetch('/api/inventario/inventario'),
    fetch('/api/inventario/category')
  ])

  const datos = Promise.all([
    productos.json(),
    inventario.json(),
    categorias.json()
  ])
  mostrarDatosGeneralesEnTabla(await datos, selected)
}
function mostrarDatosGeneralesEnTabla (datos, tipo) {
  const tabla = document.getElementById('productTable')
  const titulo = document.getElementById('titulo-reporte')

  const table = document.createElement('ul')
  let htmlGeneral = ''
  if (tipo === 'pr') {
    // Mostrar productos
    titulo.innerHTML = 'Listado de Productos'
    for (const producto of datos[0]) {
      htmlGeneral += `<p>${producto.id} - ${producto.description}</p>`
    }
  } else if (tipo === 'ct') {
    // Mostrar categorias
    titulo.innerHTML = 'Listado de Categorias'
    for (const producto of datos[2]) {
      htmlGeneral += `<p>${producto.id} - ${producto.description}</p>`
    }
  } else if (tipo === 'prs') {
    // Mostrar categorias
    titulo.innerHTML = 'Productos con su Stock'
    for (const producto of datos[0]) {
      htmlGeneral += `<p>${producto.id} - ${producto.description} = ${producto.stock}</p>`
    }
  } else if (tipo === 'prsd') {
    // Mostrar categorias
    titulo.innerHTML = 'Productos con su Stock Disponible'
    for (const producto of datos[0]) {
      let disponible = producto.stock - producto.comprometido
      if (disponible < 0) {
        disponible = 0
      }
      htmlGeneral += `<p>${producto.id} - ${producto.description} = ${disponible}</p>`
    }
  } else if (tipo === 'prsc') {
    // Mostrar categorias
    titulo.innerHTML = 'Productos con su Stock Comprometido'
    for (const producto of datos[0]) {
      htmlGeneral += `<p>${producto.id} - ${producto.description} = ${producto.comprometido}</p>`
    }
  } else if (tipo === 'inv') {
    // Mostrar categorias
    titulo.innerHTML = 'Ajustes de Stock Manuales'
    for (const movimiento of datos[1]) {
      const producto = datos[0].find(item => item.id === movimiento.productId)
      htmlGeneral += `<p>${movimiento.id} - ${movimiento.motivo} - ${movimiento.productId} - ${producto.description} -  ${movimiento.tipo} - ${movimiento.stock}</p>`
    }
  }
  console.log(datos)
  tabla.innerHTML = ''
  table.innerHTML = htmlGeneral
  tabla.appendChild(table)
}
