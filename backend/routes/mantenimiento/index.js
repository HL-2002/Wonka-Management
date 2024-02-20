import express from "express";

// create a new router to handle the mantenimiento routes
const Router = express.Router()


Router.get("/",(req,res)=>{
    res.send("Mantenimiento");
})


// export the router
export default Router;