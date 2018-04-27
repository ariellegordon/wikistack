const express = require('express');
const { Page } = require('../models');
const { addPage } = require('../views')
const router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.post('/'), (req, res, next) => {

}

router.get('/add', (req, res, next) => {
  try { res.send(addPage()) }
  catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
  const page = new Page({
      title: req.body.title,
      content: req.body.content
  })

  try {
    await page.save();
    res.redirect('/');
  }
  catch (error) {next(error)}
})

function generateSlug(title){
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
