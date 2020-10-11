const { expect } = require("chai");
const { describe } = require("mocha");

describe('/', () => {
    it('the home page loads seed tasks', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Tasks')
        cy.get('ul')
          .find('li')
          .should($li => {
              expect($li).to.have.length(2)
          })
    })

    it('adds a new task to the list', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input').type('New test task')
        cy.get('button').click()
        cy.get('ul')
        .find('li')
        .should($li => {
            expect($li).to.have.length(3)
        })
        .get('ul').find('li').last().contains('New test task')
    })
})