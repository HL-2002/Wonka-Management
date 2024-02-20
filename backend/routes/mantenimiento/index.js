import express from 'express'
import { createClient } from '@libsql/client'

const client = createClient({
  authToken: process.env.DB_MAN_TOKEN,
  url: process.env.DB_MAN_URL
})

// create a new router to handle the mantenimiento routes
const Router = express.Router()

Router.get('/', async (req, res) => {
// get machines
  const { rows: machines } = await client.execute('SELECT * FROM MACHINE')

  res.json({ message: 'this is not implemented yet, please come back later', machines })
})

// export the router
export default Router
