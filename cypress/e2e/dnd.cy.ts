import { LOCALHOST_URL } from '../../src/constants/api';
import {
	constructorBurger,
	meatIngredient,
	bunIngredientSelector,
	bunTop,
	bunBottom,
} from '../../src/constants/cypres-constants';
describe('Drag and Drop Burger Ingredient', () => {
	beforeEach(() => {
		cy.visit(LOCALHOST_URL);
	});
	// Ждём 500 мс для корректной обработки DnD

	it('should drag and drop an ingredients into the constructor', () => {
		cy.wait(500);
		cy.get(bunTop).should('not.exist');
		cy.get(bunBottom).should('not.exist');
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
		cy.get(constructorBurger).find(meatIngredient).should('have.length', 2);
	});
});
