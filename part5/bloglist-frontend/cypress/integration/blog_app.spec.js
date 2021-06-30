describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'shukebeta test',
      username: 'shukebeta-test',
      password: 'abc1234567'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  // E 5.17
  it('Login form is shown', function () {
    cy.contains('log in')
    cy.contains('password')
  })
  // E 5.18
  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('shukebeta-test')
      cy.get('input:last').type('abc1234567')
      cy.contains('login').click()
      cy.contains('shukebeta-test logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('input:first').type('shukebeta-test')
      cy.get('input:last').type('!abc1234567')
      cy.contains('login').click()
      cy.get('.error').should('contain', 'wrong username or password')
      // Cypress requires the colors to be given as rgb.
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
  // E 5.19
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('input:first').type('shukebeta-test')
      cy.get('input:last').type('abc1234567')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input.new-blog-title').type('a new blog created by cypress')
      cy.get('input.new-blog-url').type('https://www.google.com')
      cy.contains('create').click()
      cy.contains('a new blog created by cypress')
    })
  })
})
