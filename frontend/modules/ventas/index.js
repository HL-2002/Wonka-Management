function addProduct() {
    var productSelect = document.getElementById("why");
    var selectedOption = productSelect.options[productSelect.selectedIndex];
    var productName = selectedOption.text;
    var quantity = parseInt(document.getElementById("quantity").value);
    var table = document.getElementById("table");

    // Verifica si ya hay una fila para este producto
    var existingRow = table.querySelector("tr[data-product='" + selectedOption.value + "']");
    if (existingRow) {
        var quantityCell = existingRow.querySelector(".quantity");
        quantityCell.textContent = parseInt(quantityCell.textContent) + quantity;
    } else {
        var newRow = document.createElement("tr");
        newRow.setAttribute("data-product", selectedOption.value);
        newRow.innerHTML = "<td>" + productName + "</td><td class='quantity'>" + quantity + "</td><td><span class='remove-product' onclick='removeProduct(this)'>x</span></td>";
        table.appendChild(newRow);
    }
}


function removeProduct(element) {
    var row = element.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function submitOrder() {
// Verificar si todos los campos del formulario están llenos
var name = document.getElementById("name").value;
var customerId = document.getElementById("customerId").value;
var email = document.getElementById("email").value;
var shipping = document.getElementById("shipping").value;
if (name.trim() === '' || customerId.trim() === '' || email.trim() === '' || shipping.trim() === '') {
alert('Por favor, complete todos los campos del formulario.');
return;
}

// Verificar si hay productos en el ticket
var ticketRows = document.querySelectorAll("#table tr");
if (ticketRows.length === 0) {
alert('Agregue al menos un producto al ticket.');
return;
}
}