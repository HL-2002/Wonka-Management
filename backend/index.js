import express from 'express'
import matenimientoRouter from './routes/mantenimiento/index.js'
const app = express()

// define port
const port = process.env.PORT || 3000

// Router api
const ApiRouter = express.Router()

// add the mantenimiento_router to the api router
ApiRouter.use('/mantenimiento', matenimientoRouter)

// add the api router to the app
app.use('/api', ApiRouter)

// add the frontend to the app
app.use(express.static('frontend'))

//  start the server
app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}/`)
})
