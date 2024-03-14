function Verificar () {
  const codigoIngresado = document.getElementById('factura').value

  if (codigoIngresado === '1') {
    document.getElementById('facturaexistente').style.display = 'block'
    document.getElementById('errornofactura').style.display = 'none'
  } else {
    document.getElementById('facturaexistente').style.display = 'none'
    document.getElementById('errornofactura').style.display = 'block'
  }
}
const codigoIngresado = document.getElementById('factura').value
fetch(`http://localhost:3000/api/ventas/orders/${codigoIngresado}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    return response.json()
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    console.log(data)
    document.getElementById('NombreEmpresa').value = data.customerName
    document.getElementById('RifEmpresa').value = data.customerId
    document.getElementById('EmailEmpresa').value = data.email
    document.getElementById('NumberEmpresa').value = data.phoneNumber
    document.getElementById('HoraEmpresa').value = data.time
    document.getElementById('StatusEmpresa').value = data.status
    document.getElementById('PrecioTEmpresa').value = data.totalPrice
    const { products } = data
  })
  .catch(error => {
    console.error('Error:', error)
  })
console.log(products)

