
describe('404 Error page user flow', () => {
  beforeEach(() => {
    cy.Fetch404Data('GET', 'https://restcountries.eu/rest/v2/all')
    cy.visit('http://localhost:3000/country/hotdog')
  });

  it('User should see a header with the App\'s name on page load & an error image', () => {
    cy.get('h1').contains('What In The World')
    cy.get('.error-img').should('be.visible')
  })

  it('User should see a message that displays the type of error', () => {
    cy.get('.error-message').contains('404 ERROR. Could not access server data.')
  })

  it('Should bring the user back to the home page by clicking the Header', () => {
    cy.get('.home-click').click()
    cy.get('h1').contains('What In The World')
    cy.get('.country-dropdown')
      .should('be.visible')
      .should('have.value', '')
})

  it('Should bring the user back to the home page by clicking the take me home button', () => {
    cy.get('button').click()
    cy.get('h1').contains('What In The World')
    cy.get('.country-dropdown')
      .should('be.visible')
      .should('have.value', '')
})

describe('500 Error page user flow', () => {
  beforeEach(() => {
    cy.Fetch500Data('GET', 'https://restcountries.eu/rest/v2/all')
    cy.visit('http://localhost:3000')
  });

  it('User should see a header with the App\'s name on page load & an error image', () => {
    cy.get('h1').contains('What In The World')
    cy.get('.error-img').should('be.visible')
  })

  it('User should see a message that displays the type of error', () => {
    cy.get('.error-message').contains('500 ERROR. Could not access server data.')
  })

  it('Should bring the user back to the home page by clicking the Header', () => {
    cy.get('.home-click').click()
    cy.get('h1').contains('What In The World')
    cy.get('.country-dropdown')
      .should('be.visible')
      .should('have.value', '')
  })

  it('Should bring the user back to the home page by clicking the take me home button', () => {
    cy.get('button').click()
    cy.get('h1').contains('What In The World')
    cy.get('.country-dropdown')
      .should('be.visible')
      .should('have.value', '')
  })

});

})
