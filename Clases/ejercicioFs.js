const fs = require('fs');

// Obtener fecha y hora actual
const now = new Date().toLocaleString();

// Escribir fecha y hora en archivo
fs.writeFile('fecha.txt', now, (err) => {
  if (err) throw err;
  console.log('La fecha ha sido escrita en el archivo.');
});

// Leer archivo y mostrar contenido en consola
fs.readFile('fecha.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(`El contenido del archivo es:\n${data}`);
});
