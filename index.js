const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRoute = require("./routers/userRouter");
const clubRoute = require("./routers/clubRouter");
const contactRoute = require("./routers/contactRouter");
const alumniRoute = require("./routers/alumniRouter");
const announcementRouter = require("./routers/announcementRouter");
const eventRouter = require("./routers/eventRouter");
const homeworkrouter = require("./routers/homeworkRoutes");
// const logrouter = require("./routers/HomeworkLogRoutes");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Middleware
app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/users", userRoute);
app.use("/clubs", clubRoute);
app.use("/feedback", contactRoute);
app.use("/alumni", alumniRoute);
app.use("/announcements", announcementRouter);
app.use("/events", eventRouter);
// app.use("/homework",classrouter);
// app.use("/homeworklog", logrouter);
// app.use("/",subjectsrouter);
app.use("/homework", homeworkrouter);
// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
