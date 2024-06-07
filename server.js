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
import CartRoutes from './routes/CartRoutes.js';
import CartGeneralRoutes from './routes/CartGeneralRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';
import CourseRoutes from './routes/CourseRoutes.js';
import descriptionRoutes from './routes/descriptionRoutes.js';
import ContactHelpRoutes from './routes/ContactHelpRoutes.js';
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import Razorpay from "razorpay";



dotenv.config();

connectDB();
const app = express();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));



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
app.use("/cart", CartRoutes);
app.use("/cartgeneral", CartGeneralRoutes);
app.use("/review", ReviewRoutes);
app.use("/maincourse", CourseRoutes);
app.use("/description", descriptionRoutes);
app.use("/help", ContactHelpRoutes)
app.use("/api", paymentRoute);


app.get("/", (req, res) => {
  res.send("abc");
});
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Start at ${PORT}`);
});
