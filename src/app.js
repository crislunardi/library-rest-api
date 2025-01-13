import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Error connecting to the database:", error);
});

connection.once("open", () => {
    console.log("Connected to the database!");
});

const app = express();
routes(app);

export default app;
