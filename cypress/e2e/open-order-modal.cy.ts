describe('Open order modal', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8000/');
		//имитирую состояние авторизированного пользователя
		cy.window().then((win) => {
			win.localStorage.setItem('ref', 'test-token-123');
		});
	});
	it('should open order modal and click on overlay and close icon', () => {
		cy.wait(500);
		cy.get('[data-testid="modal-overlay"]').should('not.exist');
		cy.get('[data-testid="modal-close-icon"]').should('not.exist');
		cy.get('[data-testid="order-details-modal"]').should('not.exist');
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
		//проверил количество в конструкторе филешек
		cy.get('[data-testid="constructor-burger"]')
			.find('[data-testid="643d69a5c3f7b9001cfa093e"]')
			.should('have.length', 2);
		//Кликаю по кнопке оформить заказ
		cy.get('[data-testid="order-button"]').should('exist').click();
		//проверяю что появилась модалка с оверлеем и элемент с номером заказа
		cy.get('[data-testid="modal-overlay"]').should('exist');
		cy.get('[data-testid="order-details-modal"]').should('exist');
		cy.get('[data-testid="number-order"]').should('exist');
		//Кликаю по иконке закрытия модалки
		cy.get('[data-testid="modal-close-icon"]')
			.should('exist')
			.click({ force: true });
		//Проверяю что все что связано с модалкой исчезло из DOM
		cy.get('[data-testid="modal-overlay"]').should('not.exist');
		cy.get('[data-testid="order-details-modal"]').should('not.exist');
		cy.get('[data-testid="number-order"]').should('not.exist');
	});
});
