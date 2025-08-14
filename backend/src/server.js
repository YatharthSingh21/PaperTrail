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
  await connectDB("papertrail"); // Connect before starting server
  const db = getDB();
  await db.createCollection("papers");
  app.listen(Port, () => {
    console.log(`Server running on ${Port}`);
  });
}

startServer();



