import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { initDb } from './db';
import usersRouter from './Routers/usersRouter';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', usersRouter);

async function startApp() {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();