describe('Check if filters are pushed to URL', () => {
  it('fill out input with doc should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapTextFilter', { timeout: 30000 }).type('doc')
    cy.url().should('include', 'filterText=doc')
  },
  )
  it('open map filters panel click map tier filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#maptier', { timeout: 30000 }).click()
    cy.url().should('include', 'mapTier=1,16')
  },
  )
  it('open map filters panel click openness filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#openness', { timeout: 30000 }).click()
    cy.url().should('include', 'openness=0,10')
  },
  )
  it('open map filters panel click traversability filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#traversability', { timeout: 30000 }).click()
    cy.url().should('include', 'traversability=0,10')
  },
  )
  it('open map filters panel click backtrack filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#backtrack', { timeout: 30000 }).click()
    cy.url().should('include', 'backtrackFactor=0,10')
  },
  )
  it('open map filters panel click linearity filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#linearity', { timeout: 30000 }).click()
    cy.url().should('include', 'linearity=0,10')
  },
  )
  it('open map filters panel click terrain slots filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#terrainslots', { timeout: 30000 }).click()
    cy.url().should('include', 'terrainSlots=0,10')
  },
  )
  it('open map filters panel click base mob count filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#basemobcount', { timeout: 30000 }).click()
    cy.url().should('include', 'baseMobCount=0,10')
  },
  )
  it('open map filters panel click rushable boss filter and it should add it to query params', () => {
    cy.visit('/')
    cy.get('#mapPanel', { timeout: 30000 }).click()
    cy.get('#rushableboss', { timeout: 30000 }).click()
    cy.url().should('include', 'rushableBoss=true')
  },
  )
})
