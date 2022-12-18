import csv from 'csvtojson';
import * as fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

const __dirname = path.resolve();
const csvPath = path.join(__dirname, 'csv', 'nodejs-hw1-ex1.csv');
const txtPath = path.join(__dirname, 'txt', 'nodejs-hw1-ex1.txt');

const readStream=fs.createReadStream(csvPath);

const writeStream=fs.createWriteStream(txtPath);

pipeline(readStream, csv(), writeStream, (err) => console.log(err));

