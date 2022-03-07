const mongo = require('./mongo-db');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products', async(request, response) => {
  await mongo.connect();
  const prod= await mongo.find();
  response.send(prod);
});

app.get('/:id', async(request, response) => {
  await mongo.connect();
  const idprod= await mongo.find({'_id':request.params.id});
  response.send(idprod);
});


app.get('/products/:search', async(request, response) => {
  await mongo.connect();
  const query= request.query
  const toFind={}
  
  if(request.query.price!=null)
  {
    toFind['price'] = parseInt(request.query.price);
  }
  if(request.query.brand!= null)
  {
    toFind['brand'] = request.query.brand;
  }
    
  searchprod= await mongo.find(toFind);
  response.send(searchprod);
});
/*
const lessPrice = 200;
  
  await mongo.connect();
  const prod= await mongo.find({'price':{$lt:lessPrice}});
  response.send(prod);*/




app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
