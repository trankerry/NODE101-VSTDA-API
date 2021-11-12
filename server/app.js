const express = require('express');
const morgan = require('morgan');

const PORT = 8484;

const app = express();

const mockDATA = [{
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

app.use(express.json());
app.use(morgan('dev'));

// add your code here
app.get('/', (req, res) => {
  res.send({
    status: 'ok'
  }).status(200);
});

app.get('/api/TodoItems', (req, res) => {
  res.send(mockDATA).status(200);
});

app.get('/api/TodoItems/:id', (req, res) => {
  for (let i = 0; i < mockDATA.length; i++) {
    if (mockDATA[i].todoItemId === Number(req.params.id)) {
      res.send(mockDATA[i]).status(200);
    }
  }
});

app.post('/api/TodoItems', (req, res) => {
  for (let i = 0; i < mockDATA.length; i++) {
    if (req.body.todoItemId === mockDATA[i].todoItemId) {
      mockDATA[i] = req.body;
    } else {
      mockDATA.push(req.body);
    };
  };
  res.status(201).send(req.body);
});

app.delete('/api/TodoItems/:id', (req, res) => {
  for (let i = 0; i < mockDATA.length; i++) {
    if (mockDATA[i]['todoItemId'] === Number(req.params.id)) {
      let deleted = mockDATA.splice(i, 1);
      res.send(deleted[i]).status(200);
    }
  }
});

module.exports = app;
