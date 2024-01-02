const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);
const myToken = {
    userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAzNzE1MTY3fQ.wJ39_rjWRzxPQC92uvQcHrH08BbUGxp5Xc30tda2_q4',
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzNjc1MzM2fQ.JRujVMwGP7-L7DgXprIX9sp7yv8pb1fupSvkGiBFIf4'
};

describe('Profiles endpoints (/api/v1/me)', () => {
    it('Should return status 200 and message "Successfully get profile"', async () => {
        const response = await request.get('/api/v1/me')
            .set('Authorization', myToken.userToken);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successfully get profile');
        expect(response.body.data).toBeTruthy();
    });
    it('Should return status 401 and message "Unauthorized"', async () => {
        const response = await request.get('/api/v1/me');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
    it('Should return status 422 and message "Email already exist!" when email inserted is same with other or previous users email', async () => {
        const response = await request.put('/api/v1/me')
            .set('Authorization', myToken.userToken)
            .send({
                username: 'test',
                password: 'test',
                email: 'test@email.com',
            });
        expect(response.status).toBe(422);
        expect(response.body.message).toBe('Email already exist!');
    });
});