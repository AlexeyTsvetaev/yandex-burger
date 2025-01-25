describe('Open ingredient modal', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000/');
	});
	it('should open modal ingredient and click on overlay and close icon', () => {
		cy.wait(500);
		cy.get('[data-testid="modal-overlay"]').should('not.exist');
		cy.get('[data-testid="modal-close-icon"]').should('not.exist');
		// Найти ингредиент по data-test-id
		cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
			.should('exist')
			.click({ force: true });
		cy.wait(500);
		//Проверяю что маршрут сменился
		cy.url().should('include', '/643d69a5c3f7b9001cfa093c');
		//Проверяю что описание ингредиентов появились в DOM
		cy.get('[data-testid="ingredient-image"]').should('exist');
		cy.get('[data-testid="ingredient-name"]').should('exist');
		cy.get('[data-testid="ingredient-calories"]').should('exist');
		cy.get('[data-testid="ingredient-proteins"]').should('exist');
		cy.get('[data-testid="ingredient-fat"]').should('exist');
		cy.get('[data-testid="ingredient-carbohydrates"]').should('exist');
		//Ищу оверлей и кликаю по нему
		cy.get('[data-testid="modal-overlay"]')
			.should('exist')
			.click({ force: true });
		cy.wait(500);
		//Проверяю что после закрытия модалки маршрут сменился
		cy.url().should('not.include', '/643d69a5c3f7b9001cfa093c');
		//Проверяю что из DOM пропали созданные модалкой элементы
		cy.get('[data-testid="modal-overlay"]').should('not.exist');
		cy.get('[data-testid="modal-close-icon"]').should('not.exist');
		// Отркываю модалку ингредиента
		cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
			.should('exist')
			.click({ force: true });
		cy.wait(500);
		//Проверяю что описание ингредиентов появились в DOM
		cy.get('[data-testid="ingredient-image"]').should('exist');
		cy.get('[data-testid="ingredient-name"]').should('exist');
		cy.get('[data-testid="ingredient-calories"]').should('exist');
		cy.get('[data-testid="ingredient-proteins"]').should('exist');
		cy.get('[data-testid="ingredient-fat"]').should('exist');
		cy.get('[data-testid="ingredient-carbohydrates"]').should('exist');
		//Проверяю что сменился маршрут
		cy.url().should('include', '/643d69a5c3f7b9001cfa093c');
		//Ищу иконку закрытия в модалке и кликаю по ней
		cy.get('[data-testid="modal-close-icon"]')
			.should('exist')
			.click({ force: true });
		cy.wait(500);
		//Проверяю что маршрут сменился
		cy.url().should('not.include', '/643d69a5c3f7b9001cfa093c');
		//Проверяю что из DOM пропали созданные модалкой элементы
		cy.get('[data-testid="modal-overlay"]').should('not.exist');
		cy.get('[data-testid="modal-close-icon"]').should('not.exist');
	});
});
