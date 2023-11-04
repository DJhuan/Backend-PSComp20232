import express, { Router } from "express";
import bodyParser from "body-parser";
import { CoasterManager, Auth } from "@/app/controllers";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/coasterManager", CoasterManager);
app.use("/auth", Auth);

console.log(`Servidor ativo em: http://localhost:${port}`);

app.listen(port);
