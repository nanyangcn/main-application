import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import axios from 'axios';

const app = express();

app.use(morgan('tiny'));
const uuid = uuidv4();

const PATH = './files';
const pingUrl = 'http://ping-pong-application-svc:2347/inquire'; //'http://localhost:3002/inquire';

const resGeneration = async (): Promise<string> => {
  let timestamp = 'YYYY-MM-DDThh:mm:ss.sssZ';
  timestamp = fs.readFileSync(`${PATH}/timestamp.txt`, 'utf8');
  // const pingPong = fs.readFileSync(`${PATH}/ping-pong.txt`, 'utf8');
  const response = await axios.get<string>(pingUrl);
  return `Hello<br/>${timestamp}: ${uuid}<br/>${response.data}`;
};
  
const logPrint = async () => {
  console.log(await resGeneration());
  setInterval(() => {
    const tempFunc = async (): Promise<void> => console.log(await resGeneration());
    void tempFunc();
  }, 5000);
};

const PORT = 3001;

app.get('/', (_req, res) => {
  const tempFunc = async () => res.send(await resGeneration());
  void tempFunc();
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
  void logPrint();
});