const database = require('../../database');

const getBoooks = async (req, res) => {
    try {
        const [rows] = await database.execute(
            'SELECT id, title, author, description, image FROM books'
        );

        res.status(200).json({
            message: 'Successfully get all books',
            status: res.statusCode,
            books: rows,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await database.execute(
            'SELECT id, title, author, description, image FROM books WHERE id = ?',
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                message: 'Book not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'Successfully get book',
            status: res.statusCode,
            data: rows[0],
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const createBook = async (req, res) => {
    const { title, author, description, image } = req.body;

    try {

        if (!title || !author || !description || !image) {
            return res.status(400).json({
                message: 'All fields are required',
                status: res.statusCode,
            });
        }

        const [rows] = await database.execute(
            'INSERT INTO books (title, author, description, image) VALUES (?, ?, ?, ?)',
            [title, author, description, image]
        );

        return res.status(201).json({
            message: 'Book created successfully',
            status: res.statusCode,
            data: {
                id: rows.insertId,
                title,
                author,
                description,
                image,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, image } = req.body;

    try {

        if (!id) {
            return res.status(400).json({
                message: 'ID is required',
                status: res.statusCode,
            });
        }

        if (!title || !author || !description || !image) {
            return res.status(400).json({
                message: 'All fields are required',
                status: res.statusCode,
            });
        }

        const [rows] = await database.execute(
            'UPDATE books SET title = ?, author = ?, description = ?, image = ? WHERE id = ?',
            [title, author, description, image, id]
        );

        if (!rows.affectedRows) {
            return res.status(404).json({
                message: 'Book not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            status: res.statusCode,
            data: {
                id,
                title,
                author,
                description,
                image,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            return res.status(400).json({
                message: 'ID is required',
                status: res.statusCode,
            });
        }

        const [rows] = await database.execute(
            'DELETE FROM books WHERE id = ?',
            [id]
        );

        if (!rows.affectedRows) {
            return res.status(404).json({
                message: 'Book not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'Book deleted successfully',
            status: res.statusCode,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

module.exports = {
    getBoooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};