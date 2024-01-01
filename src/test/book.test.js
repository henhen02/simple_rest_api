const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);
const myToken = {
    userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzAzNzE1MTY3fQ.wJ39_rjWRzxPQC92uvQcHrH08BbUGxp5Xc30tda2_q4',
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzNjc1MzM2fQ.JRujVMwGP7-L7DgXprIX9sp7yv8pb1fupSvkGiBFIf4'
};

describe('Books endpoints (/api/v1/books)', () => {
    describe('Get all books', () => {
        it('Should return all books and return status 200 then message "Successfully get all books"', async () => {
            const response = await request.get('/api/v1/books')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully get all books');
            expect(response.body.books).toBeTruthy();
            
        });
    });
    describe('Get book by id', () => {
        it('Should return a book and return status 200 then message "Successfully get book"', async () => {
            const response = await request.get('/api/v1/books/1')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully get book');
            expect(response.body.data).toBeTruthy();
        });
        it('Should return status 404 and message "Book not found"', async () => {
            const response = await request.get('/api/v1/books/100')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found');
        });
    });
    describe('Create book', () => {
        it('Should return status 201 and message "Book created successfully"', async () => {
            const response = await request.post('/api/v1/books')
                .set('Authorization', myToken.adminToken)
                .send({
                    title: 'Test Book',
                    author: 'Test Author',
                    description: 'Test Description',
                    image: 'Test Image',
                });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Book created successfully');
            expect(response.body.data).toBeTruthy();
        });
        it('Should return status 400 and message "All fields are required"', async () => {
            const response = await request.post('/api/v1/books')
                .set('Authorization', myToken.adminToken)
                .send({
                    title: '',
                    author: '',
                    description: '',
                    image: '',
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('All fields are required');
        });
        it('Should return status 403 and message "Forbidden" if user roles created new book', async () => {
            const response = await request.post('/api/v1/books')
                .set('Authorization', myToken.userToken)
                .send({
                    title: 'Test Book',
                    author: 'Test Author',
                    description: 'Test Description',
                    image: 'Test Image',
                });
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden');
        });
    });
    describe('Update book', () => {
        it('Should return status 200 and message "Successfully update book"', async () => {
            const response = await request.put('/api/v1/books/8')
                .set('Authorization', myToken.adminToken)
                .send({
                    title: 'Test Book Updated',
                    author: 'Test Author Updated',
                    description: 'Test Description Updated',
                    image: 'Test Image Updated',
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Book updated successfully');
            expect(response.body.data).toBeTruthy();
        });
        it('Should return status 400 and message "All fields are required"', async () => {
            const response = await request.put('/api/v1/books/8')
                .set('Authorization', myToken.adminToken)
                .send({
                    title: '',
                    author: '',
                    description: '',
                    image: '',
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('All fields are required');
        });
        it('Should return status 403 and message "Forbidden" if user roles update book', async () => {
            const response = await request.put('/api/v1/books/8')
                .set('Authorization', myToken.userToken)
                .send({
                    title: 'Test Book Updated',
                    author: 'Test Author Updated',
                    description: 'Test Description Updated',
                    image: 'Test Image Updated',
                });
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden');
        });
    });
    describe('Delete book', () => {
        it('Should return status 200 and message "Successfully delete book"', async () => {
            const response = await request.delete('/api/v1/books/8')
                .set('Authorization', myToken.adminToken);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Book deleted successfully');
        });
        it('Should return 404 and message book not found if id not found', async () => {
            const response = await request.delete('/api/v1/books/100')
                .set('Authorization', myToken.adminToken);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Book not found');
        });
        it('Should return status 403 and message "Forbidden" if user roles delete book', async () => {
            const response = await request.delete('/api/v1/books/8')
                .set('Authorization', myToken.userToken);
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Forbidden');
        });
    });
});