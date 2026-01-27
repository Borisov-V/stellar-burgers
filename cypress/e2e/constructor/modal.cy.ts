describe('Работа модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
  });

  it('Открытие и закрытие модального окна', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .click();

    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains('Детали ингредиента').should('exist');

    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy=modal]').find('button').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });
});
