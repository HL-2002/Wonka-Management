//id = mD# es maquinas disponibles

//id = mU# es maquinas en uso

//id = mM# es maquinas en mantenimiento **preguntar a mantenimiento si tienen esto

// # es el numero de la linea de produccion de 1-10
/* ID DE MATERIA PRIMA
    11 CACAO
    12 CHOCOLATE NEGRO
    13 CHOCOLATE CON LECHE
    14 MANZANA
    15 AZUCAR
    16 JARABE DE MAIZ
    17 CHOCOLATE NEGRO
    18 TAZA de ALMENDRAS
    */
/* ID de los productos por numero 
   1 Wonka bar: Barra Wonka
   2 Candied apples: Manzanas acarameladas
   3 Wonka Swirl Lollipops: Chupeta espiral Wonka
   4 Bluebird's egg candy: Caramelo de huevo de p�jaro azul
   5 Rompemuelas eterno: Rompemuelas eterno
   6 Three-course dinner gum: Chicle de cena de tres platos
   7 Stained-glass hard candy: Caramelo duro de vidriera
   8 Wonka whipple-scrumptious fudgemallow delight: Barra delicia de crema, malvavisco y fudge Wonka
   9 Wonka nutty chocolate surprise: Barra sorpresa de chocolate de nueces Wonka
   10 Edible grass: Hierba comestible
*/
/* que hay que hacer?
    4) terminar de decir a mantenimineto de implementar su modulo en los botones (lo haran ellos)
*/
const recetas = {
  'Wonka Bar': [
      { ingrediente: 'cacao', cantidad: 50, id: 11},
      { ingrediente: 'chocolate negro', cantidad: 125, id: 12 },
      { ingrediente: 'chocolate con leche', cantidad: 150, id: 13 }
  ],
  'Manzanas acarameladas': [
      { ingrediente: 'manzana', cantidad: 1, id: 14},
      { ingrediente: 'azucar', cantidad: 300, id: 15},
      { ingrediente: 'mantequilla', cantidad: 100, id: 19}
  ],
  'Chupeta espiral Wonka': [
      { ingrediente: 'jarabe de maiz', cantidad: 115, id: 16},
      { ingrediente: 'azucar', cantidad: 340, id: 15 }
  ],
  'Barra sorpresa de chocolate de nueces Wonka': [
      { ingrediente: 'cacao', cantidad: 50, id: 11},
      { ingrediente: 'chocolate negro', cantidad: 125, id: 12},
      { ingrediente: 'chocolate con leche', cantidad: 150, id: 13},
      { ingrediente: 'taza de almendras', cantidad: 50, id: 18}
  ]
}

// calcularingredientestotales

async function calcularIngredientesTotales(productos) {
  const ingredientesTotales = {}

  productos.forEach((producto) => {
      const { productName, productQuantity } = producto
      const receta = recetas[productName]

      receta.forEach((ingrediente) => {
          const { ingrediente: nombre, cantidad, id} = ingrediente
          if (!ingredientesTotales[nombre]) {
              ingredientesTotales[nombre] = 0
          }
          ingredientesTotales[nombre] += cantidad * productQuantity
              const removeProduct = {
                  id: id,
                  sum: '0',
                  units: ingredientesTotales[nombre]
              };
              console.log(removeProduct)
              insertStock(removeProduct);
      })
  })

  const resultado = Object.entries(ingredientesTotales).map(([nombre, cantidad, id]) => ({
      ingrediente: nombre,
      cantidad,
      id
  }))

  return resultado
}

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

getLatestOrder().then(result => {
  console.log(calcularIngredientesTotales(result.products))
  console.log('Resultado de getLatestOrder():', result);
}).catch(error => {
  console.error('Error en getLatestOrder():', error);
});