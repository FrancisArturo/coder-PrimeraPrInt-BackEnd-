import App from "./app.js";
import baseRoute from "./routes/base.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = new App([new baseRoute(), new productsRoutes()]);


app.listen();
