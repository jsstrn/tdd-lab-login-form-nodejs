const request = require('supertest')
const app = require('../app')

describe('GET /signup', function () {
  it('responds with signup form', function (done) {
    request(app)
      .get('/signup')
      .expect(200, /Signup for an account/, done)
  })
})

describe('POST /signup', function () {
  it('signs up with username and password', function (done) {
    request.agent(app)
      .post('/signup')
      .send({ username: 'demo2', password: 'a very long password', password_confirm: 'a very long password', email: 'demo2@example.com' })
      .redirects(5)
      .expect(200, /Thank you for signing up/, done)
  })

  it('displays error message when email has already been taken', function (done) {
    request.agent(app)
      .post('/signup')
      .send({ username: 'demo2', password: 'demo1234', password_confirm: 'demo1234', email: 'demo2@example.com' })
      .redirects(5)
      .expect(200, /Email has already been taken/, done)
  })

  it('displays error message when password is less than 12 characters', function (done) {
    request.agent(app)
      .post('/signup')
      .send({ username: 'shortie', password: 'demo1234', password_confirm: 'demo1234', email: 'shortie@example.com' })
      .redirects(5)
      .expect(200, /Password must be at least 12 characters/, done)
  })
})
