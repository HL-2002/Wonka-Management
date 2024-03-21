
function autoResizeInput(input) {
    input.style.width = "auto";
    input.style.width = (input.scrollWidth + 10) + "px";
  }
  

document.addEventListener('DOMContentLoaded', async () => { 
  const address = localStorage.getItem('direccionPedido') + ' Carabobo Venezuela' 
  
//Pedir del Local
// console.log(address)

const url=`https://geocode.search.hereapi.com/v1/geocode?q=${address}&apikey=GOdm4EI-zu94iYyyCugZc0CJ1MUYqio36JoTAhF3b_c`

  // Reemplaza esto con tu URL
  const response = await fetch(url);
    data = await response.json();

    const addresses = await fetch('../../api/ventas/orders')
    const dataAddresses = await addresses.json()
    console.log('dataAddresses', dataAddresses)
    let addressArray = []
    dataAddresses.forEach((address) => {
        addressArray.push(address.address) 
    })
    console.log('addressArray', address)
    // console.log('dataAddresses', dataAddresses)
    let waypoints = []
    let totalLength = 0;
    let totalTime = 0;
    for(let address of addressArray) { 
        const formattedAddress = address + ' Carabobo Venezuela'
        const url = `https://geocode.search.hereapi.com/v1/geocode?q=${formattedAddress}&apikey=GOdm4EI-zu94iYyyCugZc0CJ1MUYqio36JoTAhF3b_c`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

            //Peticion de origen a cada dirección obteniendo coordenadas de data.items[0].position
            // sumar el tiempo y la distancia por cada iteracción
            waypoints.push(data.items[0].position)
        const { lat, lng } = data.items[0].position
        const routes = await fetch(`https://router.hereapi.com/v8/routes?transportMode=truck&origin=10.2363953,-67.9649982&destination=${lat},${lng}&return=summary&apikey=GOdm4EI-zu94iYyyCugZc0CJ1MUYqio36JoTAhF3b_c`)
        const routesData = await routes.json()
        const { length, duration } = routesData.routes[0].sections[0].summary
        totalLength += length;
        totalTime += duration;
    }
    console.log('coordinates', waypoints)
    console.log('totalLenght', totalLength)
    console.log('totalTime',totalTime)
  console.log('locationData', data.items[0])
  const { lat, lng } = data.items[0].position
//   console.log('lat', lat)
//   console.log('lng', lng)

const route = await fetch(`https://router.hereapi.com/v8/routes?transportMode=truck&origin=10.2363953,-67.9649982&destination=${lat},${lng}&return=summary&apikey=GOdm4EI-zu94iYyyCugZc0CJ1MUYqio36JoTAhF3b_c`)
const dataRoute = await route.json()
  const { length, duration } = dataRoute.routes[0].sections[0].summary
  console.log('distance', length)
  console.log('duration', duration)
  console.log('dataRoute', dataRoute)
  const distance = document.getElementById('destino')
    const municipio = document.getElementById('municipio')
    totalLength += length
    totalTime += duration
  km = totalLength / 1000
  tiempo = totalTime / 60
  distance.value = parseFloat(km.toFixed(1));
  municipio.value = parseFloat(tiempo.toFixed(1));
  // Initiate and authenticate your connection to the HERE platform:
const platform = new H.service.Platform({
    apikey: 'GOdm4EI-zu94iYyyCugZc0CJ1MUYqio36JoTAhF3b_c',
})

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers()

// Instantiate (and display) a map:
// Zoom and center parameters are overriden by the bounding box
// that contains the route and marker objects
const map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 7,
        center: { lat: 10.2363953, lng: -67.9649982 },
        // Add space around the map edges to ensure markers are not cut off:
        padding: { top: 50, right: 50, bottom: 50, left: 50 },
        interactive:true,
    }
)

const origin = { lat: 10.2363953, lng: -67.9649982 }
const destination = { lat, lng}

const ui = H.ui.UI.createDefault(map,defaultLayers);
// const zoomControl = new H.ui.ZoomControl();
// ui.addControl('Zoom', zoomControl);

    const waypointMarkers = [];

