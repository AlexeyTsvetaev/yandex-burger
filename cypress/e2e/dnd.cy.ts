import { LOCALHOST_URL } from '../../src/constants/api';
import {
	constructorBurger,
	meatIngredient,
	bunIngredientSelector,
} from '../../src/constants/cypres-constants';
describe('Drag and Drop Burger Ingredient', () => {
	beforeEach(() => {
		cy.visit(LOCALHOST_URL);
	});
	// Ждём 500 мс для корректной обработки DnD

	it('should drag and drop an ingredients into the constructor', () => {
		cy.wait(500);
		cy.get('[data-testid="bun-top"]').should('not.exist');
		cy.get('[data-testid="bun-bottom"]').should('not.exist');
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
		cy.get('[data-testid="bun-top"]').should('exist');
		cy.get('[data-testid="bun-bottom"]').should('exist');

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
