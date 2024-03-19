document.addEventListener('DOMContentLoaded', function () {
  const navsButtons = document.querySelectorAll('.btn-nav button')
  const creater = document.querySelector('#creater')
  const viewer = document.querySelector('#viewer')
  const mainTitle = document.querySelector('.main-title')
  const close = document.querySelector('#close')

  document.querySelector('#state').addEventListener('change', renderViewer)
  let deley
  document.querySelector('#search').addEventListener('input', () => {
    clearTimeout(deley)
    deley = setTimeout(renderViewer, 500)
  })

  close.addEventListener('click', () => {
    const dialog = document.querySelector('#dialog')
    dialog.close()
  })

  const initialNav = localStorage.getItem('nav')
  if (!initialNav) {
    localStorage.setItem('nav', 'create')
  }
  updateButtons()

  if (initialNav === 'create') {
    creater.style.display = 'flex'
    viewer.style.display = 'none'
    mainTitle.textContent = 'Crea Orden de Pedidos'
    // change color of the buttons
  } else if (initialNav === 'view') {
    creater.style.display = 'none'
    viewer.style.display = 'block'
    mainTitle.textContent = 'Ver ordenes de pedidos'
    renderViewer()
  }
  navsButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const target = e.target
      const action = target.getAttribute('data-action')

      if (action === 'create') {
        creater.style.display = 'flex'
        viewer.style.display = 'none'
        mainTitle.textContent = 'Crea Orden de Pedidos'
        localStorage.setItem('nav', 'create')
        updateButtons()
      } else if (action === 'view') {
        creater.style.display = 'none'
        viewer.style.display = 'block'
        mainTitle.textContent = 'Ver ordenes de pedidos'
        await renderViewer()
        localStorage.setItem('nav', 'view')
        updateButtons()
      }
    })
  })
}

)

const renderViewer = async () => {
  const orders = await getOrders()
  const tableBody = document.querySelector('#orderTable')
  const filterType = document.querySelector('#state').value
  const filterName = document.querySelector('#search').value
  tableBody.innerHTML = ''
  if (orders.length > 0) {
    orders.filter((order) => {
      if (order.orderId.toString().startsWith(filterName) && (order.status === filterType || filterType === 'all')) {
        return true
      } else {
        return false
      }
    })

      .forEach((order) => {
        const tr = document.createElement('tr')
        const TotalInINTL = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(order.totalPriceOrder)
        tr.innerHTML = `
        <td>${order.orderId}</td>

            <td>${order.name}</td>
            <td>${order.customerId}</td>
            <td>${order.email}</td>
            <td>${order.phoneNumber}</td>
            <td>${order.status}</td>
            <td>${order.time}</td>
            <td>${order.address}</td>
            <td>${TotalInINTL}</td>
            
            <td>
            <button class="btn-view"  data-order-id="${order.orderId}">Ver</button>
            </td>
        `
        tableBody.appendChild(tr)
      })
  }

  document.querySelectorAll('.btn-view').forEach((btn) => {
    btn.addEventListener('click', renderDialog)
  })
}

const updateButtons = () => {
  const state = localStorage.getItem('nav')
  const buttons = document.querySelectorAll('.btn-nav button')
  buttons.forEach((button) => {
    if (button.getAttribute('data-action') === state) {
      button.classList.add('selected')
    } else {
      button.classList.remove('selected')
    }
  })
}

const renderDialog = async (event) => {
  const dialog = document.querySelector('#dialog')
  const orderId = event.target.getAttribute('data-order-id')
  const order = await getOrder(orderId)
  dialog.showModal()

  dialog.querySelector('#order-id').textContent = order.orderId
  dialog.querySelector('#customer-name').textContent = order.name
  dialog.querySelector('#customer-id').textContent = order.customerId
  dialog.querySelector('#email').textContent = order.email
  dialog.querySelector('#phone-number').textContent = order.phoneNumber
  dialog.querySelector('#status').textContent = order.status
  dialog.querySelector('#time').textContent = order.time
  dialog.querySelector('#address').textContent = order.address
  dialog.querySelector('#total-price-order').textContent = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(order.totalPriceOrder)
  const orderItems = order.products.map(item => {
    const price = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(item.productPrice)
    const totalPrice = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(item.totalPrice)
    return `<tr>
        <td>${item.productId}</td>
        <td>${item.productName}</td>
        <td>${item.productQuantity}</td>
        <td>${price}</td>
        <td>${totalPrice}</td>
    </tr>
`
  }).join('')

  const orderItemsTable = `
    <table>
        <thead>
            <tr>
                <th>ID de producto</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio C/U</th>
                <th>Precio total</th>

            </tr>
        </thead>
        <tbody>
            ${orderItems}
        </tbody>
    </table>
`

  dialog.querySelector('#order-items').innerHTML = orderItemsTable
}

const getOrders = async () => {
  const response = await fetch('/api/ventas/orders')
  const data = await response.json()
  return data
}

const getOrder = async (id) => {
  const response = await fetch(`/api/ventas/orders/${id}`)
  return await response.json()
}
