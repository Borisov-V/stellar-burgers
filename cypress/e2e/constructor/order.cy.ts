import orderResponse from '../../fixtures/order.json';
import { selectors } from '../../support/selectors';

const { modalSelector, ingredientsSelector, constructorSelector } = selectors;
const orderNumber = orderResponse.order.number;

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Создание заказа и получение ответа от сервера', () => {
    cy.get(ingredientsSelector)
      .contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector)
      .contains('Краторная булка N-200i (верх)')
      .should('exist');

    cy.get(ingredientsSelector)
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get(ingredientsSelector)
      .contains('Соус Spicy-X')
      .parent()
      .find('button')
      .click();

    cy.get(constructorSelector).contains('Соус Spicy-X').should('exist');

    cy.get(constructorSelector).contains('Оформить заказ').click();

    cy.get(modalSelector).should('exist');
    cy.get(modalSelector).contains(orderNumber).should('exist');

    cy.get(modalSelector).find('button').click();
    cy.get(modalSelector).should('not.exist');

    cy.get(constructorSelector).contains('Выберите булки').should('exist');
    cy.get(constructorSelector).contains('Выберите начинку').should('exist');
  });
});
