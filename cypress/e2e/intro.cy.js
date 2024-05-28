describe('App init test', () => {
	it('should visit the initro view and expect START GAME button to show', () => {
		cy.visit('http://localhost:4200');
		cy.contains('START GAME', { timeout: 5500 }).should('be.visible').click();
		cy.url().should('include', '/game');
	});
});