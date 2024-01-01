const { getBoooks, getBook, createBook, updateBook, deleteBook, } = require('../controllers/bookController');
const jwtVerify = require('../middleware/jwtVerify');
const isAdmin = require('../middleware/isAdmin');
const { Router } = require('express');

const bookRoutes = Router();

bookRoutes.get('/', jwtVerify,getBoooks);
bookRoutes.get('/:id', jwtVerify, getBook);
bookRoutes.post('/', isAdmin, createBook);
bookRoutes.put('/:id', isAdmin, updateBook);
bookRoutes.delete('/:id', isAdmin, deleteBook);

module.exports = bookRoutes;