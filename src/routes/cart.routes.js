import { Router } from "express";
import CartsManager from "../dao/managers/dbManagers/carts.manager.js";


export default class cartRoutes {
    path = "/carts";
    router = Router();
    cartManager = new CartsManager();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}/:cid`, async (req, res) => {
            try {
                const { cid } = req.params;
                const cart = await this.cartManager.getProductsCart(cid);
                if (cart === "Cart does not exist") {
                    return res.json({
                        message: "Cart does not exist",
                        data: cart
                    })
                }
                return res.json({
                    message: "Cart retrieved successfully",
                    data: cart
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.post(this.path, async (req, res) => {
            try {
                const cart = req.body;
                const newCart = await this.cartManager.addCart(cart);
                return res.json({
                    message: "Cart added successfully",
                    data: newCart
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.post(`${this.path}/:cid/:pid`, async (req, res) => {
            try {
                const { cid, pid } = req.params;
                const cart = await this.cartManager.addProductCart(cid, pid);
                if (cart === "Cart not found") {
                    return res.json({
                        message: "Cart not found",
                        data: cart
                    })
                }
                if (cart === "Product not found") {
                    return res.json({
                        message: "Product not found",
                        data: cart
                    })
                }
                return res.json({
                    message: "Product added successfully",
                    data: cart
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.delete(`${this.path}/:cid/:pid`, async (req, res) => {
            try {
                const { cid, pid } = req.params;
                const cart = await this.cartManager.deleteProductCart(cid, pid);
                if (cart === "Cart not found") {
                    return res.json({
                        message: "Cart not found",
                        data: cart
                    })
                }
                if (cart === "Product not found") {
                    return res.json({
                        message: "Product not found",
                        data: cart
                    })
                }
                return res.json({
                    message: "Product deleted successfully",
                    data: cart
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.delete(`${this.path}/:cid`, async (req, res) => {
            try {
                const { cid } = req.params;
                const cart = await this.cartManager.deleteCart(cid);
                if (cart === "Cart not found") {
                    return res.json({
                        message: "Cart not found",
                        data: cart
                    })
                }
                return res.json({
                    message: "Cart deleted successfully",
                    data: cart
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
    }
}