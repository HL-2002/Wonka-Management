const dialog = document.getElementById('frame')
const button = document.getElementById('openP')
const btn = document.getElementById('pre-close')
button.addEventListener('click', (e) => {
  dialog.classList.remove('close')
  dialog.classList.add('open')
  dialog.showModal()
})

btn.addEventListener('click', (e) => {
  e.preventDefault()
  dialog.classList.remove('open')
  dialog.classList.add('close')

  const closeDialog = () => {
    dialog.close()
    dialog.removeEventListener('animationend', closeDialog)
  }

  dialog.addEventListener('animationend', closeDialog)
})
