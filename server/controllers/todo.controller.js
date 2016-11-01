import Todo from '../models/todo.model';

/**
 * Load todo and append to req.
 */
function load(req, res, next, id) {
  Todo.get(id)
    .then((todo) => {
      req.todo = todo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get todo
 * @returns {Todo}
 */
function get(req, res) {
  return res.json(req.todo);
}

/**
 * Create new todo
 * @property {string} req.body.title - The title of the todo.
 * @property {string} req.body.description - The description of the todo.
 * @property {boolean} req.body.completed - Todo completed boolean.
 * @returns {Todo}
 */
function create(req, res, next) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description
  });

  todo.save()
    .then(savedTodo => res.json(savedTodo))
    .catch(e => next(e));
}

/**
 * Update existing todo
 * @property {string} req.body.title - The title of the todo.
 * @property {string} req.body.description - The description of the todo.
 * @property {boolean} req.body.completed - Todo completed boolean.
 * @returns {Todo}
 */
function update(req, res, next) {
  const todo = req.todo;
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.completed = req.body.completed;

  todo.save()
    .then(savedTodo => res.json(savedTodo))
    .catch(e => next(e));
}

/**
 * Get todo list.
 * @property {number} req.query.skip - Number of todos to be skipped.
 * @property {number} req.query.limit - Limit number of todos to be returned.
 * @returns {Todo[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Todo.list({ limit, skip })
    .then(todos => res.json(todos))
    .catch(e => next(e));
}

/**
 * Delete todo.
 * @returns {Todo}
 */
function remove(req, res, next) {
  const todo = req.todo;
  todo.remove()
    .then(deletedTodo => res.json(deletedTodo))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
