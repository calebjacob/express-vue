describe('Home Page', () => {
  it('displays the home page', () => {
    cy.visit('/');
    cy.contains('h1', 'Express Your Vue');
  });
});
