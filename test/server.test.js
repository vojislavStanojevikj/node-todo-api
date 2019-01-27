const expect = require('expect');
const request = require('supertest');


const {Todo} = require('../model/Todo');
const {app} = require('../server/server');

beforeEach((done) => {

    Todo.remove({}).then(() => done());

});


describe('POST todos', () => {

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

