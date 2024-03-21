const facturasProcesadas = [];

// Resta del stock
async function resProducts(id) {
    try {
        if (facturasProcesadas.includes(id)) {
            console.log(`La factura con ID ${id} ya ha sido procesada previamente.`);
            return;
        }




        let response = await fetch(`/api/ventas/orders/${id}`)
        const products = await response.json()
      if (response.ok) {
          localStorage.setItem('direccionPedido', products.address)
      }
        products.products.forEach(producto => {
            const { productId, productQuantity } = producto
            const removeProduct = {
                productId: producto.productId,
                motivo: 'DES',
                tipo: 'DESCARGO',
                units: producto.productQuantity,
                total: 1 * 1,
                observacion: 'DESPACHO'
              }


            console.log(removeProduct)
            insertStock(removeProduct);
            facturasProcesadas.push(id)


        });
    } catch (error) {
        console.log('Error f:', error);

    }


}
let pesoTotal = 0;
async function pesoCamion(id) {
    try {
        if (facturasProcesadas.includes(id)) {
            console.log(`La factura con ID ${id} ya ha sido procesada previamente.`);
            return;
        }
        let respuesta = await fetch(`/api/ventas/orders/${id}`)
        const productos = await respuesta.json()
        productos.products.forEach(producto => {
            const { productId, productQuantity } = producto
            const idProducto = productId;
            const cantidad = parseInt(productQuantity);
            console.log(cantidad)
            console.log(idProducto)
            if (idProducto == 1) {
                let pesoProduct = 325;

                pesoTotal += pesoProduct * cantidad;
            }
            if (idProducto == 2) {
                let pesoProduct = 850;
                pesoTotal += pesoProduct * cantidad;
            }
            if (idProducto == 3){
                let pesoProduct= 404;
                pesoTotal += pesoProduct * cantidad;
            }
            if(idProducto == 4){
                let pesoProduct = 2645;
                pesoTotal += pesoProduct* cantidad;
            }
            if(idProducto == 5){
                let pesoProduct = 1750;
                pesoTotal += pesoProduct * cantidad;
            }
            if(idProducto == 6){
                let pesoProduct= 12;
                pesoTotal += pesoProduct * cantidad;
            }
            if(idProducto == 7){
                let pesoProduct = 845;
                pesoTotal += pesoProduct*cantidad;
            }
            if(idProducto == 8){
                let pesoProduct= 430;
                pesoTotal += pesoProduct*cantidad;
            }
            if(idProducto == 9){
                let pesoProduct = 375;
                pesoTotal += pesoProduct*cantidad;
            }
            if(idProducto == 10){
                let pesoProduct = 258;
                pesoTotal += pesoProduct*cantidad;
            }
            console.log(pesoTotal)
            

        })



    } catch (error) {
        console.log('Error f:', error);
    }
}

//Se encarga de restar del stock
async function insertStock(params) {
    try {
        const response = await fetch('/api/inventario/set/product/stock/ventas', {
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

// Obtiene la orden via id
async function orderporId(id) {
    try {
        // Realizar la solicitud GET al servidor mediante la API
        var response = await fetch(`/api/ventas/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (id == '') {
            document.getElementById('facturaexistente').style.display = 'none'
            document.getElementById('errornofactura').style.display = 'block'
        }
        else if (response.ok) {
            // Obtener la respuesta en formato JSON
            var data = await response.json();
            console.log(data)
            document.getElementById('facturaexistente').style.display = 'block'
            document.getElementById('errornofactura').style.display = 'none'
            document.getElementById('NombreEmpresa').value = data ? data.name : ""
            //document.getElementById('RifEmpresa').value = data ? data.customerId : ""
            //document.getElementById('EmailEmpresa').value = data ? data.email : ""
            //document.getElementById('NumberEmpresa').value = data ? data.phoneNumber : ""
            //document.getElementById('HoraEmpresa').value = data ? data.time : ""
            //document.getElementById('StatusEmpresa').value = data ? data.status : ""
            //document.getElementById('PrecioTEmpresa').value = data ? data.totalPriceOrder : ""
            document.getElementById('Direccion').value = data ? data.address : ""
            document.getElementById('numerodecamion').value = 1
            resProducts(id)
            //Desglosar factura




        } else {
            // Error al obtener la �ltima orden
            /*console.error("Hubo un error al obtener la orden. Código de estado:", response.status);
            alert("Hubo un error al obtener la orden. Por favor, inténtelo de nuevo más tarde.");*/
            document.getElementById('facturaexistente').style.display = 'none'
            document.getElementById('errornofactura').style.display = 'block'
        }
        console.log(response.ok)

    } catch (error) {
        /*console.error("Error al obtener la orden:", error);
        alert("Hubo un error al obtener la orden. Por favor, revise la consola para más detalles.");*/
        document.getElementById('facturaexistente').style.display = 'none'
        document.getElementById('errornofactura').style.display = 'block'
    }

}

const submit = document.getElementById('sumit')
submit.addEventListener('click', () => {
    const codigoIngresado = document.getElementById('factura').value
    orderporId(codigoIngresado)
    pesoCamion(codigoIngresado)

})

function verpedidos() {
    let pedidos = document.getElementById("divpedidos");
    pedidos.style.display = "block";
}
function noverpedidos() {
    let pedidos = document.getElementById("divpedidos");
    pedidos.style.display = "none";
}
const bdsm = document.getElementById('Despachar')
bdsm.addEventListener('click', async () =>{
    await cambiarstatus()

})
async function cambiarstatus(){
    
    const id = document.getElementById('factura').value
    console.log(id)
    try {

        let response = await fetch(`/api/ventas/orders/${id}/status`,{
            method: 'PATCH', headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                'status':'entregado'
            })
        })
        if(response.ok){
            console.log('El estado de la factura ha sido cambiado')
        }
    } catch (error) {
        console.log("Error no se pudo cambiar el status", error)
    }
    
    
    
}