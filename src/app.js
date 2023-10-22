import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

import __dirname from "./utils.js";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js"
import chatRouter from "./routes/messages.js";

const app = express();
const PORT = 8080;
const urlMongo = "mongodb+srv://santurosa999:Jana2022San@clustercursobackend.c9erwbe.mongodb.net/ecommerce";
const connection = mongoose.connect(urlMongo);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use('/static', express.static(`${__dirname}/public`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);
app.use("/", chatRouter);

const server = app.listen(PORT, () => {
    console.log("Server on PORT " + PORT);
})

const io = new Server(server)

let messages = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data);
    })
})