import express from 'express'

// create a new router to handle the mantenimiento routes
const Router = express.Router()

Router.get('/', (req, res) => {
  res.json({ message: 'this is not implemented yet, please come back later' })
})

// export the router
export default Router
