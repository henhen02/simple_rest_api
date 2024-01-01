const database = require('../../database');
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            status: res.statusCode,
        });
    }
    try {
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                    status: res.statusCode,
                });
            }

            const [result] = await database.execute(
                'SELECT role_id FROM users WHERE id = ?',
                [decoded.id]
            );

            if (result[0].role_id !== 1) {
                return res.status(403).json({
                    message: "Forbidden",
                    status: res.statusCode,
                });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

module.exports = isAdmin;