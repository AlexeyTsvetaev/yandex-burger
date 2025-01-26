import { LOCALHOST_URL } from '../../src/constants/api';
import {
	modalOverlay,
	modalCloseIcon,
	bunIngredientSelector,
	ingredientRoute,
} from '../../src/constants/cypres-constants';
describe('Open ingredient modal', () => {
	beforeEach(() => {
		cy.visit(LOCALHOST_URL);
	});
	it('should open modal ingredient and click on overlay and close icon', () => {
		cy.wait(500);
		cy.get(modalOverlay).should('not.exist');
		cy.get(modalCloseIcon).should('not.exist');
		// Найти ингредиент по data-test-id
		cy.get(bunIngredientSelector).should('exist').click({ force: true });
		cy.wait(500);
		//Проверяю что маршрут сменился
		cy.url().should('include', ingredientRoute);
		//Проверяю что описание ингредиентов появились в DOM
		cy.get('[data-testid="ingredient-image"]').should('exist');
		cy.get('[data-testid="ingredient-name"]').should('exist');
		cy.get('[data-testid="ingredient-calories"]').should('exist');
		cy.get('[data-testid="ingredient-proteins"]').should('exist');
		cy.get('[data-testid="ingredient-fat"]').should('exist');
		cy.get('[data-testid="ingredient-carbohydrates"]').should('exist');
		//Ищу оверлей и кликаю по нему
		cy.get(modalOverlay).should('exist').click({ force: true });
		cy.wait(500);
		//Проверяю что после закрытия модалки маршрут сменился
		cy.url().should('not.include', ingredientRoute);
		//Проверяю что из DOM пропали созданные модалкой элементы
		cy.get(modalOverlay).should('not.exist');
		cy.get(modalCloseIcon).should('not.exist');
		// Отркываю модалку ингредиента
		cy.get(bunIngredientSelector).should('exist').click({ force: true });
		cy.wait(500);
		//Проверяю что описание ингредиентов появились в DOM
		cy.get('[data-testid="ingredient-image"]').should('exist');
		cy.get('[data-testid="ingredient-name"]').should('exist');
		cy.get('[data-testid="ingredient-calories"]').should('exist');
		cy.get('[data-testid="ingredient-proteins"]').should('exist');
		cy.get('[data-testid="ingredient-fat"]').should('exist');
		cy.get('[data-testid="ingredient-carbohydrates"]').should('exist');
		//Проверяю что сменился маршрут
		cy.url().should('include', ingredientRoute);
		//Ищу иконку закрытия в модалке и кликаю по ней
		cy.get(modalCloseIcon).should('exist').click({ force: true });
		cy.wait(500);
		//Проверяю что маршрут сменился
		cy.url().should('not.include', ingredientRoute);
		//Проверяю что из DOM пропали созданные модалкой элементы
		cy.get(modalOverlay).should('not.exist');
		cy.get(modalCloseIcon).should('not.exist');
	});
});
