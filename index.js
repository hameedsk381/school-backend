const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRoute = require("./routers/teacherRouter");
const clubRoute = require("./routers/clubRouter");
const admissionRoute = require("./routers/admissionRouter");
const contactRoute = require("./routers/contactRouter");
const alumniRoute = require("./routers/alumniRouter");
const announcementRouter = require("./routers/announcementRouter");
const eventRouter = require("./routers/eventRouter");
const homeworkrouter = require("./routers/homeworkRoutes");
// const logrouter = require("./routers/HomeworkLogRoutes");
const resultsRouter = require('./routers/resultsRouter')
const classRoutes = require('./routers/classRoutes');
const subjectRoutes = require('./routers/subjectsRouter');
const materialRouter = require('./routers/materialRouter')
const Class = require("./models/classModel");
const Student = require("./models/studentModel");
const Subject = require("./models/subjectModel");
const resultRouter = require('./routers/resultsRouter');
const examRouter = require('./routers/examRouter');
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

app.use('/api/classes', classRoutes);
app.use("/management", userRoute);
app.use("/clubs", clubRoute);
app.use("/admissions", admissionRoute);
app.use("/feedback", contactRoute);
app.use("/alumni", alumniRoute);
app.use("/announcements", announcementRouter);
app.use("/events", eventRouter);
// app.use("/homework",classrouter);
// app.use("/homeworklog", logrouter);
app.use("/subjects", subjectRoutes);
app.use("/homework", homeworkrouter);
app.use('/results', resultRouter);
app.use('/exams', examRouter);
app.use('/material', materialRouter);
// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.use('/results',resultsRouter);
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