// Create the parameters for the routing request:
const routingParameters = {
    routingMode: 'fast',
    transportMode: 'car',
    // The start point of the route:
    origin: `${origin.lat},${origin.lng}`,
    // The end point of the route:
    destination: `${destination.lat},${destination.lng}`,
    // Include the route shape in the response
    return: 'polyline',
    // Add a via parameter to the query for each coordinate pair:
    'via': new H.service.Url.MultiValueQueryParameter(
        waypoints.map(wp => `${wp.lat},${wp.lng}`)
    )
};


// Define a callback function to process the routing response:
const onResult = function (result) {
    // Ensure that at least one route was found
    if (result.routes.length) {
        const lineStrings = []
        result.routes[0].sections.forEach((section) => {
            // Create a linestring to use as a point source for the route line
            lineStrings.push(
                H.geo.LineString.fromFlexiblePolyline(section.polyline)
            )
        })
        
        // Create an instance of H.geo.MultiLineString
        const multiLineString = new H.geo.MultiLineString(lineStrings)

        // Create a polyline to display the route:
        const routeLine = new H.map.Polyline(multiLineString, {
            style: {
                strokeColor: '#7B74E0',
                lineWidth: 3,
            },
        })
        // Create a marker for the start point:
        // Crear un icono personalizado para el origen:
        const originIcon = new H.map.Icon('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 22s-8-4.5-8-9.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8c0 5.3-8 9.8-8 9.8z"/></svg>');
        const startMarker = new H.map.Marker(origin, { icon: originIcon });

// Crear un icono personalizado para el destino:
        const destinationIcon = new H.map.Icon('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 22s-8-4.5-8-9.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8c0 5.3-8 9.8-8 9.8z"/></svg>');
        const waypointIcon = new H.map.Icon('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 22s-8-4.5-8-9.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8c0 5.3-8 9.8-8 9.8z"/></svg>');
        const endMarker = new H.map.Marker(destination, { icon: destinationIcon });
        waypoints.forEach((waypoint, index) => {
            const waypointMarker = new H.map.Marker({
                lat: waypoint.lat,
                lng: waypoint.lng
            }, {icon:waypointIcon});
            // Populate the waypointMarkers array:
            waypointMarkers.push(waypointMarker);
            const waypointBubble = new H.ui.InfoBubble({
                lat: waypoint.lat,
                lng: waypoint.lng
            }, {
                content: 'Este punto es de la orden ' + dataAddresses[index].orderId
            });

            // Add the InfoBubble to the UI:
            ui.addBubble(waypointBubble);

            // Close the InfoBubble initially:
            waypointBubble.close();

            // Show the InfoBubble when the cursor enters the marker:
            waypointMarker.addEventListener('pointerenter', function () {
                waypointBubble.open();
            });

            // Hide the InfoBubble when the cursor leaves the marker:
            waypointMarker.addEventListener('pointerleave', function () {
                waypointBubble.close();
            });
        });
        const originBubble = new H.ui.InfoBubble(origin, {
            content: 'Este es el origen de la ruta'
          });
          
          // Añadir la burbuja de información a la interfaz de usuario:
          ui.addBubble(originBubble);
          originBubble.close();

// Mostrar la burbuja de información cuando el cursor pasa sobre el marcador:
          startMarker.addEventListener('pointerenter', function() {
          originBubble.open();
          });

// Ocultar la burbuja de información cuando el cursor sale del marcador:
           startMarker.addEventListener('pointerleave', function() {
           originBubble.close();
        });

        
        

        
        console.log('waypointMarkers', waypointMarkers)
        // Create a H.map.Group to hold all the map objects and enable us to obtain
        // the bounding box that contains all its objects within
        const group = new H.map.Group()
        group.addObjects([routeLine, startMarker, endMarker, ...waypointMarkers]);
        // Add the group to the map
        map.addObject(group)

        // Set the map viewport to make the entire route visible:
        map.getViewModel().setLookAtData({
            bounds: group.getBoundingBox(),
        })
    }
}

// Get an instance of the routing service version 8:
const router = platform.getRoutingService(null, 8)

// Call the calculateRoute() method with the routing parameters,
// the callback, and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult, function (error) {
    alert(error.message)
})

// MapEvents enables the event system.
// The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

// Enable dynamic resizing of the map, based on the current size of the enclosing container
window.addEventListener('resize', () => map.getViewPort().resize())
})
