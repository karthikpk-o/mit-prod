import express, { json } from 'express';
import cors from 'cors';
import RootRouter from "./routes/index.js"

const PORT = 3000;

const app = express();
app.use(json())
app.use(cors({
    origin: ["https://mit-prod-fra3.vercel.app"],
    credentials: true
}))
app.use("/api/v1", RootRouter);


app.listen(PORT)