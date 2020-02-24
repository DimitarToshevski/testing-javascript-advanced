const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./middleware/cors');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors);

app.use('/api/login', userRoutes);

app.use('/api/products', productRoutes);

app.listen(3000, (req, res) => {
  console.log('server running on 3000');
});
