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
fetch(`/api/ventas/orders/${codigoIngresado}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    return response.json()
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    console.log(data)
    let orden = data.orderId
    document.getElementById('NombreEmpresa').value = data[0].customerName
    document.getElementById('RifEmpresa').value = data[0].customerId
    document.getElementById('EmailEmpresa').value = data[0].email
    document.getElementById('NumberEmpresa').value = data[0].phoneNumber
    document.getElementById('HoraEmpresa').value = data[0].time
    document.getElementById('StatusEmpresa').value = data[0].status
    document.getElementById('PrecioTEmpresa').value = data[0].totalPriceOrder
    const { products } = data
  })
  .catch(error => {
    console.error('Error:', error)
  })
console.log(products)
console.log(orden)

