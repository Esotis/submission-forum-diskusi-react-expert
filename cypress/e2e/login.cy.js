describe('Alur Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login form with email, password fields and a submit button', () => {
    cy.get('#login-email').should('be.visible');
    cy.get('#login-password').should('be.visible');
    cy.contains('button', 'Masuk').should('be.visible');
  });

  it('should show an error message and stay on /login when credentials are rejected', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: { status: 'fail', message: 'email atau kata sandi salah' },
    }).as('loginRequest');

    cy.get('#login-email').type('salah@mail.com');
    cy.get('#login-password').type('passwordsalah');
    cy.contains('button', 'Masuk').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/login');
    cy.contains('email atau kata sandi salah').should('be.visible');
  });

  it('should redirect to the homepage and show the user name after a successful login', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: { token: 'fake-access-token' },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'Dimas Saputra',
            email: 'dimas@mail.com',
            avatar: '',
          },
        },
      },
    }).as('profileRequest');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    });
    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    });

    cy.get('#login-email').type('dimas@mail.com');
    cy.get('#login-password').type('passwordbenar');
    cy.contains('button', 'Masuk').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Dimas Saputra').should('be.visible');
  });

  it('should disable the submit button while the login request is in progress', () => {
    cy.intercept('POST', '**/login', (req) => {
      req.reply({
        delay: 500,
        statusCode: 200,
        body: {
          status: 'success',
          message: 'ok',
          data: { token: 'fake-access-token' },
        },
      });
    }).as('slowLoginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: { user: { id: 'user-1', name: 'Dimas Saputra' } },
      },
    });

    cy.get('#login-email').type('dimas@mail.com');
    cy.get('#login-password').type('passwordbenar');
    cy.contains('button', 'Masuk').click();

    cy.contains('button', 'Memproses...').should('be.disabled');
  });
});
