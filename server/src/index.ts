import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware.js";
/* ROUTE IMPORT */
import tenantRoutes from "./routes/tenantRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/applications", applicationRoutes);
app.use("/properties", propertyRoutes);
app.use("/leases", leaseRoutes);
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/* SERVER */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});