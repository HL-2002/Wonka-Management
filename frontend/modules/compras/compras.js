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
