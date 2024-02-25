// obtener los botones de abrir y cerrar
const btns = document.querySelectorAll('.btn-open')
const btnsClose = document.querySelectorAll('.close-button')

// recorrer los botones de abrir y agregar el evento click
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const dialog = document.getElementById(btn.value)
    dialog.classList.remove('close')
    dialog.classList.add('open')
    dialog.showModal()
  })
})

// recorrer los botones de cerrar y agregar el evento click
btnsClose.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const dialog = document.getElementById(e.target.parentElement.parentElement.id)
    dialog.classList.remove('open')
    dialog.classList.add('close')

    const close = () => {
      dialog.close()
      dialog.removeEventListener('animationend', close)
    }

    dialog.addEventListener('animationend', close)
  })
}
)
