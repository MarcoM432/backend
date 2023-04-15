const readline = require('readline');
const fs = require('fs');

class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.loadProducts();
  }

  loadProducts() {
    if (fs.existsSync('archivo.json')) {
      const data = fs.readFileSync('archivo.json', 'utf8');
      this.products = JSON.parse(data);
    } else {
      fs.writeFileSync('archivo.json', JSON.stringify(this.products, null, 2));
    }
  }

  saveProducts() {
    fs.writeFileSync('archivo.json', JSON.stringify(this.products, null, 2));
  }

  addProduct(product) {
    let nextId = 1001;
    product.id = nextId++;
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(newProduct, oldProductId) {
    const index = this.products.findIndex((p) => p.id == oldProductId)
    if (index !== -1) {
      newProduct.id = oldProductId
      this.products[index] = newProduct
      this.saveProducts()
      console.log('Producto actualizado con exito')
    } else {
      console.log('No se encontro el producto con el id proporcionado')
    }
  }

  deleteProduct(idd){
    const index = this.products.findIndex((p) => p.id == idd)
    if (index !== -1){
      this.products.splice(index,1)
      this.saveProducts()
      console.log('El producto se borro correctamente!')
    }

  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(idd) {
    const result = this.products.find((p) => p.id == idd);
    if (result) {
      console.log(result);
    } else {
      console.log('No se encontro el producto con el ID proporcionado');
    }
  }

  // Resto de los métodos de la clase ProductManager
}

const pm = new ProductManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {
  console.log('Saliendo...');
  fs.unlinkSync('archivo.json');
  process.exit(0);
});

function promptAction() {
  rl.question(
    'Que deseas realizar\n 1.- Mostrar todos los productos.\n 2.-Nuevo Producto. \n 3.- Buscar producto por id.\n 4.-Actualizar un producto existente.\n 5.- Eliminar un producto existente.\n 6.- Salir\n',
    (respond) => {
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
                      stock: Number(stock),
                    });
                    console.log('Producto agregado con éxito');
                    promptAction();
                  });
                });
              });
            });
          });
        });
      } else if (respond == 3) {
        rl.question('Ingresa el id del producto: ', (idd) => {
          pm.getProductById(idd);
          promptAction();
        });
      } else if (respond == 4) {
        rl.question('Ingresa el ID del producto que deseas actualizar.\n', (idd) =>{
          rl.question('Ingrese el nuevo título del producto: ', (title) => {
            rl.question('Ingrese la nueva descripción del producto: ', (description) => {
              rl.question('Ingrese el nuevo precio del producto: ', (price) => {
                rl.question('Ingrese el nuevo thumbnail del producto: ', (thumbnail) => {
                  rl.question('Ingrese el nuevo código del producto: ', (code) => {
                    rl.question('Ingrese el nuevo stock del producto: ', (stock) => {
                      pm.updateProduct({
                        title,
                        description,
                        price: Number(price),
                        thumbnail,
                        code,
                        stock: Number(stock),
                      },parseInt(idd));
                      promptAction();
                    });
                  });
                });
              });
            });
          });
        })
      } else if (respond == 5) {
        rl.question('Ingrese el id del producto que desea eliminar.\n', (idd) =>{
          pm.deleteProduct(idd)
          promptAction();
        })

      } else if (respond == 6){
        rl.close();
      } else {
        console.log('Comando no valido');
        promptAction();
      }
    }
  );
}

promptAction();
  