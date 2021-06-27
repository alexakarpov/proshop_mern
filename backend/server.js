const express = require('express') // 'common js' way to import (ES Modules will be covered later)
const products = require('./data/products')
const app = express()

app.get('/', (req, res) => {
  res.send('api is on')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(5000, console.log('Server running on port 5000... yay?'))
