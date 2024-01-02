const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);
const myToken = {
    userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAzNzE1MTY3fQ.wJ39_rjWRzxPQC92uvQcHrH08BbUGxp5Xc30tda2_q4',
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzNjc1MzM2fQ.JRujVMwGP7-L7DgXprIX9sp7yv8pb1fupSvkGiBFIf4'
};

describe('Users endpoints (/api/v1/users)', () => {
    describe('Get all users', () => {
        it('Should return all users and return status 200 then message "Successfully get all users"', async () => {
            const response = await request.get('/api/v1/users')
                .set('Authorization', myToken.adminToken);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully get all users');
            expect(response.body.data).toBeTruthy();
        });
        it('Should return status 403 and message "Forbidden" when user role accessed', async () => {
            const response = await request.get('/api/v1/users')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden');

        });
    });
    describe('Get user', () => {
        it('Should return user and return status 200 then message "Sucessfully get user"', async () => {
            const response = await request.get('/api/v1/users/1')
                .set('Authorization', myToken.adminToken);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully get user');
            expect(response.body.data).toBeTruthy();
        });
        it('Should return status 404 and message "User not found"', async () => {
            const response = await request.get('/api/v1/users/100')
                .set('Authorization', myToken.adminToken);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User not found');
        });
        it('Should return status 403 and message "Forbidden" when user roles trying to access', async () => {
            const response = await request.get('/api/v1/users/1')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden');
        });
    });
});