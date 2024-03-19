const facturasProcesadas = [];

// Resta del stock
async function resProducts(id){
  try{
    if (facturasProcesadas.includes(id)) {
        console.log(`La factura con ID ${id} ya ha sido procesada previamente.`);
        return;
      }




   var response = await fetch(`/api/ventas/orders/${id}`)
   const products= await response.json()

   products.products.forEach(producto => {
     const{productId,productQuantity}=producto
     const removeProduct={
       id:producto.productId,
       sum:0,
       units: producto.productQuantity,
     };
     console.log(removeProduct)
     insertStock(removeProduct);
     facturasProcesadas.push(id)
     
   });
  } catch(error){
       console.log('Error f:', error);
 
  }
  
}

//Se encarga de restar del stock
async function insertStock(params) {
    try {
        const response = await fetch('/api/inventario/set/product/stock', {
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
            document.getElementById('NombreEmpresa').value = data ? data.customerName : ""
            //document.getElementById('RifEmpresa').value = data ? data.customerId : ""
            //document.getElementById('EmailEmpresa').value = data ? data.email : ""
            //document.getElementById('NumberEmpresa').value = data ? data.phoneNumber : ""
            //document.getElementById('HoraEmpresa').value = data ? data.time : ""
            //document.getElementById('StatusEmpresa').value = data ? data.status : ""
            //document.getElementById('PrecioTEmpresa').value = data ? data.totalPriceOrder : ""
            document.getElementById('Direccion').value = 'tumama'
            document.getElementById('numerodecamion').value = 13
            resProducts(id)
            //Desglosar factura
          
        } else {
            // Error al obtener la �ltima orden
            console.error("Hubo un error al obtener la orden. Código de estado:", response.status);
            alert("Hubo un error al obtener la orden. Por favor, inténtelo de nuevo más tarde.");
            document.getElementById('facturaexistente').style.display = 'none'
            document.getElementById('errornofactura').style.display = 'block'
        }
        console.log(response.ok)
          
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        alert("Hubo un error al obtener la orden. Por favor, revise la consola para más detalles.");
        document.getElementById('facturaexistente').style.display = 'none'
        document.getElementById('errornofactura').style.display = 'block'
    }
}


const submit = document.getElementById('sumit')
submit.addEventListener('click', () => { 
  const codigoIngresado = document.getElementById('factura').value
  orderporId(codigoIngresado)

})

/*const data //OrderbyId

//{products} = data

const factura = document.createElement('ul')
const frag = document.createDocumentFragment()
products.foreach(producto => { 
    const {productName, productQuantity, productPrice} = producto
    const li = document.createElement('li')
    li.textContent = `${productName} - ${productQuantity} - ${productPrice} = ${productQuantity * productPrice}`
    frag.appendChild(li)

})
factura.appendChild(frag)*/