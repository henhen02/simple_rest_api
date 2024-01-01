const jwt = require('jsonwebtoken');
const database = require('../../database');

const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
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
            [username, password, email, 2]
        );

        return res.status(201).json({
            message: 'User has been created',
            status: res.statusCode,
            data: {
                id: result.insertId,
                username,
                email,
                password,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await database.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        
        if (!rows.length) {
            return res.status(400).json({
                message: 'Invalid email or password',
                status: res.statusCode,
            });
        }

        const { id, username, role_id } = rows[0];

        const token = jwt.sign({id: id}, 'secret', { algorithm: 'HS256' });

        await database.execute(
            'UPDATE users SET token = ? WHERE id = ?',
            [token, id]
        );

        return res.status(200).json({
            message: 'User logged in',
            status: res.statusCode,
            data: {
                id,
                username,
                email,
                role_id,
                token,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
};

const logout = async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(400).json({
                message: 'Token not found',
                status: res.statusCode,
            });
        }

        const decode = jwt.decode(token, 'secret');

        const [result] = await database.execute(
            'UPDATE users SET token = ? WHERE id = ? AND token = ?',
            [null, decode.id, token]
        )

        if (!result.affectedRows) {
            return res.status(400).json({
                message: 'Token not found',
                status: res.statusCode,
            });
        }

        return res.status(200).json({
            message: 'User logged out',
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

module.exports = {
    register,
    login,
    logout,
};