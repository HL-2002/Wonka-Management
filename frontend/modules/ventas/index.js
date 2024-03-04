function addProduct() {
    var select = document.getElementById("why");
    var productName = select.options[select.selectedIndex].text;
    var productQuantity = document.getElementById("quantity").value;

    if (parseInt(productQuantity) < 1 || productQuantity===""){
        alert("Ingrese una cantidad valida")
    }else{

  
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
    productQuantityCell.textContent = productQuantity;
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
    var shipping = document.getElementById("shipping").value.trim();
    var productsArray = [];

    // Recopilar la información de los productos del ticket
    var tableRows = document.querySelectorAll("#productTable tr");
    tableRows.forEach(function(row) {
        var product = row.cells[0].textContent;
        var productQuantity = row.cells[1].textContent;
        productsArray.push({ productName: product, quantity: productQuantity });
    });

    // Verificar que se haya ingresado toda la información necesaria
    if (name === "" || customerId === "" || email === "" || shipping === "" || productsArray.length === 0) {
        alert("Por favor, complete todos los campos del formulario y agregue al menos un producto.");
        return;
    }

    // Construir el objeto de pedido
    var order = {
        name: name,
        customerId: customerId,
        email: email,
        shipping: shipping,
        products: productsArray
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
            document.getElementById("shipping").value = "";
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

