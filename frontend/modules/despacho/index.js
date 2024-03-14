function Verificar() {
    var codigoIngresado = document.getElementById("factura").value;

  if (codigoIngresado === "1") {
    document.getElementById("facturaexistente").style.display = "block";
    document.getElementById("errornofactura").style.display = "none";
  } else {
    document.getElementById("facturaexistente").style.display = "none";
    document.getElementById("errornofactura").style.display = "block";
  }
}
fetch('http://localhost:3000/api/ventas/orders')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    console.log(data);
    const {products} = data;
  })
  .catch(error => {
    console.error('Error:', error);
  });
console.log(products)