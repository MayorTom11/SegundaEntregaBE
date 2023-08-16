import { Router } from "express";
import { CartsMongo } from "../managers/Mongo/cartsMongo.js";

const router = Router()
const cartService = new CartsMongo()

router.post("/api/carts/",async(req,res)=>{
    try {
        const cartInfo = req.body
        await cartService.addCart(cartInfo)
        res.json({message:"Carrito Agregado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/api/carts/:cartId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const getCartById = await cartService.getProductsInCart(cartId)
        getCartById ? res.json(getCartById) : res.json("El carrito buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post("/api/carts/:cartId/products/:productId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const productId = req.params.productId
        const quantity = req.body
        const addProductsInCart = await cartService.addProductsInCart(cartId, productId, quantity)
        addProductsInCart ? res.json(addProductsInCart) : res.json("El carrito buscado no fue encontrado")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/api/carts/:cartId/products/:productId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const productId = req.params.productId
        await cartService.deleteProductInCart(cartId, productId)
        res.json({status:"success", message:"Producto eliminado del carrito"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/api/carts/:cartId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        await cartService.deleteCart(cartId)
        res.json({status:"success", message:"Carrito eliminado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put("/api/carts/:cartId",async(req,res)=>{
    try {
        const cartId = req.params.cartId
        const newCart = req.body
        await cartService.updateCart(cartId, newCart)
        res.json({status:"success", message:"Carrito actualizado"})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export {router as cartsRouter}