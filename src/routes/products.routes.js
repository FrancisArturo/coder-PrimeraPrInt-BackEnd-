import { Router } from 'express';
import ProductsManager from '../dao/managers/dbManagers/products.manager.js';




export default class productsRoutes {
    path = '/products';
    router = Router();
    productsManager = new ProductsManager();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, async (req, res) => {
            try {
                const products = await this.productsManager.getallProducts();
                if (products === "No products found") {
                    return res.json({
                        message: "No products found",
                    })
                }
                return res.json({
                    message: "Products retrieved successfully",
                    data: products
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.get(`${this.path}/:pid`, async (req, res) => {
            try {
                const { pid } = req.params;
                const product = await this.productsManager.getProductsById(pid);
                if (product === "No product found") {
                    return res.json({
                        message: "No product found",
                    })
                }
                return res.json({
                    message: "Product retrieved successfully",
                    data: product
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.delete(`${this.path}/:pid`, async (req, res) => {
            try {
                const { pid } = req.params;
                const productFind = await this.productsManager.getProductsById(pid);
                if (productFind === "No product found") {
                    return res.json({
                        message: "No product found",
                    })
                }
                const productDelete = this.productsManager.deleteProduct(pid);
                return res.json({
                    message: "Product deleted successfully",
                    data: productDelete
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.post(this.path, async (req, res) => {
            try {
                const product = req.body;
                const newProduct = await this.productsManager.addProduct(product);
                if (newProduct === "Product already exists") {
                    return res.json({
                        message: "Product already exists",
                    })
                }
                return res.json({
                    message: "Product added successfully",
                    data: newProduct
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );

        this.router.put(`${this.path}/:pid`, async (req, res) => {
            try {
                const { pid } = req.params;
                const productFind = await this.productsManager.getProductsById(pid);
                if (productFind === "No product found") {
                    return res.json({
                        message: "No product found",
                    })
                }
                const product = req.body;
                const updateProduct = await this.productsManager.updateProduct(pid, product);
                return res.json({
                    message: "Product updated successfully",
                    data: updateProduct
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
    }
}
