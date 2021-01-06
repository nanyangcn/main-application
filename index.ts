import { v4 as uuidv4 } from 'uuid';

const main = () => {
  const uuid = uuidv4();

  const printId = (uuid: string) => {
    console.log(uuid);
  };

  printId(uuid);
  setInterval(() => printId(uuid), 5000);
};

main();
