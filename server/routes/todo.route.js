import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import todoCtrl from '../controllers/todo.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/todos - Get list of todos */
  .get(todoCtrl.list)

  /** POST /api/todos - Create new todo */
  .post(validate(paramValidation.createTodo), todoCtrl.create);

router.route('/:todoId')
  /** GET /api/todos/:todoId - Get todo */
  .get(todoCtrl.get)

  /** PUT /api/todos/:todoId - Update todo */
  .put(validate(paramValidation.updateTodo), todoCtrl.update)

  /** DELETE /api/todos/:todoId - Delete todo */
  .delete(todoCtrl.remove);

/** Load todo when API with todoId route parameter is hit */
router.param('todoId', todoCtrl.load);

export default router;
