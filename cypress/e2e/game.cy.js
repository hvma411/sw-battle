describe('Game test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4200/game');
	});

	it('expect step name be visible and correct', () => {
		cy.contains('SELECT FIGHT TYPE').should('be.visible');
	});

	it('expect selection cards be visible', () => {
		cy.contains('CHARACTERS').should('be.visible');
		cy.contains('STARSHIPS').should('be.visible');
	});

	it('should select characters card and expect next step selections cards be visible', () => {
		cy.contains('CHARACTERS').should('be.visible').click();
		cy.contains('PLAYERVSPLAYER').should('be.visible');
		cy.contains('PLAYERVSCOMPUTER').should('be.visible');
	});

	it('should select characters card, player vs computer card and expect next step name be visible and correct', () => {
		cy.contains('CHARACTERS').should('be.visible').click();
		cy.contains('PLAYERVSPLAYER').should('be.visible').click();
		cy.contains('SELECT RESOURCES').should('be.visible');
	});

	it('should select luke skywalker resource', () => {
		cy.contains('CHARACTERS').should('be.visible').click();
		cy.contains('PLAYERVSPLAYER').should('be.visible').click();
		cy.contains('Luke Skywalker').should('be.visible').click();
		cy.get('.choice-card--label').contains('Luke Skywalker').should('be.visible')
	});
});