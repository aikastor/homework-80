const express = require('express');

const router  = express.Router();

const mysqlDb = require('../mysqlDb');

const checkItem = async (itemID) => {

  const response = await mysqlDb.getConnection().query(
      'SELECT * FROM `item_categories` WHERE `id` = ?', itemID
  );

  const item = response[0];
  return !item ? null : item;
};

router.get('/', async (req,res) => {

  const items = await mysqlDb.getConnection().query(
      'SELECT `id`, `title` from `item_categories`'
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
  console.log(category);

  if(category.title) {

    const result = await mysqlDb.getConnection().query(
        'INSERT INTO `item_categories` ' +
        '(`title`, `description`) VALUES' +
        '(?, ?)',
        [category.title, category.description]
    );

    res.send({...category,...{id: result.insertId}});
  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }
});
router.delete('/:id', async (req,res) => {

  if(!await checkItem(req.params.id)){
    res.status(404).send({message: 'Item not found!'})
  } else {
    const result = await mysqlDb.getConnection().query(
        'DELETE FROM `item_categories`' +
        'WHERE id = ?' +
        'AND EXISTS(SELECT 1 FROM `items` WHERE category_id = ? LIMIT 1)', req.params.id
    );
    res.send(result)
  }

});

router.put('/:id', async (req,res) => {
  res.send('fsdfsd');
  const category= req.body;
  console.log(category);
  if(category.title) {

    if(!await checkItem(req.params.id)){
      res.status(404).send({message: 'Item not found!'})
    } else {
      const result = await mysqlDb.getConnection().query(
          'UPDATE `item_categories` SET ' +
          '`title` =?, `description` = ?,'+
          ' WHERE `id` = ?',
          [category.title, category.description, req.params.id]
      );
      res.send({...category,...{id: result.insertId, message: result.message}});
    }

  } else {
    res.status(400).send({message: 'Some data is missing!'})
  }
});

module.exports = router;
