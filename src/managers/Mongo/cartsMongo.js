import {cartsModel} from "../../models/carts.model.js"

export class CartsMongo {
    constructor(){
        this.model = cartsModel
    }

    async getCarts(){
        try {
            const getCarts = await this.model.find()
            return getCarts
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los carritos")
        }
    }

    async addCart(cartInfo){
        try {
            const addCart = await this.model.create(cartInfo)
            return addCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al crear el carrito")
        }
    }

    async getProductsInCart(CartId){
        try {
            const getProductsInCart = await this.model.findById(CartId)
            return getProductsInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos del carrito")
        }
    }

    async addProductsInCart(cartId, productId, quantity){
        try {
            const addProductsInCart = await this.model.findByIdAndUpdate(cartId,productId,quantity)
            return addProductsInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al obtener los productos del carrito")
        }
    }

    async deleteProductInCart(cartId, productId){
        try {
            const deleteProductInCart = await this.model.findByIdAndDelete(cartId, productId)
            return deleteProductInCart
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al eliminar el producto del carrito")
        }
    }
}