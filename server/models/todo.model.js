import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Todo Schema
 */
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TodoSchema.method({
});

/**
 * Statics
 */
TodoSchema.statics = {
  /**
   * Get todo
   * @param {ObjectId} id - The objectId of todo.
   * @returns {Promise<Todo, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((todo) => {
        if (todo) {
          return todo;
        }
        const err = new APIError('No such todo exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List todos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of todos to be skipped.
   * @param {number} limit - Limit number of todos to be returned.
   * @returns {Promise<Todo[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Todo
 */
export default mongoose.model('Todo', TodoSchema);
