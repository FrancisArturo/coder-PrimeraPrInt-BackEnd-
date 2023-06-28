import express from "express";
import displayRoutes from "express-routemap";
import cors from "cors";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { NODE_ENV, PORT, API_VERSION } from "./config/config.js";
import  connectDB from "./db/mongo.config.js";


export default class App {
    app;
    port; 
    server;
    env;
    io;

    constructor (routes) {
        this.app = express();
        this.port = PORT || 8000;
        this.env = NODE_ENV || "development";
        
        this.listen();
        this.initializeIoConnection();
        this.initializeMiddlewares(this.io);
        this.initializeRoutes(routes);
        this.connectDB();
        this.initHandlebars();
        
    }
    getServer() { 
        return this.server;
    }
    closeServer() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`)
            done ()
        })
    }
    getApp() {
        return this.app;
    }

    async connectDB() {
        await connectDB();
    }
    initializeMiddlewares(io) {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
        this.ioExport(io);
        //this.app.set("io", io); 
    }
    listen() {
        this.server = this.app.listen(this.port, () => {
            this.initializeIoConnection();
            displayRoutes(this.app);
            console.log(`Server listening on port ${this.port}`);
            console.log(`Environment: ${this.env}`);
            return this.server
        });
    }
    ioExport(io) {
            this.app.use (function (req, res, next) {
            req.io =  io;
            next();
            });
    }
    initializeIoConnection() {
        this.io = new Server(this.server);
        this.io.on("connection", (socket) => {
            console.log("New connection");
            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
            //socket.on para recibir el mensaje "hola" de products.routes.js y mostrarlo por consola.
            socket.on("newProduct", (data) => {
                console.log(data);
            })
            // socket.on("productAdded", (data) => {
            //     console.log(data)
            //     })
            //socket.emit("products", "hola");
            // socket.on("addProduct", async (data) => {
            //     const newProduct = await manager.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.category, data.thumbnail);
            //     if (newProduct === "El código ya existe") {
            //         console.log("El código ya existe");
            //         socket.emit("newProduct", {error: "El código ya existe"});
            //     }
            //     else if (newProduct === "Faltan datos") {
            //         console.log("Faltan datos");
            //         socket.emit("newProduct", {error: "Faltan datos"});
            //     }
            //     else {
            //         io.sockets.emit("newProduct", data);
            //     }
            // });
            
        });
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(`/api/${API_VERSION}`, route.router);
        });
    }
    initHandlebars() {
        this.app.engine(
            "handlebars",
            handlebars.engine({
                runtimeOptions: {
                    allowProtoPropertiesByDefault: true,
                    allowProtoMethodsByDefault: true,
                },
            })
        );
        this.app.set("view engine", "handlebars");
        this.app.set("views", __dirname + "/views");
    }
}