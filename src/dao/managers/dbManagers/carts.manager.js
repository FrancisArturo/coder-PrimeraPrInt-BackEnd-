import { cartModel } from "../../models/cart.models.js";
import { productsModel } from "../../models/products.models.js";

export default class CartsManager {
    addCart = async () => {
        const cart = {
            products: []
        }
        const newCart = await cartModel.create(cart);
        return newCart;
    }
    getProductsCart = async (id) => {
        const cart = await cartModel.findById(id);
        if (!cart) {
            return "Cart does not exist";
        }
        return cart.products;
    }
    addProductCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid);
        const product = await productsModel.findById(pid);

        if (!cart) {
            return "Cart not found";
        }
        if (!product) {
            return "Product not found";
        }

        const productCart = {
            productId: pid,
            title: product.title,
            quantity: 1
        }
        if (cart.products.length === 0) {
            cart.products.push(productCart);
            await cart.save();
            return cart;
        }
        if (cart.products.length > 0) {
            for (let obj in cart.products) {
                if (cart.products[obj].productId == pid) {
                    cart.products[obj].quantity += 1;
                    await cart.save();
                    return cart;
                }
            }
        }
        cart.products.push(productCart);
        await cart.save();
        return cart;
    }
    deleteProductCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return "Cart not found";
        }
        for (let obj in cart.products) {
            if (cart.products[obj].productId == pid) {
                cart.products.splice(obj, 1);
                await cart.save();
                return cart;
            }
        }
        return "Product not found";
    }
    deleteCart = async (id) => {
        const cart = await cartModel.findById(id);
        if (!cart) {
            return "Cart not found";
        }
        await cart.deleteOne();
        return "Cart deleted";
    }
}


