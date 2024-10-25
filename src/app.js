import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js"; 

const conexao = await conectaNaDataBase();

conexao.on("error", (error) => {
    console.error("Erro ao conectar com a base de dados:", error);
});

conexao.once("open", () => {
    console.log("Conectado com a base de dados!");
});

const app = express();
routes(app);

export default app;
