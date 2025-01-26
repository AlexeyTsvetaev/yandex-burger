import { LOCALHOST_URL } from '../../src/constants/api';
import {
	meatIngredient,
	modalOverlay,
	orderDetailsModal,
	constructorBurger,
	modalCloseIcon,
	bunIngredientSelector,
	bunTop,
	bunBottom,
	ingredientRoute,
} from '../../src/constants/cypres-constants';
describe('Open order modal', () => {
	beforeEach(() => {
		cy.visit(LOCALHOST_URL);
		//имитирую состояние авторизированного пользователя
		cy.window().then((win) => {
			win.localStorage.setItem('ref', 'test-token-123');
		});
	});
	it('should open order modal and click on overlay and close icon', () => {
		cy.wait(500);
		cy.get(modalOverlay).should('not.exist');
		cy.get(modalCloseIcon).should('not.exist');
		cy.get(orderDetailsModal).should('not.exist');
		// Найти ингредиент по data-test-id
		cy.get(bunIngredientSelector).trigger('dragstart', {
			force: true,
		});
		cy.get(constructorBurger).trigger('drop', {
			force: true,
		});
		// Ждём 500 мс для корректной обработки DnD
		cy.wait(500);
		// Проверяем, что булка добавилась в конструктор
		cy.get(bunTop).should('exist');
		cy.get(bunBottom).should('exist');

		//2 раза филе добавляю
		cy.get(meatIngredient).trigger('dragstart', {
			force: true,
		});
		cy.get(constructorBurger).trigger('drop', {
			force: true,
		});
		cy.get(meatIngredient).trigger('dragstart', {
			force: true,
		});
		cy.get(constructorBurger).trigger('drop', {
			force: true,
		});
		//проверил количество в конструкторе филешек
		cy.get(constructorBurger).find(meatIngredient).should('have.length', 2);
		//Кликаю по кнопке оформить заказ
		cy.get('[data-testid="order-button"]').should('exist').click();
		//проверяю что появилась модалка с оверлеем и элемент с номером заказа
		cy.get(modalOverlay).should('exist');
		cy.get(orderDetailsModal).should('exist');
		cy.get('[data-testid="number-order"]').should('exist');
		//Кликаю по иконке закрытия модалки
		cy.get(modalCloseIcon).should('exist').click({ force: true });
		//Проверяю что все что связано с модалкой исчезло из DOM
		cy.get(modalOverlay).should('not.exist');
		cy.get(orderDetailsModal).should('not.exist');
		cy.get('[data-testid="number-order"]').should('not.exist');
	});
});
