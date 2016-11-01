import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import _ from 'lodash';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Todo APIs', () => {
  let todo = {
    title: 'TEST 123',
    description: 'TEST DESC 1234567890'
  };

  describe('# POST /api/todos', () => {
    it('should require title', (done) => {
      request(app)
        .post('/api/todos')
        .send({})
        .expect(httpStatus.BAD_REQUEST)
        .then(() => done())
        .catch(done);
    });

    it('should create a new todo', (done) => {
      request(app)
        .post('/api/todos')
        .send(todo)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(todo.title);
          expect(res.body.description).to.equal(todo.description);
          todo = res.body;
          done();
        })
        .catch(done);
    });

    it('should create a new todo when description is empty', (done) => {
      const _todo = _.clone(todo);
      delete _todo.description;

      request(app)
        .post('/api/todos')
        .send(_todo)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(todo.title);
          expect(res.body.completed).to.equal(false);
          expect(res.body.description).to.equal('');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/todos/:todoId', () => {
    it('should get todo details', (done) => {
      request(app)
        .get(`/api/todos/${todo._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(todo.title);
          expect(res.body.description).to.equal(todo.description);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when todo does not exists', (done) => {
      request(app)
        .get('/api/todos/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/todos/:todoId', () => {
    it('should update todo details', (done) => {
      todo.title = 'KK';
      todo.completed = true;
      request(app)
        .put(`/api/todos/${todo._id}`)
        .send(todo)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal(todo.title);
          expect(res.body.completed).to.equal(todo.completed);
          expect(res.body.description).to.equal(todo.description);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/todos/', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/api/todos')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/todos/', () => {
    it('should delete todo', (done) => {
      request(app)
        .delete(`/api/todos/${todo._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.title).to.equal('KK');
          expect(res.body.description).to.equal(todo.description);
          done();
        })
        .catch(done);
    });
  });
});
