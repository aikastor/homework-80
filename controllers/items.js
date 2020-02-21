const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const router  = express.Router();

const mysqlDb = require('../mysqlDb');
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const checkItem = async (itemID) => {

  const response = await mysqlDb.getConnection().query(
      'SELECT * FROM `items` WHERE `id` = ?', itemID
  );
  const item = response[0];

  return !item ? null : item;
};

router.get('/', async (req,res) => {
  const items = await mysqlDb.getConnection().query(
      'SELECT `id`, `category_id`, `location_id`, `name` from `items`'
  );
  res.send(items)
});


router.get('/:id', async (req,res) => {

  const response = await checkItem(req.params.id);

  !response ?
      res.status(404).send({message: 'Item not found!'})
      :
      res.send(response)
});

router.post('/',upload.single('image'), async (req,res) => {
  const item = req.body;

  if(item.category_id && item.location_id && item.name) {

    if (req.file) {
      item.image = req.file.filename;
    }
    const result = await mysqlDb.getConnection().query(
        'INSERT INTO `items` ' +
        '(`category_id`, `location_id`, `name`, `date_added`, `description`,`image`) VALUES' +
        '(?, ?, ?, ?, ?, ?)',
        [item.category_id, item.location_id, item.name, item.date_added, item.description, item.image]
    );
    res.send({...item,...{id: result.insertId}});
  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }


});
router.delete('/:id', async (req,res) => {

  if(!await checkItem(req.params.id)){
      res.status(404).send({message: 'Item not found!'})
  } else {
    const result = await mysqlDb.getConnection().query(
        'DELETE FROM `items` WHERE `id`= ?', req.params.id
    );
    res.send(result)
  }

});
router.put('/:id', upload.single('image'), async (req,res) => {
  const item = req.body;

  if(item.category_id && item.location_id && item.name) {

    if (req.file) {
      item.image = req.file.filename;
    }

    if(!await checkItem(req.params.id)){
      res.status(404).send({message: 'Item not found!'})
    } else {
      const result = await mysqlDb.getConnection().query(
          'UPDATE `items` SET ' +
          '`category_id` = ?, `location_id` = ?,' +
          '`name` =?, `date_added` =?,' +
          '`description` =?,`image` =? '+
          ' WHERE `id` = ?',
          [item.category_id, item.location_id, item.name,
            item.date_added, item.description, item.image,
            req.params.id]
      );
      res.send({...item,...{id: result.insertId, message: result.message}});
    }

  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }
});

module.exports = router;