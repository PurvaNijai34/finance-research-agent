import express from "express";
import askRoute from "./routes/askRoute.js";

const app = express();

app.use(express.json());

app.use("", askRoute);


const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});