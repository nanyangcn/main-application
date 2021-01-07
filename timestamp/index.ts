import fs from 'fs';

const timestamp = () => `${new Date().toISOString()}`;

const PATH = '.';
const writeFile = () => {
  fs.writeFileSync(`${PATH}/timestamp.txt`, timestamp());
};

writeFile();
setInterval(()=> writeFile(), 5000);