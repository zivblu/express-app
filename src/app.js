const express = require('express');
const users = require('./Users');
const products = require('./Products');
const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('', (req, res) => {
  res.send('hello app')
})

// Get All Users
app.get('/users', (req, res) => res.json(users));

//Get User
app.get('/users/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  }
  res.status(400).json({ msg: `No user with the id of ${req.params.id} was found` })
});

// Create User
app.post('/user', (req, res) => {
  const newUser = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  }

  if (!newUser.id || !newUser.name || !newUser.email || !newUser.gender) {
    return res.status(400).json({ msg: `Please insert full details` });
  }

  users.push(newUser);
  res.json(newUser);
});

// Update User
app.put('/users/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        user.gender = updateUser.gender ? updateUser.gender : user.gender;
        res.json({ msg: 'User updated', user })
      }
    });
  }
  res.status(400).json({ msg: `No user with the id of ${req.params.id} was found` })
});


//Delete User
app.delete('/users/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    res.json
    ({ msg: 'User deleted',
    users: users.filter(user => user.id !== parseInt(req.params.id))});
  }
  res.status(400).json({ msg: `No user with the id of ${req.params.id} was found` })
});


// Get All Products
app.get('/products', (req, res) => res.json(products));

// Create Product
app.post('/product', (req, res) => {
  const newProduct = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  }

  if (!newProduct.id || !newProduct.name || !newProduct.price || !newProduct.quantity) {
    return res.status(400).json({ msg: `Please insert full details` });
  }

  products.push(newProduct);
  res.json(newProduct);
});

app.listen(port, () => {
  console.log('server is up on port ' + port);
})
