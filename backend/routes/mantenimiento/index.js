import express from 'express'
import client from './model.js'
// create a new router to handle the mantenimiento routes
const Router = express.Router()

// get the machines and the maintenance from the database
Router.get('/', async (req, res) => {
// get the machines and the maintenance from the database

  // make a query to the database update the machines  state in base of the maintenance date
  await client.execute({ sql: 'UPDATE MACHINE SET state = ? , availability = 0  WHERE date((select dateMaintenance from  MAINTENANCE WHERE MACHINE.id =  MAINTENANCE.machineId)) <= date() AND date((select dateAvailability from  MAINTENANCE WHERE MACHINE.id =  MAINTENANCE.machineId)) >= date();', args: ['mantenimiento'] })
  await client.execute({ sql: 'DELETE FROM MAINTENANCE WHERE date(dateAvailability) <= date()' })

  const { rows: machines } = await client.execute('SELECT MACHINE.*, MAINTENANCE.type as typeMaintenance ,MAINTENANCE.dateMaintenance, MAINTENANCE.dateAvailability  FROM MACHINE LEFT JOIN MAINTENANCE ON MACHINE.id = MAINTENANCE.machineId')

  res.json({ machines })
})

// create a new maintenance
Router.post('/', async (req, res) => {
  // get the data from the request
  const { type, dateMaintenance, dateAvailability, machineId } = req.body

  // insert the maintenance into the database
  try {
    await client.execute({ sql: 'INSERT INTO MAINTENANCE (machineId, type, dateMaintenance, dateAvailability) VALUES (?, ?, ?, ?)', args: [machineId, type, dateMaintenance, dateAvailability] })
    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

// update the maintenance
Router.patch('/:id', async (req, res) => {
  // get the id from the request
  const { id } = req.params
  // get the data from the request
  const { dateMaintenance = null, dateAvailability = null } = req.body
  // update the maintenance in the database
  try {
    await client.execute({ sql: 'UPDATE MAINTENANCE SET dateMaintenance = ?, dateAvailability = ? WHERE id = ?', args: [dateMaintenance, dateAvailability, id] })
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

// delete the maintenance
Router.delete('/:id', async (req, res) => {
  // get the id from the request
  const { id } = req.params
  // delete the maintenance from the database
  try {
    await client.execute({ sql: 'DELETE FROM MAINTENANCE WHERE id = ?', args: [id] })
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

Router.patch('/machine/:id', async (req, res) => {
  // get the id from the request
  const { id } = req.params
  // get the data from the request
  const { state } = req.body
  // update the machine in the database
  try {
    await client.execute({ sql: 'UPDATE MACHINE SET state = ? WHERE id = ?', args: [state, id] })
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

Router.post('/machine', async (req, res) => {
  // get the data from the request
  const { type, line } = req.body
  // insert the machine into the database
  try {
    await client.execute({ sql: 'INSERT INTO MACHINE (type, state, availability, line) VALUES (?, ?, ?, ?)', args: [type, 'disponible', 1, line] })
    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

Router.delete('/machine/:id', async (req, res) => {
  // get the id from the request
  const { id } = req.params
  // delete the machine from the database
  try {
    await client.execute({ sql: 'DELETE FROM MACHINE WHERE id = ?', args: [id] })
    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
)

Router.get('/teapot', (req, res) => {
  res.status(418).send("I'm a teapot")
})

// export the router
export default Router
