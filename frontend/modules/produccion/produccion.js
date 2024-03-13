
//id = mD# es maquinas disponibles

//id = mU# es maquinas en uso

//id = mM# es maquinas en mantenimiento **preguntar a mantenimiento si tienen esto

// # es el numero de la linea de produccion de 1-10

/* ID de los productos por numero 
   1 Wonka bar: Barra Wonka
   2 Candied apples: Manzanas acarameladas
   3 Wonka Swirl Lollipops: Chupeta espiral Wonka
   4 Bluebird's egg candy: Caramelo de huevo de pájaro azul
   5 Rompemuelas eterno: Rompemuelas eterno
   6 Three-course dinner gum: Chicle de cena de tres platos
   7 Stained-glass hard candy: Caramelo duro de vidriera
   8 Wonka whipple-scrumptious fudgemallow delight: Barra delicia de crema, malvavisco y fudge Wonka
   9 Wonka nutty chocolate surprise: Barra sorpresa de chocolate de nueces Wonka
   10 Edible grass: Hierba comestible
*/

async function ultimaordendeventa() {
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
            console.log(latestOrder)
            return latestOrder;
            
           
            
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
