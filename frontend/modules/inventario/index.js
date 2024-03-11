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
  console.log(lstProducts)
  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('store')
  selectElement.innerHTML = options.join('')
}
async function fillSearchC () {
  const lstProducts = await getCategory()
  const options = lstProducts.map((product, index) => `
        <option value="${product.id}">${product.description}</option>
    `)

  const selectElement = document.getElementById('category')
  selectElement.innerHTML = options.join('')
}

/* //Reutilizables
-------------------- */

function addProduct(params) {
  const codValue = document.getElementById('codigo')
  const desValue = document.getElementById('descripcion')
  const categorValue = document.getElementById('categoria')
  const save = document.getElementById('sProduct')
  save.style.backgroundColor = 'initial'

  codValue.value = ''
  desValue.value = ''
  categorValue.value = ''

  desValue.readOnly = false
  categorValue.readOnly = false
  save.disabled = false
}
async function deleteProduct(id) {
  await removeProducts(id)
  await fillModal()
}

async function saveProduct(id, des, category) {
  const codValue = document.getElementById('codigo').value
  const desValue = document.getElementById('descripcion').value
  const categorValue = document.getElementById('categoria').value

  const product = {
    id: codValue,
    description: desValue,
    categoryId: categorValue
  }
  if (codValue === '') {
    await insertProducts(product)
  } else {
    await updateProducts(product)
  }
  await fillModal()
}

async function modProduct(id, des, category) {
  const save = document.getElementById('sProduct')
  save.disabled = false
  save.style.backgroundColor = 'initial'
  const desValue = document.getElementById('descripcion')
  const categorValue = document.getElementById('categoria')

  desValue.readOnly = false
  categorValue.readOnly = false
}

/* //PRODUCTOS
-------------------- */
async function fillModal (id) {
  const lstProducts = await getProducts()
  const selected = id ? lstProducts.find(item => item.id === parseInt(id)) : lstProducts[0]
  console.log(lstProducts)

  const viewID = selected?.id || ''
  const viewDescription = selected?.description || ''
  const viewCategory = selected?.categoryId || ''
  const status = 'readonly'

  const actions = `
    <button id="dProduct" onclick="deleteProduct(${viewID})" class="close-modal" >Eliminar</button>
    <button id="dProduct" onclick="modProduct(${viewID})" class="close-modal" >Modificar</button>
    <button id="sProduct" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
  `
  if (!id) {
    await fillSearch()
  }
  const detalles = `
    <article class="grid">
      <h2>Detalles</h2>
      <div class="article-wrapper">
        <div style="display: flex; flex-direction:row; justify-content:center; align-items:center" class="article-body">
          <p style="margin: 0; padding-left: 10px;"><strong>Codigo:</strong> <input type="text" id="codigo" name="codigo" placeholder="Codigo" value="${viewID}" ${status}></p>
          <p style="margin: 0; padding-left: 10px;"><strong style="padding-left: 10px;">Descripcion:</strong> <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción" value="${viewDescription}" ${status}></p>
          <p style="margin: 0; padding-left: 10px;"><strong>Categoria:</strong> <input type="text" id="categoria" name="categoria" placeholder="Ingrese la categoría" value="${viewCategory}" ${status}></p>
        </div>
      </div>
    </article>
  `
  document.getElementById('actions').innerHTML = actions
  document.getElementById('modal-detail').innerHTML = detalles
  document.getElementById('sProduct').style.backgroundColor = 'grey'
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
    <button id="sW" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
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
  document.getElementById('modal-detailw').innerHTML = detalles
  document.getElementById('sW').style.backgroundColor = 'grey'
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
    <button id="sC" onclick="saveProduct()" class="close-modal" disabled >Guardar</button>
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
  document.getElementById('sC').style.backgroundColor = 'grey'
}

/* //CONTROLERS
-------------------- */

async function getStore() {
  const response = await fetch('/api/almacenes')
  return await response.json()
}

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
      const data = await response.json()
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
}
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
    const response = await fetch(`/api/inventario//products/delete/${id}`, {
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
