import csv from 'csvtojson';
import * as fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

const __dirname = path.resolve();

async function convertCsvToTxt () {
  try {
    const csvPath = path.join(__dirname, 'csv', 'nodejs-hw1-ex1.csv');
    fs.mkdir(path.join(__dirname, 'homework1', 'txt'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    const txtPath = path.join(__dirname, 'homework1', 'txt', 'nodejs-hw1-ex1.txt');

    const readStream=fs.createReadStream(csvPath);

    const writeStream=fs.createWriteStream(txtPath);

    pipeline(readStream, csv(), writeStream, (err) => console.log(err));
  } catch (err){
    console.log(err)
  }
}
await convertCsvToTxt();