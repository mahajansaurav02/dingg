const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // number / decimal
    isFreeShipping: { type: Boolean, default: false, lowercase: true },
    productImage: { type: String, required: true },
 

}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)