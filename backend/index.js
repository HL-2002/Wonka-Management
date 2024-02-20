import express from "express";
import matenimiento_router from "./routes/mantenimiento/index.js";
const app = express();


//Router api 
const ApiRouter = express.Router();


// add the mantenimiento_router to the api router
ApiRouter.use("/mantenimiento",matenimiento_router);








// add the api router to the app
app.use("/api",ApiRouter);

// add the frontend to the app
app.use(express.static("frontend"));



//  start the server
app.listen(3000,()=>{
    console.log("Server is running on  http://localhost:3000/");
})