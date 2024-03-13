function addProduct() {
    var select = document.getElementById("why");
    var productName = select.options[select.selectedIndex].text;
    var productQuantity = document.getElementById("quantity").value;

    if (parseInt(productQuantity) < 1 || productQuantity===""){
        alert("Ingrese una cantidad válida");
    } else {
        var tableRows = document.querySelectorAll("#productTable tr");
        for (var i = 0; i < tableRows.length; i++) {
            if (tableRows[i].cells[0].textContent === productName) {
                alert("¡Este producto ya ha sido agregado!");
                return;
            }
        }

        var table = document.getElementById("productTable");
        var newRow = table.insertRow();

        var productNameCell = newRow.insertCell(0);
        var productQuantityCell = newRow.insertCell(1);
        var deleteCell = newRow.insertCell(2);

        productNameCell.textContent = productName;

        // Crear un campo de entrada para la cantidad
        var quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = productQuantity;
        quantityInput.style.width = "50px"; // Establecer el ancho deseado
        quantityInput.style.backgroundColor = "#34005f";
        quantityInput.style.color = "#ececec"; // Establecer el color de fondo
        quantityInput.style.border = "none"
        quantityInput.style.textAlign = "center"
        quantityInput.onchange = function() {
            // Validar que la cantidad sea un número positivo
            if (parseInt(this.value) < 1) {
                alert("Ingrese una cantidad válida");
                this.value = productQuantity; // Restaurar el valor original si la cantidad no es válida
            } else {
                productQuantity = this.value; // Actualizar la cantidad
            }
        };
        productQuantityCell.appendChild(quantityInput);

        deleteCell.innerHTML = '<button onclick="deleteRow(this)">Eliminar</button>';
    }
}


function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}



async function submitOrder() {

    var name = document.getElementById("name").value.trim();
    var customerId = document.getElementById("customerId").value.trim();
    var email = document.getElementById("email").value.trim();
    var phoneNumber = document.getElementById("phoneNumber").value.trim(); 

    var productsArray = [];
    
    var prices = {
        BarraWonka:3,
        Manzanasacarameladas:2,
        ChupetaespiralWonka:3,
        Caramelodehuevodepajaroazul:4,
        Rompemuelaseterno:5,
        Chicledecenadetresplatos:1,
        Caramelodurodevidriera:2,
        "Barradeliciadecrema,malvaviscoyfudgeWonka":4,
        BarrasorpresadechocolatedenuecesWonka:4,
        Hierbacomestible:2
    }

    var idProducts = {
        BarraWonka:1,
        Manzanasacarameladas:2,
        ChupetaespiralWonka:3,
        Caramelodehuevodepajaroazul:4,
        Rompemuelaseterno:5,
        Chicledecenadetresplatos:6,
        Caramelodurodevidriera:7,
        "Barradeliciadecrema,malvaviscoyfudgeWonka":8,
        BarrasorpresadechocolatedenuecesWonka:9,
        Hierbacomestible:10

    }

    // Recopilar la información de los productos del ticket
    var tableRows = document.querySelectorAll("#productTable tr");
    tableRows.forEach(function(row) {
        var product = row.cells[0].textContent;
        var productQuantity = row.cells[1];
        productQuantity = productQuantity.querySelector('input[type="number"]')
        productQuantity = productQuantity.value
        productsArray.push({productId:idProducts[product.replace(/ /g, "")] ,productName: product, quantity: productQuantity, price: prices[product.replace(/ /g, "")] * parseInt(productQuantity)});
    });

    // Verificar que se haya ingresado toda la información necesaria
    if (name === "" || customerId === "" || email === "" || phoneNumber === "" || productsArray.length === 0) {
        alert("Por favor, complete todos los campos del formulario y agregue al menos un producto.");
        return;
    }

    if (customerId.length > 8){
        alert ("Ingrese un rif valido")
        document.getElementById("customerId").value = "";

        return;
    }

    let  validEmailRegex = /\S+@\S+\.\S{2,}/;
    if(!validEmailRegex.test(email)){
         alert ('Correo electronico invalido');
         return false;
    }

    let validNumber = ["0424","0242","0414","0412","0416"]

    if (phoneNumber.length != 11 && validNumber.includes(phoneNumber.slice(0,4))){
        alert("Ingresa un numero telefonico valido")
        document.getElementById("phoneNumber").value = "";
        return;
    }


    let fechaHoraActual = new Date();

    // Obtener los componentes de la fecha y hora
    let año = fechaHoraActual.getFullYear();
    let mes = fechaHoraActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    let dia = fechaHoraActual.getDate();
    let horas = fechaHoraActual.getHours();
    let minutos = fechaHoraActual.getMinutes();
    let segundos = fechaHoraActual.getSeconds();

    // Agregar ceros delante si es necesario para que tenga dos dígitos
    mes = (mes < 10 ? "0" : "") + mes;
    dia = (dia < 10 ? "0" : "") + dia;
    horas = (horas < 10 ? "0" : "") + horas;
    minutos = (minutos < 10 ? "0" : "") + minutos;
    segundos = (segundos < 10 ? "0" : "") + segundos;

    // Formatear la fecha y hora en el formato deseado (YYYY-MM-DD HH:MM:SS)
    let fecha = año + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;

    // Definir precio total
     let totalPrice = 0

    for (let product of productsArray){

        totalPrice+= product.price

    }

 
   


    // Construir el objeto de pedido
    var order = {
        name: name,
        customerId: customerId,
        email: email,
        phoneNumber: phoneNumber,
        time:fecha,
        products: productsArray,
        totalPrice : totalPrice
        
    };

    try {
        // Enviar el pedido al servidor mediante la API
        var response = await fetch('/api/ventas/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            // Pedido enviado correctamente
            alert("¡Pedido enviado correctamente!");
            // Limpiar el formulario y la tabla de productos después de enviar el pedido
            document.getElementById("name").value = "";
            document.getElementById("customerId").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("productTable").innerHTML = "";
        } else {
            // Error al enviar el pedido
            alert("Hubo un error al enviar el pedido. Por favor, inténtelo de nuevo más tarde.");
        }
    } catch (error) {
        console.error("Error al enviar el pedido:", error);
        alert("Hubo un error al enviar el pedido. Por favor, revise la consola para más detalles.");
    }

   
}


async function getLatestOrder(){
    try {
        // Realizar la solicitud GET al servidor mediante la API
        var response = await fetch('/api/ventas/latestOrder', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Obtener la respuesta en formato JSON
            var latestOrder = await response.json();
            console.log(typeof(latestOrder))
            console.log(latestOrder)
            
            
           
            
        } else {
            // Error al obtener la última orden
            console.error("Hubo un error al obtener la última orden. Código de estado:", response.status);
            alert("Hubo un error al obtener la última orden. Por favor, inténtelo de nuevo más tarde.");
        }
    } catch (error) {
        console.error("Error al obtener la última orden:", error);
        alert("Hubo un error al obtener la última orden. Por favor, revise la consola para más detalles.");
    }

}

