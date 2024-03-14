var filteredProducts = []
document.addEventListener('DOMContentLoaded', async function() {
    await getProducts();
});

async function getProducts() {
    try {
        const response = await fetch('/api/inventario/products');
        const products = await response.json();
        
        // Filtrar los productos según el atributo categoryId sea igual a 2
        filteredProducts = products.filter(product => product.categoryId === 2);
        
        // Llamar a la función que agrega los productos filtrados al select
        console.log(filteredProducts)
        populateSelect(filteredProducts);
     
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function populateSelect(products) {
    const select = document.getElementById('why');
    
    // Limpiar cualquier opción previa
    select.innerHTML = '';
    
    // Agregar las nuevas opciones
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.description; // Aquí se usa el atributo 'description'
        select.appendChild(option);
    });
}


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

    // Recopilar la información de los productos del ticket
    var tableRows = document.querySelectorAll("#productTable tr");
    tableRows.forEach(function(row) {
        var productName = row.cells[0].textContent; // Obtener el nombre del producto de la primera celda
        var productQuantityInput = row.cells[1].querySelector('input[type="number"]'); // Obtener el input de cantidad de la segunda celda
        var productQuantity = parseInt(productQuantityInput.value); // Obtener la cantidad del input
    
        // Buscar el producto correspondiente en el array filtrado según el nombre
        var filteredProduct = filteredProducts.find(product => product.description === productName);
    
        if (filteredProduct) { // Si se encuentra el producto en el array filtrado
            // Crear un objeto product con los datos del producto y la cantidad
            var product = {
                productId: filteredProduct.id, // Obtener el ID del producto del array filtrado
                productName: productName,
                productQuantity: productQuantity,
                productPrice: filteredProduct.price,
                totalPrice: productQuantity * filteredProduct.price
                // Aquí puedes agregar más atributos como 'productPrice' si están disponibles en el array filtrado
            };
            console.log(product)
    
            // Agregar el objeto product al array de productos
            productsArray.push(product);
        } else {
            console.error('No se encontró el producto en el array filtrado:', productName);
        }
    });
    

    // Verificar que se haya ingresado toda la información necesaria
    if (name === "" || customerId === "" || email === "" || phoneNumber === "" || productsArray.length === 0) {
        alert("Por favor, complete todos los campos del formulario y agregue al menos un producto.");
        return;
    }

    if (customerId.length > 10){
        alert ("Ingrese un rif valido")
        document.getElementById("customerId").value = "";

        return;
    }

    let  validEmailRegex = /\S+@\S+\.\S{2,}/;
    if(!validEmailRegex.test(email)){
         alert ('Correo electronico invalido');
         return false;
    }

    

    if (phoneNumber.length != 11){
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

        totalPrice+= product.totalPrice

    }

 
   


    // Construir el objeto de pedido
    var order = {
        name: name,
        customerId: customerId,
        email: email,
        phoneNumber: phoneNumber,
        time:fecha,
        products: productsArray,
        totalPriceOrder : totalPrice
        
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
