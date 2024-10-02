require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const fileExpressUploaded = require('express-fileupload');

const app = express();

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_KEY));
app.use(fileExpressUploaded());

// db
const connectDB = require('./db/connect');

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
app.use(express.json());
app.use(express.static('public'));
// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/orders", orderRoutes)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const start = async () => {

    await connectDB();

    const port = process.env.PORT || 3000

    try {
        app.listen(port, ()=>console.log("Listening to port " + port));
    } catch (error) {
        console.log(error);
    }
}

start();