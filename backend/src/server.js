import express from "express";
import homeRouter from "./routers/homeRouter.js";
import { connectDB, getDB } from "./DB/connection.js";

const app=express();
const Port = 3001;

//All Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/home", homeRouter);


async function startServer() {
  await connectDB("School"); // Connect before starting server
  const db = getDB();
  await db.createCollection("teachers");
  app.listen(Port, () => {
    console.log(`Server running on ${Port}`);
  });
}

startServer();



