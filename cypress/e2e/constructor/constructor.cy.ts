import { selectors } from '../../support/selectors';

const { constructorSelector, ingredientsSelector, counterSelector } = selectors;

describe('Добавление ингредиента из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.visit('/');
  });

  it('добавление булки в конструктор', () => {
    cy.get(ingredientsSelector)
      .contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector)
      .contains('Краторная булка N-200i (верх)')
      .should('exist');
    cy.get(constructorSelector)
      .contains('Краторная булка N-200i (низ)')
      .should('exist');

    cy.get(ingredientsSelector)
      .contains('Краторная булка N-200i')
      .parent()
      .find(counterSelector)
      .should('contain', '2');
  });

  it('добавление начинки в конструктор', () => {
    cy.get(ingredientsSelector)
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get(ingredientsSelector)
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find(counterSelector)
      .should('contain', '1');
  });

  it('добавление соуса в конструктор', () => {
    cy.get(ingredientsSelector)
      .contains('Соус Spicy-X')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector).contains('Соус Spicy-X').should('exist');

    cy.get(ingredientsSelector)
      .contains('Соус Spicy-X')
      .parent()
      .find(counterSelector)
      .should('contain', '1');
  });
});
