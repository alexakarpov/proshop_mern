// 'common js' way to import (ES Modules will be covered later)
import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB()

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
