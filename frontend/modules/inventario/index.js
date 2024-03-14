const openEls = document.querySelectorAll('[data-open]')
const closeEls = document.querySelectorAll('[data-close]')
const isVisible = 'is-visible'

/* //Modal animation
-------------------- */
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
document.getElementById('store').addEventListener('change', (evt) => {
  const option = evt.currentTarget.selectedOptions[0]
  fillModalW(option.value)
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
async function fillSearchW () {
  const lstProducts = await getWarehouse()
  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('store')
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
  console.log(lstCategory)

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

  const product = {
    id: codValue,
    sum: 1,
    units: cantidadValue
  }
  await insertStock(product)
  await fillModalCargo()
}
// eslint-disable-next-line no-unused-vars
async function saveDescargo () {
  const codValue = document.getElementById('codigoD').value
  const cantidadValue = document.getElementById('cantidadD').value

  const product = {
    id: codValue,
    sum: '0',
    units: cantidadValue
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

/* //PRODUCTOS
-------------------- */
async function fillModal (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  const lstCategory = await getCategory()
  const selectedCategoty = selected.id ? lstCategory.find(item => item.id === parseInt(selected.categoryId)) : lstCategory[0]

  console.log(parseInt(selected.id))

  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const viewCategory = selectedCategoty?.description || ''
  const viewPrice = selected?.price || ''
  const viewCost = selected?.cost || ''
  const viewStock = selected?.stock || 0

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
  </div>
</article>

  `
  document.getElementById('actions').innerHTML = actions
  document.getElementById('modal-detail').innerHTML = detalles
  document.getElementById('saveButton').style.backgroundColor = 'grey'
}

/* //Warehouse
-------------------- */
async function fillModalW (id) {
  const lstProducts = await getWarehouse()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const status = 'readonly'

  const actions = `
    <button id="dW" onclick="deleteProduct(${viewID})" class="close-modal" >Eliminar</button>
    <button id="mW" onclick="modProduct(${viewID})" class="close-modal" >Modificar</button>
    <button id="saveButton" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
  `
  if (!id) {
    await fillSearchW()
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
  document.getElementById('actionW').innerHTML = actions
  document.getElementById('modal-detailW').innerHTML = detalles
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
    <button id="dW" onclick="deleteProduct(${viewID})" class="close-modal" >Eliminar</button>
    <button id="mW" onclick="modProduct(${viewID})" class="close-modal" >Modificar</button>
    <button id="saveButton" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
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
  document.getElementById('saveButton').style.backgroundColor = 'grey'
}
/* //Cargo
-------------------- */
async function fillModalCargo (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]

  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
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

// eslint-disable-next-line no-unused-vars
async function insertStore (params) {
  try {
    const response = await fetch('/api/inventario/new/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (response.ok) {
      await response.json()
    } else {
      console.error('Error al insertar el Almacen:', response.status)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}

async function getProducts (params) {
  const response = await fetch('/api/inventario/products')
  return await response.json()
}// Devuelve array con todos los articulos creados

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
    console.error('Error de red:', error)
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
    // console.error('Error de red:', error)
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
    console.error('Error de red:', error)
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
    console.error('Error de red:', error)
  }
}
