const database = require('../../database');

const createUser = async (req, res) => {
    const { username, password, email, role_id } = req.body;

    try {

        if (!username || !password || !email) {
            return res.status(400).json({
                message: 'All fields must be filled',
                status: res.statusCode,
            });
        }

        const [rows] = await database.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (rows.length) {
            return res.status(400).json({
                message: 'Email already exists',
                status: res.statusCode,
            });
        }

        const [result] = await database.execute(
            'INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)',
            [username, password, email, role_id || 2]
        );

        return res.status(201).json({
            message: 'User has been created',
            status: res.statusCode,
            data: {
                id: result.insertId,
                username,
                email,
                password,
                role_id: role_id || 2,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const [rows] = await database.execute(
            'SELECT id, username, email, password, role_id, created_at, updated_at FROM users'
        );

        return res.status(200).json({
            message: 'Successfully get all users',
            status: res.statusCode,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await database.execute(
            'SELECT id, username, email, password, role_id, created_at, updated_at FROM users WHERE id = ?',
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                message: 'User not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'Successfully get user',
            status: res.statusCode,
            data: rows[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await database.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({
                message: 'User not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'Successfully delete user',
            status: res.statusCode,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, role_id } = req.body;

    try {
        if (!username || !password || !email || !role_id) {
            return res.status(400).json({
                message: 'All fields must be filled',
                status: res.statusCode,
            });
        }

        const [rows] = await database.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({
                message: 'User not found',
                status: res.statusCode,
            });
        }

        await database.execute(
            'UPDATE users SET username = ?, password = ?, email = ?, role_id = ? WHERE id = ?',
            [username, password, email, role_id, id]
        );

        return res.status(200).json({
            message: 'Successfully update user',
            status: res.statusCode,
            data: {
                id,
                username,
                password,
                email,
                role_id,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
};