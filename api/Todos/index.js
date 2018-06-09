var express = require('express');

var router = express.Router();

const getTodos =        require('./getTodos'),
      getTodo =         require('./getTodo'),
      createTodo =      require('./createTodo'),
      updateTodo =      require('./updateTodo'),
      deleteTodo =      require('./deleteTodo'),
      auth =            require('../auth')

router.route('/')
    .get(getTodos)
    .post(auth.checkAuth,createTodo)


router.route('/:todoId')
    .get(getTodo)
    .patch(auth.checkAuth,updateTodo)
    .delete(auth.checkAuth,deleteTodo)


module.exports = router;