const openEls = document.querySelectorAll('[data-open]')
const closeEls = document.querySelectorAll('[data-close]')
const isVisible = 'is-visible'

function newProduct(params) {
  
}

async function fillSearch () {
  const lstProducts = await getProducts()
  console.log(lstProducts)

  const options = lstProducts.map((product, index) => `
        <option value="${index}">${product.productName}</option>
    `)

  const selectElement = document.getElementById('products')
  selectElement.innerHTML = options.join('')
}

async function saveProduct(id, des, category) {
  const codValue = document.getElementById('codigo').value
  const desValue = document.getElementById('descripcion').value
  const categorValue = document.getElementById('categoria').value

  const product = {
    description: desValue,
    categoryId: categorValue
  }
  await insertProducts(product)
}

async function fillModal (type) {
  const lstProducts = await getProducts()
  console.log(lstProducts)
  const actions = `
    <button class="close-modal" aria-label="close modal" data-close>Modificar</button>
    <button onclick="saveProduct()" class="close-modal" aria-label="close modal" data-close>Guardar</button>`
  document.getElementById('actions').innerHTML += actions




  await fillSearch()





  const detalles = `
    <article class="grid">
    <h2>Detalles</h2>
    <div class="article-wrapper">
        <div style="display: flex; flex-direction:row; justify-content:center; align-items:center" class="article-body">
            <p style="margin: 0; padding-left: 10px;"><strong>Codigo:</strong> <input type="text" id="codigo" name="codigo" placeholder="Ingrese el código"></p>
            <p style="margin: 0; padding-left: 10px;"><strong>Descripcion:</strong> <input type="text" id="descripcion" name="descripcion" placeholder="Ingrese la descripción"></p>
            <p style="margin: 0; padding-left: 10px;"><strong>Categoria:</strong> <input type="text" id="categoria" name="categoria" placeholder="Ingrese la categoría"></p>
        </div>
    </div>
  </article>
`
  document.getElementById('modal-detail').innerHTML = detalles
}

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
  // if we press the ESC
  if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
})

/* //CONTROLERS
-------------------- */

async function getProducts (params) {
  const response = await fetch('/api/inventario/products')
  return await response.json()
}
async function insertProducts (params) {
  console.log(params)
  try {
    const response = await fetch('/api/inventario/new/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Producto insertado:', data)
    } else {
      console.error('Error al insertar el producto:', response.status)
    }
  } catch (error) {
    console.error('Error de red:', error)
  }
}
