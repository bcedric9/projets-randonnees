import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hikeRoutes from "./routes/hikeRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import guideAvailabilityRoutes from "./routes/guideAvailabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Randonnées",
      version: "1.0.0",
      description: "Documentation API"
    },
    components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
  },
  apis: ["./src/docs/*.yaml"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


export default app;