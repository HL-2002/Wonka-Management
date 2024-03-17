/* eslint-disable no-undef */
import { toast } from 'https://cdn.skypack.dev/wc-toast'
let filteredProducts = []
document.addEventListener('DOMContentLoaded', async function () {
  await getProducts()
  const send = document.getElementById('send')
  const add = document.getElementById('add')

  send.addEventListener('click', submitOrder)
  add.addEventListener('click', addProduct)
  // delelete.addEventListener('click', deleteRow)
  // charge the products from the local storage

  const backupProducts = localStorage.getItem('order-products')
  if (backupProducts) {
    const products = JSON.parse(backupProducts)
    for (const product of products) {
      const table = document.getElementById('productTable')
      const newRow = table.insertRow()

      const productNameCell = newRow.insertCell(0)
      const productQuantityCell = newRow.insertCell(1)
      const deleteCell = newRow.insertCell(2)

      productNameCell.textContent = product.productName

      // Crear un campo de entrada para la cantidad
      const quantityInput = document.createElement('input')
      quantityInput.type = 'number'
      quantityInput.value = product.productQuantity
      quantityInput.style.width = '50px' // Establecer el ancho deseado
      quantityInput.style.backgroundColor = '#34005f'
      quantityInput.style.color = '#ececec' // Establecer el color de fondo
      quantityInput.style.border = 'none'
      quantityInput.style.textAlign = 'center'
      quantityInput.onchange = function () {
        // Validar que la cantidad sea un número positivo
        if (parseInt(this.value) < 1) {
          alert('Ingrese una cantidad válida')
          this.value = product.productQuantity // Restaurar el valor original si la cantidad no es válida
        } else {
          product.productQuantity = this.value // Actualizar la cantidad
        }
      }
      productQuantityCell.appendChild(quantityInput)

      deleteCell.innerHTML = '<button class="btn-delete">Eliminar</button>'
    }
    document.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.addEventListener('click', (ent) => {
        deleteRow(ent.target)
      })
    })
  }
})

