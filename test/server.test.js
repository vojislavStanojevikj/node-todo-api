const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Todo} = require('../model/Todo');
const {app} = require('../server/server');


describe('POST todos', () => {

    beforeEach((done) => {

        Todo.remove({}).then(() => done());

    });

    it('Should post todo', done => {

        const testText = 'testToDo';

        request(app)
            .post('/todos')
            .send({text: testText})
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(testText);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {

                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(testText);
                    done();

                }).catch(err => done(err));

            });


    });

    it('Should fail posting todo', done => {

        const testText = '';

        request(app)
            .post('/todos')
            .send({text: testText})
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('Persisting Todo failed......');
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }


                Todo.find().then(todos => {

                    expect(todos.length).toBe(0);
                    done();

                }).catch(err => done(err));

            });

    });

});

describe('GET todos', () => {


    it('should fetch empty todos list', function (done) {

        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(0);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                done();

            });

    });

    describe('Fetch with some data', () => {

        const testText = 'testTodo';

        before((done) => {
            const testTodo = new Todo({text: testText});
            testTodo.save().then(result => done()).catch(error => done(error));

        });

        after((done) => {
            Todo.remove({text: testText}).then(result => done()).catch(error => done(error));
        });

        it('Should fetch all todos', done => {

            request(app)
                .get('/todos')
                .expect(200)
                .expect(res => {
                    expect(res.body.todos.length).toBe(1);
                    expect(res.body.todos[0].text).toBe(testText);
                })
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }

                    done();

                });
        });

    });
});

describe('GET By ID todo', () => {

    const testText = 'testTodo';
    const testTodo = new Todo({_id: new ObjectID('5c4dc7e54bf68b3549083ee5'),text: testText});


    before((done) => {
        testTodo.save().then(result => done()).catch(error => done(error));

    });

    after((done) => {
        Todo.remove({_id: new ObjectID('5c4dc7e54bf68b3549083ee5')}).then(result => done()).catch(error => done(error));
    });

    it('should get one todo by id', (done) => {
        request(app)
            .get(`/todos/${testTodo._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toEqual(testTodo._id.toHexString());
                expect(res.body.todo.text).toBe(testTodo.text);
            }).end(done);
    });

    it('should fail to fetch with invalid id', () => {

        request(app)
            .get('/todos/123')
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toBe('Provided id is not valid!');
            });

    });

    it('should not find todo with not existing id', (done) => {

        request(app)
            .get(`/todos/${new ObjectID()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('Requested resource not found!');
            }).end(done);

    });


});

describe('Delete By ID todo', () => {

    const testText = 'testTodo';
    const testTodo = new Todo({_id: new ObjectID('5c4dc7e54bf68b3549083ee5'),text: testText});


    before((done) => {
        testTodo.save().then(result => done()).catch(error => done(error));

    });

    after((done) => {
        Todo.remove({_id: new ObjectID('5c4dc7e54bf68b3549083ee5')}).then(result => done()).catch(error => done(error));
    });

    it('should delete one todo by id', (done) => {
        request(app)
            .delete(`/todos/${testTodo._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toEqual(testTodo._id.toHexString());
                expect(res.body.todo.text).toBe(testTodo.text);
            }).end(result => {

                Todo.find().then(todos => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(error => {
                    done(error);
                })
        });
    });

    it('should fail to delete with invalid id', () => {

        request(app)
            .delete('/todos/123')
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toBe('Provided id is not valid!');
            });

    });

    it('should not delete todo with not existing id', (done) => {

        request(app)
            .delete(`/todos/${new ObjectID()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe('Requested resource not found!');
            }).end(done);
    });


});

