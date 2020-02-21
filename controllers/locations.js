const express = require('express');

const router  = express.Router();

const mysqlDb = require('../mysqlDb');

const checkItem = async (itemID) => {

  const response = await mysqlDb.getConnection().query(
      'SELECT * FROM `item_locations` WHERE `id` = ?', itemID
  );

  const item = response[0];
  return !item ? null : item;
};

router.get('/', async (req,res) => {

  const items = await mysqlDb.getConnection().query(
      'SELECT `id`, `name` from `item_locations`'
  );
  res.send(items)
});

router.get('/:id', async (req,res) => {

  const response = await checkItem(req.params.id);

  !response ?
      res.status(404).send({message: 'Category not found!'})
      :
      res.send(response)
});

router.post('/',async (req,res) => {
  const category = req.body;

  if(category.name) {

    const result = await mysqlDb.getConnection().query(
        'INSERT INTO `item_locations` ' +
        '(`name`, `description`) VALUES' +
        '(?, ?)',
        [category.name, category.description]
    );

    res.send({...category,...{id: result.insertId}});
  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }
});
router.delete('/:id', async (req,res) => {
  try {
    const result = await mysqlDb.getConnection().query(
        'DELETE FROM `item_locations`' +
        'WHERE id = ?', req.params.id
    );
    res.send(result)
  } catch (e) {
    res.send(e)
  }

});

router.put('/:id', async (req,res) => {
  const category= req.body;


  if(category.name) {

    if(!await checkItem(req.params.id)){
      res.status(404).send({message: 'Item not found!'})
    } else {
      const result = await mysqlDb.getConnection().query(
          'UPDATE `item_locations` SET ' +
          '`name` =?, `description` = ?'+
          ' WHERE id = ?',
          [category.name, category.description, req.params.id]
      );
      res.send({...category,...{id: result.insertId, message: result.message}});
    }

  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }
});


module.exports = router;
