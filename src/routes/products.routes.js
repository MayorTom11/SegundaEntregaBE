import { Router } from "express";
import { ProductsMongo } from "../managers/Mongo/productsMongo.js";
import { productsModel } from "../models/products.model.js";

const router = Router()
const productService = new ProductsMongo()

router.get("/api/products/",async(req,res)=>{
    try {
        let limit = req.query.limit
        let page = req.query.page
        let sort = req.query.sort
        if(!limit){
            limit = 10
        }
        if(!page){
            page = 1
        }
        const getProducts = await productsModel.paginate({},{page:page,limit:limit,sort:sort})
        res.json({status:"success",data:getProducts})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/api/products/:productId",async(req,res)=>{
    try {
        const productId = req.params.productId
        const getProductById = await productService.getProductById(productId)
        getProductById ? res.json(getProductById) : res.json("El producto buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post("/api/products/",async(req,res)=>{
        try {
            const productInfo = req.body
            const createProduct = await productService.addProduct(productInfo)
            res.json({status:"success",data:createProduct,message:"Producto Agregado"})
        } catch (error) {
            res.status(500).json(error.message)
        }
})

router.put("/api/products/:productId",async(req,res)=>{
    try {
        const updateProduct = req.body
        const productId = req.params.productId
        await productService.updateProduct(productId, updateProduct)
        res.json({message:"Producto modificado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/api/products/:productId",async(req,res)=>{
    try {
        const productId = req.params.productId
        await productService.deleteProduct(productId)
        res.json({status:"success", message:"Producto eliminado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export {router as productsRouter}