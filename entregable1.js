const readline = require('readline');

class ProductManager {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  // Resto de los métodos
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pm = new ProductManager();

rl.question('Ingrese el título del producto: ', (title) => {
  rl.question('Ingrese la descripción del producto: ', (description) => {
    rl.question('Ingrese el precio del producto: ', (price) => {
      rl.question('Ingrese el thumbnail del producto: ', (thumbnail) => {
        rl.question('Ingrese el código del producto: ', (code) => {
          rl.question('Ingrese el stock del producto: ', (stock) => {
            pm.addProduct({
              title,
              description,
              price: Number(price),
              thumbnail,
              code,
              stock: Number(stock)
            });
            console.log('Producto agregado con éxito');
            console.log(pm.products);
            rl.close();
          });
        });
      });
    });
  });
});
