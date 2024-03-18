document.addEventListener('DOMContentLoaded', async function () {
  //  BOTONES DE MENU
  const btnRegistro = document.querySelector('.btn-registro')
  const btnRequisicion = document.querySelector('.btn-requisicion')

  //  SECCIONES DE REGISTRO Y REQUISICION

  const solicitudesContenido = document.querySelector('.solicitudes')
  const registroContenido = document.querySelector('.registro-seccion')

  //  CAMBIAR SECCION DE REQUISICION A REGISTRO

  btnRequisicion.addEventListener('click', (e) => {
    e.preventDefault()
    btnRequisicion.classList.add('active')
    btnRegistro.classList.remove('active')

    registroContenido.style.display = 'none'
    solicitudesContenido.style.display = 'block'
  })

  //  CAMBIAR SECCION DE REGISTRO A REQUISICION

  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault()
    btnRequisicion.classList.remove('active')
    btnRegistro.classList.add('active')

    solicitudesContenido.style.display = 'none'
    registroContenido.style.display = 'block'
  })

  //  MODAL

  const abrirModal = document.querySelector('.btn-open')
  const cerrarModal = document.querySelector('.salir')
  const modal = document.querySelector('.modal')

  abrirModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.add('modal-show')
  })

  cerrarModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.remove('modal-show')
  })

  //  CREAR REQUISICIONES DE FORMA DINAMICA

  const seccionRequisiciones = document.querySelector('.solicitudes')

  const requisiciones = [
    {
      nombre: 'Titulo',
      categoria: 'Categoría A',
      cantidad: '$105'
    },
    {
      nombre: 'Titulo',
      categoria: 'Categoría B',
      cantidad: '$200'
    },
    {
      nombre: 'Titulo',
      categoria: 'Categoría C',
      cantidad: '$300'
    }
  ]

  requisiciones.forEach(requisicion => {
    const divTarjeta = document.createElement('div')
    divTarjeta.classList.add('solicitud')

    const h2Nombre = document.createElement('h2')
    h2Nombre.textContent = requisicion.nombre
    divTarjeta.appendChild(h2Nombre)

    const pCategoria = document.createElement('p')
    pCategoria.textContent = `Categoría: ${requisicion.categoria}`
    divTarjeta.appendChild(pCategoria)

    const pCantidad = document.createElement('p')
    pCantidad.textContent = `Cantidad: ${requisicion.cantidad}`
    divTarjeta.appendChild(pCantidad)

    const buttomRequisicion = document.createElement('a')
    buttomRequisicion.setAttribute('href', '#')
    buttomRequisicion.classList.add('btn-open')
    buttomRequisicion.textContent = 'Efectuar'
    buttomRequisicion.addEventListener('click', (e) => {
      e.preventDefault()
      modal.classList.add('modal-show')
    })
  })

  //  CREAR DIVS PROOVEDOR DINAMICO

  const contenedor = document.querySelector('.seccion-provedores')

  const tarjetas = [
    {
      nombre: 'Empresa 1',
      categoria: 'Categoría A',
      costo: 100,
      tardanza: '2 días'
    },
    {
      nombre: 'Empresa 2',
      categoria: 'Categoría B',
      costo: 200,
      tardanza: '3 días'
    },
    {
      nombre: 'Empresa 3',
      categoria: 'Categoría C',
      costo: 300,
      tardanza: '4 días'
    }
  ]

  tarjetas.forEach(tarjeta => {
    const divTarjeta = document.createElement('div')
    divTarjeta.classList.add('tarjeta-proveedor')

    const h2Nombre = document.createElement('h2')
    h2Nombre.textContent = tarjeta.nombre
    divTarjeta.appendChild(h2Nombre)

    const pCategoria = document.createElement('p')
    pCategoria.textContent = `Categoría: ${tarjeta.categoria}`
    divTarjeta.appendChild(pCategoria)

    const pCosto = document.createElement('p')
    pCosto.textContent = `Costo: ${tarjeta.costo} $`
    divTarjeta.appendChild(pCosto)

    const pTardanza = document.createElement('p')
    pTardanza.textContent = `Tardanza en despachar: ${tarjeta.tardanza}`
    divTarjeta.appendChild(pTardanza)

    contenedor.appendChild(divTarjeta)
  })

  //  CREAR REGISTRO DINAMICO

  const seccionRegistro = document.querySelector('.registro-seccion')

  const registros = [
    {
      nombre: 'Titulo',
      categoria: 'Categoría A',
      cantidad: '$100'
    },
    {
      nombre: 'Titulo',
      categoria: 'Categoría B',
      cantidad: '$200'
    },
    {
      nombre: 'Titulo',
      categoria: 'Categoría C',
      cantidad: '$300'
    }
  ]

  registros.forEach(registrosHechos => {
    const divTarjeta = document.createElement('div')
    divTarjeta.classList.add('registros-hechos')

    const h2Nombre = document.createElement('h2')
    h2Nombre.textContent = registrosHechos.nombre
    divTarjeta.appendChild(h2Nombre)

    const pCategoria = document.createElement('p')
    pCategoria.textContent = `Categoría: ${registrosHechos.categoria}`
    divTarjeta.appendChild(pCategoria)

    const pCantidad = document.createElement('p')
    pCantidad.textContent = `Cantidad: ${registrosHechos.cantidad}`
    divTarjeta.appendChild(pCantidad)

    const buttomRequisicion = document.createElement('a')
    buttomRequisicion.setAttribute('href', '#')
    buttomRequisicion.classList.add('btn-open')
    buttomRequisicion.textContent = 'Ver'
    buttomRequisicion.addEventListener('click', (e) => {
      e.preventDefault()
      modal.classList.add('modal-show')
    })

    divTarjeta.appendChild(buttomRequisicion)

    seccionRegistro.appendChild(divTarjeta)
  })

  //  CREAR PARTE DE CALCULOS
})

// async function cargarProductos () {
//   const lstProductos = await getProducts()
//   const materiaPrima = lstProductos.filter(item => item.categoryId === 2)
//   console.log(materiaPrima)

//   //  CREAR TABLA DINAMICA
//   const codigoArticulo = document.querySelector('.codigoArticulo')
//   codigoArticulo.innerHTML = ''
//   const h4Codigo = document.createElement('h4')
//   h4Codigo.textContent = 'Codigo'
//   codigoArticulo.appendChild(h4Codigo)

//   const descripcionArticulo = document.querySelector('.descripcionArticulo')
//   descripcionArticulo.innerHTML = ''
//   const h4descripcion = document.createElement('h4')
//   h4descripcion.textContent = 'descripcion'
//   descripcionArticulo.appendChild(h4descripcion)

//   materiaPrima.forEach(producto => {
//     const codigo = document.createElement('p')
//     codigo.innerHTML = ''
//     codigo.textContent = producto.id
//     codigoArticulo.appendChild(codigo)

//     const descripcion = document.createElement('p')
//     descripcion.innerHTML = ''
//     descripcion.textContent = producto.description
//     descripcionArticulo.appendChild(descripcion)
//   })
// }
