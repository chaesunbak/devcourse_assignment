const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

app.use("/api/users", userRouter);
app.use("/api/channels", channelRouter);
