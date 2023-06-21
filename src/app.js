import express from "express";
import displayRoutes from "express-routemap";
import cors from "cors";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { NODE_ENV, PORT, API_VERSION } from "./config/config.js";
import  connectDB from "./db/mongo.config.js";


export default class App {
    app;
    port; 
    server;
    env;

    constructor (routes) {
        this.app = express();
        this.port = PORT || 8000;
        this.env = NODE_ENV || "development";

        this.initializeMiddlewares(); 
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
    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/public"));
    }
    listen() {
        this.server = this.app.listen(this.port, () => {
            displayRoutes(this.app);
            console.log(`Server listening on port ${this.port}`);
            console.log(`Environment: ${this.env}`);
        });
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(`/api/${API_VERSION}`, route.router);
        });
    }
    initHandlebars() {
        this.app.engine(
            "hbs",
            handlebars.engine()
        );
        this.app.set("view engine", "hbs");
        this.app.set("views", __dirname + "/views");
    }
 
}