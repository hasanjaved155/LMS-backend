import express from "express";
import dotenv from "dotenv";
//import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import userPCSRoutes from "./routes/userPCSRoutes.js";
import myCourseRoutes from "./routes/myCourseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import employeeInformationRoutes from "./routes/employeeInformationRoutes.js"
import festivalRoutes from './routes/festivalRoutes.js';
import teachPCS360 from './routes/teachPCS360Routes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from "cors";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

app.use("/auth", userRoutes);
app.use("/authpcs", userPCSRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/playlist", playlistRoutes);
app.use("/course", myCourseRoutes);
app.use("/category", categoryRoutes);
app.use("/employee", employeeInformationRoutes)
app.use("/festival", festivalRoutes);
app.use("/teach", teachPCS360);
app.use("/create", paymentRoutes);

app.get("/", (req, res) => {
  res.send("abc");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Start at ${PORT}`);
});
