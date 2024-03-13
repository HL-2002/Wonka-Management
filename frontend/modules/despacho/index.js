<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', (event) => {
    const botonMostrarFactura = document.getElementById('mostrar-factura-btn');
    botonMostrarFactura.textContent = 'Factura';
});
=======


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
>>>>>>> 3aa748de1ed38fb2d62ec3760bd36ba54bacafeb
