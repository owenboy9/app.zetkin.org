describe('/o/[orgId]/events', () => {

    it('contains name of organization', () => {
        cy.visit('/o/1/events');
        cy.contains('My Organization');
    });

    xit('contains events which are linked to event pages', () => {
        // TODO: Figure out why this fails on GitHub
        cy.visit('/o/1/events');
        cy.get('[data-test="event"]')
            .eq(1)
            .findByText('More info')
            .click();
        cy.url().should('match', /\/o\/1\/events\/22$/);
    });

    xit('contains a placeholder if there are no events', () => {
        // TODO: Figure out why this fails on GitHub
        cy.intercept('GET', /\/api\/orgs\/1\/campaigns\/[0-9]+\/actions$/, { data: [] });

        cy.visit('/o/1/events');
        cy.get('[data-test="no-events-placeholder"]').should('be.visible');
    });

    it.only('shows sign up button if not signed up, and undo button when signed up', () => {
        cy.visit('/login');
        cy.get('input[aria-label="E-mail address"]').type('testadmin@example.com');
        cy.get('input[aria-label="Password"]').type('password');
        cy.get('input[aria-label="Log in"]')
            .click();
        cy.visit('/o/1/events');
        cy.waitUntilReactRendered();
        cy.get('[data-test="event-response-button"]')
            .eq(5)
            .contains('Sign-up')
            .click();
        cy.waitUntilReactRendered();
        cy.get('[data-test="event-response-button"]')
            .eq(5)
            .contains('Undo sign-up');
    });
});

// Hack to flag for typescript as module
export {};
