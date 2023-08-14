import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productsCollection, cartsCollection } from "../constants/index.js";

const cartSchema = new mongoose.Schema({
	products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:productsCollection
        }
    ]
})

cartSchema.plugin(mongoosePaginate)

export const cartsModel = mongoose.model(cartsCollection, cartSchema)