async function getProducts () {
  try {
    const response = await fetch('/api/inventario/products')
    const products = await response.json()

    // Filtrar los productos según el atributo categoryId sea igual a 2
    filteredProducts = products.filter(product => product.categoryId === 2)

    // Llamar a la función que agrega los productos filtrados al select
    console.log(filteredProducts)
    populateSelect(filteredProducts)
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

function populateSelect (products) {
  const select = document.getElementById('why')

  // Limpiar cualquier opción previa
  select.innerHTML = ''

  // Agregar las nuevas opciones
  products.forEach(product => {
    const option = document.createElement('option')
    option.value = product.id
    option.textContent = product.description // Aquí se usa el atributo 'description'
    select.appendChild(option)
  })
}

function addProduct () {
  console.log('addProduct')
  const select = document.getElementById('why')
  const productName = select.options[select.selectedIndex].text
  let productQuantity = document.getElementById('quantity').value

  if (parseInt(productQuantity) < 1 || productQuantity === '') {
    // alert('Ingrese una cantidad válida')
    toast('Ingrese una cantidad válida', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })
  } else {
    const tableRows = document.querySelectorAll('#productTable tr')
    for (let i = 0; i < tableRows.length; i++) {
      if (tableRows[i].cells[0].textContent === productName) {
        // alert('¡Este producto ya ha sido agregado!')
        toast('¡Este producto ya ha sido agregado!', {
          duration: 3000,
          icon: {
            type: 'error'
          }
        })

        return
      }
    }

    const table = document.getElementById('productTable')
    const newRow = table.insertRow()

    const productNameCell = newRow.insertCell(0)
    const productQuantityCell = newRow.insertCell(1)
    const deleteCell = newRow.insertCell(2)

    productNameCell.textContent = productName

    // Crear un campo de entrada para la cantidad
    const quantityInput = document.createElement('input')
    quantityInput.type = 'number'
    quantityInput.value = productQuantity
    quantityInput.style.width = '50px' // Establecer el ancho deseado
    quantityInput.style.backgroundColor = '#34005f'
    quantityInput.style.color = '#ececec' // Establecer el color de fondo
    quantityInput.style.border = 'none'
    quantityInput.style.textAlign = 'center'
    quantityInput.onchange = function () {
      // Validar que la cantidad sea un número positivo
      if (parseInt(this.value) < 1) {
        alert('Ingrese una cantidad válida')
        this.value = productQuantity // Restaurar el valor original si la cantidad no es válida
      } else {
        productQuantity = this.value // Actualizar la cantidad
      }
    }
    productQuantityCell.appendChild(quantityInput)

    deleteCell.innerHTML = '<button class="btn-delete" >Eliminar</button>'

    document.querySelectorAll('.btn-delete').forEach((btn) => {
      if (btn.onclick === null || btn.onclick === undefined) {
        btn.addEventListener('click', (ent) => {
          deleteRow(ent.target)
        })
      }
    })

    const backupProducts = localStorage.getItem('order-products')
    if (backupProducts) {
      const products = JSON.parse(backupProducts)
      products.push({
        productId: select.value,
        productName,
        productQuantity
      })
      localStorage.setItem('order-products', JSON.stringify(products))
    } else {
      localStorage.setItem('order-products', JSON.stringify([{
        productId: select.value,
        productName,
        productQuantity
      }]))
    }
  }
}

function deleteRow (btn) {
  const row = btn.parentNode.parentNode
  row.parentNode.removeChild(row)
  const backupProducts = localStorage.getItem('order-products')
  if (backupProducts) {
    const products = JSON.parse(backupProducts)
    // get a name of firt cell
    const name = row.cells[0].textContent
    const index = products.findIndex(product => product.productName === name)
    products.splice(index, 1)
    localStorage.setItem('order-products', JSON.stringify(products))
  }
}

async function submitOrder () {
  const name = document.getElementById('name').value.trim()
  const customerPrefix = document.getElementById('rif-prefix').value
  let customerId = document.getElementById('customerId').value.trim()
  const email = document.getElementById('email').value.trim()
  const phoneNumber = document.getElementById('phoneNumber').value.trim()

  const productsArray = []

  // Recopilar la información de los productos del ticket
  const tableRows = document.querySelectorAll('#productTable tr')
  tableRows.forEach(function (row) {
    const productName = row.cells[0].textContent // Obtener el nombre del producto de la primera celda
    const productQuantityInput = row.cells[1].querySelector('input[type="number"]') // Obtener el input de cantidad de la segunda celda
    const productQuantity = parseInt(productQuantityInput.value) // Obtener la cantidad del input

    // Buscar el producto correspondiente en el array filtrado según el nombre
    const filteredProduct = filteredProducts.find(product => product.description === productName)

    if (filteredProduct) { // Si se encuentra el producto en el array filtrado
      // Crear un objeto product con los datos del producto y la cantidad
      const product = {
        productId: filteredProduct.id, // Obtener el ID del producto del array filtrado
        productName,
        productQuantity,
        productPrice: filteredProduct.price,
        totalPrice: productQuantity * filteredProduct.price
        // Aquí puedes agregar más atributos como 'productPrice' si están disponibles en el array filtrado
      }
      console.log(product)

      // Agregar el objeto product al array de productos
      productsArray.push(product)
    } else {
      console.error('No se encontró el producto en el array filtrado:', productName)
    }
  })

  // Verificar que se haya ingresado toda la información necesaria
  if (name === '' || customerId === '' || email === '' || phoneNumber === '') {
    // alert('Por favor, complete todos los campos del formulario y agregue al menos un producto.')
    toast('Por favor, complete todos los campos del formulario', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })
    return
  }

  if (productsArray.length === 0) {
    toast('Por favor, agregue al menos un producto', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })
    return
  }

  if (customerId.length !== 9) {
    toast('Ingrese un RIF valido', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })

    document.getElementById('customerId').value = ''

    return
  }
  customerId = customerPrefix + '-' + customerId

  const validEmailRegex = /\S+@\S+\.\S{2,}/
  if (!validEmailRegex.test(email)) {
    toast('Ingrese un correo valido', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })

    return false
  }

  if (phoneNumber.length !== 11) {
    toast('Ingrese un número de teléfono valido', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })

    document.getElementById('phoneNumber').value = ''
    return
  }

  const fechaHoraActual = new Date()

  // Obtener los componentes de la fecha y hora
  const año = fechaHoraActual.getFullYear()
  let mes = fechaHoraActual.getMonth() + 1 // Los meses comienzan desde 0, por lo que se suma 1
  let dia = fechaHoraActual.getDate()
  let horas = fechaHoraActual.getHours()
  let minutos = fechaHoraActual.getMinutes()
  let segundos = fechaHoraActual.getSeconds()

  // Agregar ceros delante si es necesario para que tenga dos dígitos
  mes = (mes < 10 ? '0' : '') + mes
  dia = (dia < 10 ? '0' : '') + dia
  horas = (horas < 10 ? '0' : '') + horas
  minutos = (minutos < 10 ? '0' : '') + minutos
  segundos = (segundos < 10 ? '0' : '') + segundos

  // Formatear la fecha y hora en el formato deseado (YYYY-MM-DD HH:MM:SS)
  const fecha = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos

  // Definir precio total
  let totalPrice = 0

  for (const product of productsArray) {
    totalPrice += product.totalPrice
  }

  console.log(customerId)
  // Construir el objeto de pedido
  const order = {
    name,
    customerId,
    email,
    phoneNumber,
    time: fecha,
    products: productsArray,
    totalPriceOrder: totalPrice

  }

  try {
    // Enviar el pedido al servidor mediante la API
    const response = await fetch('/api/ventas/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })

    if (response.ok) {
      // Pedido enviado correctamente
      toast('Pedido enviado correctamente', {
        duration: 3000,
        icon: {
          type: 'success'
        }
      })
      // Limpiar el formulario y la tabla de productos después de enviar el pedido
      document.getElementById('name').value = ''
      document.getElementById('customerId').value = ''
      document.getElementById('email').value = ''
      document.getElementById('phoneNumber').value = ''
      document.getElementById('productTable').innerHTML = ''

      // Limpiar el local storage
      localStorage.removeItem('order-products')
    } else {
      // Error al enviar el pedido
      // alert('Hubo un error al enviar el pedido. Por favor, inténtelo de nuevo más tarde.')
      toast('Hubo un error al enviar el pedido. Por favor, inténtelo de nuevo más tarde.', {
        duration: 3000,
        icon: {
          type: 'error'
        }
      })
    }
  } catch (error) {
    console.error('Error al enviar el pedido:', error)
    // alert('Hubo un error al enviar el pedido. Por favor, revise la consola para más detalles.')
    toast('Hubo un error al enviar el pedido. Por favor, revise la consola para más detalles.', {
      duration: 3000,
      icon: {
        type: 'error'
      }
    })
  }
}
