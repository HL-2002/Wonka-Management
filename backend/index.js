import express from 'express'
import matenimientoRouter from './routes/mantenimiento/index.js'
import inventarioRouter from './routes/inventario/index.js'
import ventasRouter from './routes/ventas/index.js'
import distribucionRouter from './routes/despacho/index.js'
const app = express()

// define port
const port = process.env.PORT || 3000
// parse the body of the request to object if the content type is application/json
app.use(express.json())

// Router api
const ApiRouter = express.Router()
// add the api router to the app
app.use('/api', ApiRouter)

// add the modu_router to the api router
ApiRouter.use('/mantenimiento', matenimientoRouter)
ApiRouter.use('/inventario', inventarioRouter)
ApiRouter.use('/ventas', ventasRouter)
ApiRouter.use('/distribucion', distribucionRouter)

// add the frontend to the app
app.use(express.static('frontend'))

//  start the server
app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}/`)
})
