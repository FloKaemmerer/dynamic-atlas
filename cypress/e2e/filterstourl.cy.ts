describe('Check if filters are pushed to URL', () => {
  it('fill out input with doc should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapTextFilter', { timeout: 30000 }).type('doc')
    cy.url().should('include', 'filterText=doc')
  },
  )
})
