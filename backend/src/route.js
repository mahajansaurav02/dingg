const express = require("express")
const router = express.Router()
const apiController = require("../src/controllers/apicontroller")
const {auth} = require('./Middleware/auth')



//----------------------------------  [ User API ]  -----------------------------------

router.post("/registerUser",apiController.createUser)
router.post("/registerProduct",apiController.createProduct)
router.post("/login" , apiController.loginUser)
router.get("/getProducts", apiController.getProduct)

module.exports=router
