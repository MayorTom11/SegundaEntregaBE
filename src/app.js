import express from "express"
import { config } from "./config/config.js";
import { connectDB } from "./config/dbConnection.js";
import {engine} from "express-handlebars";
import {__dirname} from "./utils.js";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port = config.server.port
const app = express()

// Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/public")))

// Servers
const httpServer = app.listen(port, ()=>console.log(`Server listening on port ${port}`))

// Conexion a la base de datos
connectDB()

// Configuracion handlebars con engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Routes
app.use(productsRouter)
app.use(cartsRouter)
app.use(viewsRouter)