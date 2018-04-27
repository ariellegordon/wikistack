const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const layout = require('./views/layout');
const { db } = require('./models')

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

db.authenticate().
then(() => {
  console.log('connected to the database')
})

app.get('/', (req, res, next) => {
  try { res.send(layout(" ")); }
  catch (err) { next(err) }
  // res.send("Hello world");
})

const init = async () => {
  await db.User.sync()
  await db.Page.sync()
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}

const PORT = 3000;

