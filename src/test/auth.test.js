const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);
let token = '';

describe('Auth endpoints (/api/v1/auth)', () => {
    describe('Register', () => {
        it('Should return status 422 and message "Email already exist" when email inserted is same with other users who has register', async () => {
            const response = await request.post('/api/v1/auth/register')
                .send({
                    username: 'test',
                    password: 'test',
                    email: 'test@email.com',
                });
            expect(response.status).toBe(422);
            expect(response.body.message).toBe('Email already exist');
        });
        it('Should return status 201 and message "Sucessfully register"', async () => {
            const response = await request.post('/api/v1/auth/register')
                .send({
                    username: 'jest testing',
                    password: 'jest testing',
                    email: 'jesttesting@email.com',
                });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Successfully register');
            expect(response.body.data).toBeTruthy();
        });
    });
    describe('Login', () => {
        it('Should return status 400 and message "Invalid email or password" when email or password inserted is wrong', async () => {
            const response = await request.post('/api/v1/auth/login')
                .send({
                    email: 'jesttesting@email.com',
                    password: 'jest',
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid email or password');
        });
        it('Should return status 200 and message "Successfully login"', async () => {
            const response = await request.post('/api/v1/auth/login')
                .send({
                    email: 'jesttesting@email.com',
                    password: 'jest testing',
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully login');
            expect(response.body.data).toBeTruthy();
            token = response.body.data.token;
        });
    });
    describe('Logout', () => {
        it('Should return status 200 and message "Successfully logout"', async () => {
            const response = await request.get('/api/v1/auth/logout')
                .set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully logout');
        });
    });
});