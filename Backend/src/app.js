import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hikeRoutes from "./routes/hikeRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import guideAvailabilityRoutes from "./routes/guideAvailabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/hike", hikeRoutes);
app.use("/guide", guideRoutes);
app.use("/guide-availability", guideAvailabilityRoutes);
app.use("/booking", bookingRoutes);
app.use("/review", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});


export default app;