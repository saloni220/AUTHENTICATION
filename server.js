import express from "express";
import dotenv from "dotenv";
import dbconnect from "./CONFIG/db.js";
import router from "./ROUTES/authRoute.js";
dotenv.config();
dbconnect();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
  console.log("server is working");
});

app.use("/api/v1/auth", router);
app
  .listen(PORT, () => {
    console.log(`listion on port ${PORT}`);
  })
  .on("error", (error) => {
    console.log("cannot connect on this port ==>>", error);
  });
