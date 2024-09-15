require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

const app = express();

app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_KEY));
// db
const connectDB = require('./db/connect');

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
app.use(express.json());
// routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/auth", authRoutes)


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