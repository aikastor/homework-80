const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const controllers = require('./controllers');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/',controllers);

const run = async () => {
  await mysqlDb.connect();

  app.listen(port, ()=> {
    console.log(`HTTP server started on ${port} port!`);
  });
  process.on('exit', ()=> {
    mysqlDb.disconnect();
  })
};

run().catch(e => {
  console.error(e);
});