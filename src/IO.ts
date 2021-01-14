import fs from 'fs';
import path from 'path';
{
const path1 = path.resolve(__dirname, 'assets', 'data1.txt'); // __dirname = rootDir
fs.readFile(path1, 'utf-8', (err, data) => {
  if (err) console.error(err);
  console.log(data);
});

}
