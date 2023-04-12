const readline = require('readline');

class ProductManager {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(code) {
    const result = this.products.find( p => p.code == code)
    if (result) {
      console.log(result)
    }
    else {
      console.log("No se encontro el producto con el ID proporcionado")
    }
  }

  // Resto de los métodos
}

const pm = new ProductManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Saliendo...');
  process.exit(0);
});

function promptAction() {
  rl.question('Que deseas realizar\n 1.- Mostrar todos los productos.\n 2.-Nuevo Producto. \n 3.- Buscar producto por id.\n 4.-Salir.\n', (respond) => {
    if (respond == 1) {
      pm.getProducts();
      promptAction();
    } else if (respond == 2) {
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
                  promptAction();
                });
              });
            });
          });
        });
      });
    } else if (respond == 3){
      rl.question('Ingresa el id del producto: ', (code) => {
        pm.getProductById(code)
        promptAction()
      })
    } else if (respond == 4) {
      rl.close();
    } else {
      console.log('Comando no valido');
      promptAction();
    }
  });
}

promptAction();

