import express from "express";
import router from "./routes/user";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

export default app;
