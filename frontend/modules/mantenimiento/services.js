export const HaveEnoghtMaterial = async () => {
  const response = await fetch('/api/inventario/products/')
  const data = await response.json()
  const material = data.find(product => product.description.toLowerCase() === 'aceite')

  return material?.stock >= 2
}

export const UseMaterial = async () => {
  const response = await fetch('/api/inventario/products')
  const data = await response.json()
  const material = data.products.find(product => product.name === 'aceite')

  if (material < 2) {
    return false
  }
  material.quantity -= 2
  await fetch('/api/inventario/products', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(material)
  })
}
