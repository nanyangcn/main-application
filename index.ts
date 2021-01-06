import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'))
const uuid = uuidv4();

const resGeneration = () => `${new Date().toISOString()}: ${uuid}`;
  
const logPrint = () => {
  console.log(resGeneration());
  setInterval(() => console.log(resGeneration()), 5000);
};

const PORT = 3002;

app.get('/', (_req, res) => {
  res.send(resGeneration());
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
  logPrint();
})