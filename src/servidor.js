const express = require('express');
const cors = require('cors');
const fs = require('fs');

// Usar la clase ProductManager definida anteriormente
const ProductManager = require('./entregable2');
const { parse } = require('path');
const pm = new ProductManager();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit)
  const products = pm.products

  if (Number.isInteger(limit) && limit > 0){
    res.json(products.slice(0,limit))
  }else {
    res.json(products)
  }
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = pm.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.post('/products', (req, res) => {
  const product = req.body;
  pm.addProduct(product);
  res.status(201).json({ message: 'Producto creado exitosamente', product });
});

app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const newProduct = req.body;
  pm.updateProduct(newProduct, id);
  res.json({ message: 'Producto actualizado exitosamente', newProduct });
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = pm.getProductById(id);
  if (product) {
    pm.deleteProduct(id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
