
// Hacer Fecth

async function getLatestOrder () {
  try {
  //  Realizar la solicitud GET al servidor mediante la API
    const response = await fetch('/api/ventas/latestOrder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      // Obtener la respuesta en formato JSON
      const latestOrder = await response.json()
      console.log(typeof (latestOrder))
      console.log(latestOrder)
    } else {
      // Error al obtener la última orden
      console.error('Hubo un error al obtener la última orden. Código de estado:', response.status)
      alert('Hubo un error al obtener la última orden. Por favor, inténtelo de nuevo más tarde.')
    }
  } catch (error) {
    console.error('Error al obtener la última orden:', error)
    alert('Hubo un error al obtener la última orden. Por favor, revise la consola para más detalles.')
  }
}