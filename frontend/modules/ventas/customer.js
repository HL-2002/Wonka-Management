export const saveCustomer = async (data) => {
  try {
    const response = await fetch('/api/ventas/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response
  } catch (error) {
    console.error('Error al guardar el cliente:', error)
    return { status: 500, message: 'Ocurrió un error al procesar la solicitud.', ok: false }
  }
}

export const getCustomers = async () => {
  const response = await fetch('/api/ventas/customer')
  return response.json()
}

export const loadCustomers = async () => {
  const customers = await getCustomers()
  const customerSelect = document.getElementById('customer')

  const optionsValues = customerSelect.querySelectorAll('option')
  optionsValues.forEach((option) => {
    if (option.value !== 'new') {
      customerSelect.removeChild(option)
    }
  })

  customers.forEach((customer) => {
    const option = document.createElement('option')
    option.value = customer.rif
    option.text = customer.name
    customerSelect.appendChild(option)
  })
}

export const DeleteCustomer = async (rif) => {
  try {
    const response = await fetch(`/api/ventas/customer/${rif}`, {
      method: 'DELETE'
    })
    return response
  } catch (error) {
    console.error('Error al eliminar el cliente:', error)
    return { status: 500, message: 'Ocurrió un error al procesar la solicitud.', ok: false }
  }
}
