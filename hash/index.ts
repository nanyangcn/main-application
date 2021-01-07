import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

const app = express();

app.use(morgan('tiny'));
const uuid = uuidv4();

const PATH = './files';

const resGeneration = () => {
  let timestamp = 'YYYY-MM-DDThh:mm:ss.sssZ';
  timestamp = fs.readFileSync(`${PATH}/timestamp.txt`, 'utf8');
  return `${timestamp}: ${uuid}`;
};
  
const logPrint = () => {
  console.log(resGeneration());
  setInterval(() => console.log(resGeneration()), 5000);
};

const PORT = 3001;

app.get('/', (_req, res) => {
  res.send(resGeneration());
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
  logPrint();
});