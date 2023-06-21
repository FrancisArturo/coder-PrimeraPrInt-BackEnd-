import { productsModel } from '../../models/products.models.js';

export default class ProductsManager {
    getallProducts = async () => {
        try {
            const products = await productsModel.find({});
            return products;
        } catch (error) {
            throw new Error("Error getting products");
        }
    }
    getProductsById = async (id) => {
        try {
            const product = await productsModel.findById({_id: id});
            return product;
        } catch (error) {
            throw new Error("Error getting product"); 
        }
    }
    addProduct = async (product) => {
        try {
            const checkProduct = await productsModel.findOne({ title: product.title });
            if (checkProduct) {
                return ("Product already exists");
            }
            const newProduct = new productsModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error("Error adding product");
        }
    }
    updateProduct = async (idUpdate, product) => {
        try {
            const updateProduct = await product.updateOne({ _id: idUpdate }, product);
            return updateProduct;
        } catch (error) {
            throw new Error("Error updating product");
        }
    }
    deleteProduct = async (id) => {
        try {
            const deleteProduct = await productsModel.deleteOne({ _id: id });
            return deleteProduct;
        } catch (error) {
            throw new Error("Error deleting product");
        }
    }

}