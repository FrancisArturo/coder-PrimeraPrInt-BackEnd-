import { Router } from 'express';
import ProductsManager from '../dao/managers/dbManagers/products.manager.js';
import { productsModel }  from '../dao/models/products.models.js';




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
                return res.json({
                    message: "Products retrieved successfully",
                    data: products
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.get(`${this.path}/:cid`, async (req, res) => {
            try {
                const { cid } = req.params;
                const product = await this.productsManager.getProductsById(cid);
                return res.json({
                    message: "Product retrieved successfully",
                    data: product
                })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        );
        this.router.delete(`${this.path}/:cid`, (req, res) => {
            try {
                const { cid } = req.params;
                const product = this.productsManager.deleteProduct(cid);
                return res.json({
                    message: "Product deleted successfully",
                    data: product
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

        this.router.put(`${this.path}/:cid`, async (req, res) => {
            try {
                const { cid } = req.params;
                const product = req.body;
                const updateProduct = await this.productsManager.updateProduct(cid, product);
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
