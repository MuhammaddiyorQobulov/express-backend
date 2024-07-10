import express from "express";
import mongoose from "mongoose";
import { routers } from "./Router/index.js";
import cors from "cors";
const DB_URL = "mongodb+srv://express:express@cluster0.yeryz4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5003;
const app = express();

app.use(cors());
app.use(express.json());
routers.map(({ path, router }) => app.use(path, router));
const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
