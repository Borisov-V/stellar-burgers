import orderResponse from '../../fixtures/order.json';
const orderNumber = orderResponse.order.number;

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Создание заказа и получение ответа от сервера', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Соус Spicy-X')
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('exist');

    cy.get('[data-cy=constructor]').contains('Оформить заказ').click();

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains(orderNumber).should('exist');

    cy.get('[data-cy=modal]').find('button').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains('Выберите булки')
      .should('exist');
    cy.get('[data-cy=constructor]')
      .contains('Выберите начинку')
      .should('exist');
  });
});
