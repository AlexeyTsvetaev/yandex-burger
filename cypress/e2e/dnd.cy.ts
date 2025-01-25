describe('Drag and Drop Burger Ingredient', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000/');
	});
	// Ждём 500 мс для корректной обработки DnD

	it('should drag and drop an ingredients into the constructor', () => {
		cy.wait(500);
		cy.get('[data-testid="bun-top"]').should('not.exist');
		cy.get('[data-testid="bun-bottom"]').should('not.exist');
		// Найти ингредиент по data-test-id
		cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').trigger('dragstart', {
			force: true,
		});
		cy.get('[data-testid="constructor-burger"]').trigger('drop', {
			force: true,
		});
		// Ждём 500 мс для корректной обработки DnD
		cy.wait(500);
		// Проверяем, что булка добавилась в конструктор
		cy.get('[data-testid="bun-top"]').should('exist');
		cy.get('[data-testid="bun-bottom"]').should('exist');

		//2 раза филе добавляю
		cy.get('[data-testid="643d69a5c3f7b9001cfa093e"]').trigger('dragstart', {
			force: true,
		});
		cy.get('[data-testid="constructor-burger"]').trigger('drop', {
			force: true,
		});
		cy.get('[data-testid="643d69a5c3f7b9001cfa093e"]').trigger('dragstart', {
			force: true,
		});
		cy.get('[data-testid="constructor-burger"]').trigger('drop', {
			force: true,
		});
		cy.get('[data-testid="constructor-burger"]')
			.find('[data-testid="643d69a5c3f7b9001cfa093e"]')
			.should('have.length', 2);
	});
});
