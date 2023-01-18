import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { initDb } from './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

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