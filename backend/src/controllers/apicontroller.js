
const userModel=require("../Models/userModel")
const productModel=require("../Models/productModel")
const jwt=require("jsonwebtoken")

const createUser = async (req, res) => {

    try {

        let data =req.body
console.log(data)
        

        let saveUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User Register Successfully", data: saveUser })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }


}




const loginUser = async function (req, res) {

    try {

        let {email,password}=req.body

        // if (Object.keys(req.body).length == 0) {
        //     return res.status(400).send({ status: false, message: "Please provide some detail" })
        // }

        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide EmailId" })
        }
        // if (!isValidemail(email)) {
        //     return res.status(400).send({ status: false, message: "Email is Invalid" })
        // }
        if (!(password)) {
            return res.status(400).send({ status: false, message: "Please provide Password" })
        }
        // if (!isValidpassword(password)) {
        //     return res.status(400).send({ status: false, message: "Password Should be Min-8 & Max-15, it contain atleast -> 1 Uppercase , 1 Lowercase , 1 Number , 1 Special Character  Ex- Abcd@123" })
        // }

        const user = await userModel.findOne({ email: email})
        if (!user) { return res.status(400).send({ status: false, message: "Please provide correct email" }) }

        // const isMatch = await bcrypt.compare(password, user.password) // compare logIN and DB password , return boolean value
        // if (!isMatch) { return res.status(400).send({ Status: false, message: "incorrect credential" }) }

        const token = jwt.sign({
            user: user._id.toString(),
            expiresIn: "24h"
        },
            "Project5"
        )

        return res.status(200).send({ status: true, message: "User login successfull", data: { user: user._id, token: token } })

    }
    catch (err) {
        return res.status(500).send({ message: "server error", error: err.message })
    }

}



//=======================================Product APIS==============================================================================




//================================================ [ Create Product API ] =============================================
const createProduct = async function (req, res) {
    try {

        let data = JSON.parse(JSON.stringify(req.body))

        let { title, description, price, isFreeShipping,productImage } = data


       

        


        let titleExist = await productModel.findOne({ title });
        if (titleExist) {
            return res.status(400).send({ status: false, message: "Product title already present in DB" })
        }

        let saveProduct = await productModel.create(data)
        return res.status(201).send({ status: true, message: "Product Created Successfully", data: saveProduct })
    }

    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


//================================================ [ Get Product API ] =============================================
const getProduct = async function (req, res) {

    try {
        
        const productGet = await productModel.find()

        if (productGet.length == 0) {
            return res.status(404).send({ status: false, message: "No product found" })
        }

        return res.status(200).send({ status: true, data: productGet })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//=====================================================================================================================================

const getDetailsFromParam = async function (req, res) {

    try {
        let productId = req.params.id

        if (!productId) return res.status(400).send({ status: false, message: "No parameter found" })

        const ProductByProductId = await productModel.findOne({ _id: productId })
        if (!ProductByProductId) return res.status(404).send({ staus: false, message: "No such product exist with this Id" })

        return res.status(200).send(ProductByProductId)
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}




module.exports={createUser,createProduct,loginUser,getProduct,getDetailsFromParam}









