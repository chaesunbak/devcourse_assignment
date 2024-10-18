const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 9999");
});

const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const cartsRouter = require("./routes/carts");
const ordersRouter = require("./routes/orders");
const booksRouter = require("./routes/books");
const likesRouter = require("./routes/likes");

app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/books", booksRouter);
app.use("/api/likes", likesRouter);
