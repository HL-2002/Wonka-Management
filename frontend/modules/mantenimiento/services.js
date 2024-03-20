// obtener los materiales necesarios para el mantenimiento
export const getMaterials = async () => {
  const response = await fetch('/api/inventario/products')
  const data = await response.json()
  return data.find(product => product.description.toLowerCase() === 'aceite')
}

export const HaveEnoghtMaterial = async () => {
  const response = await fetch('/api/inventario/products/')
  const data = await response.json()
  const material = data.find(product => product.description.toLowerCase() === 'aceite')

  return material?.stock >= 2
}

// apartar los materiales necesarios para el mantenimiento
export const UseMaterial = async () => {
  const material = await getMaterials()

  if (material < 2) {
    return false
  }

  material.stock -= 2
  // productId, motivo, tipo, units, total, observacion
  const res = await fetch('/api/inventario/set/product/stock', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        productId: material.id,
        motivo: 'Salida',
        tipo: 'Salida',
        units: 2,
        total: material.stock,
        observacion: 'se apartaron 2 unidades para el mantenimiento del equipo'
      }
    )
  })

  return res.ok
}
// devolver los materiales que no se usaron
export const ReturnMaterial = async () => {
  const material = await getMaterials()
  material.stock += 2
  // productId, motivo, tipo, units, total, observacion
  const res = await fetch('/api/inventario/set/product/stock', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        productId: material.id,
        motivo: 'cancelacion mantenimiento',
        tipo: 'CARGO',
        units: 2,
        total: material.stock,
        observacion: 'se devolvieron 2 unidades que no se usaron por cancelacion del mantenimiento'
      }
    )
  })

  return res.ok
}

// create a order for buy the materials
export const createOrder = async () => {
  // /api/compras/new/requisicion post
  const res = await fetch('/api/compras/new/requisicion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        productValue: 28,
        cantidadValue: 10

      }
    )
  })

  return res.status
}
