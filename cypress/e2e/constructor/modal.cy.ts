import { selectors } from '../../support/selectors';

const { modalSelector, ingredientsSelector } = selectors;

describe('Работа модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.visit('/');
  });

  it('Открытие и закрытие модального окна', () => {
    cy.get(ingredientsSelector).contains('Краторная булка N-200i').click();

    cy.contains('Детали ингредиента').should('exist');

    cy.get(modalSelector).should('exist');
    cy.get(modalSelector).contains('Детали ингредиента').should('exist');

    cy.get(modalSelector).contains('Краторная булка N-200i').should('exist');

    cy.get(modalSelector).find('button').click();

    cy.get(modalSelector).should('not.exist');
  });
});
