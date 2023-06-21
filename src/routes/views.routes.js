import { Router } from 'express';
import ProductsManager from '../dao/managers/dbManagers/products.manager.js';


export default class ViewsRoutes {
    path = '/views';
    router = Router();
    productsManager = new ProductsManager();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, async (req, res) => {
            const products = await this.productsManager.getallProducts();
            res.render("home", {products});
            });
        }
}