import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//Method1
app.use(cors());

//Method2
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Conent-Type"],
//   })
// );

//middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mern stack");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
