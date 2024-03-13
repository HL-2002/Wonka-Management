document.addEventListener('DOMContentLoaded', function () {
  //  BOTONES DE MENU
  const btnRegistro = document.querySelector('.btn-registro')
  const btnRequisicion = document.querySelector('.btn-requisicion')

  //  SECCIONES DE REGISTRO Y REQUISICION

  const solicitudesContenido = document.querySelector('.solicitudes')
  const registroContenido = document.querySelector('.registro')

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
})
