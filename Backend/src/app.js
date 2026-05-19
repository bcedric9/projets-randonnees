import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hikeRoutes from "./routes/hikeRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/hike", hikeRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;