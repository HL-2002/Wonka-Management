document.addEventListener('DOMContentLoaded', function () {
  //  CAMBIO DE SECCION

  //  BOTONES DE MENU
  const btnRegistro = document.querySelector('.btn-registro')
  const btnRequisicion = document.querySelector('.btn-requisicion')

  //  SECCIONES DE REGISTRO Y REQUISICION

  const solicitudesContenido = document.querySelector('.solicitudesContenido')
  const registroContenido = document.querySelector('.registro')

  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Hola')
    document.querySelector('.registro').style.display = 'none'
    document.querySelector('.solicitudesContenido').style.display = 'block'
  })

  btnRequisicion.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Hola')
    registroContenido.style.display = 'block'
    solicitudesContenido.style.display = 'none'
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
})
