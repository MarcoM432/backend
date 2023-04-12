const fs = require('fs');

fs.readFile('package.json', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
 const info = {
    contenidoStr: 'contenido del archivo leído en formato string',
    contenidoObj: 'contenido del archivo leído en formato objeto',
}

console.log(info)
  const packageObj = JSON.parse(data);
  console.log(packageObj);
});
