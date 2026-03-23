import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/database.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDatabase();

app.listen(port, () => {
    console.log(`Servidor rodando: ${port}`);
})