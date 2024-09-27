import express, { json } from 'express';
import cors from 'cors';
import RootRouter from "./routes/index.js"
import { morganMiddleware, logger } from './logger/index.js';

const PORT = 3000;

const app = express();
app.use(morganMiddleware);
app.use(json())
app.use(cors())
app.use("/api/v1", RootRouter);


app.listen(PORT, ()=>{
    logger.info(`Server running on port ${PORT}`)
})