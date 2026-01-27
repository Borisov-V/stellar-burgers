describe('Добавление ингредиента из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
  });

  it('добавление булки в конструктор', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i (низ)')
      .should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .parent()
      .find('[class*="counter"]')
      .should('contain', '2');
  });

  it('добавление начинки в конструктор', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('[class*="counter"]')
      .should('contain', '1');
  });

  it('добавление соуса в конструктор', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Соус Spicy-X')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Соус Spicy-X')
      .parent()
      .find('[class*="counter"]')
      .should('contain', '1');
  });
});
