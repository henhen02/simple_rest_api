import jwt from 'jsonwebtoken';
import database from '../../database.js';

const jwtVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: res.statusCode,
        });
    }

    try {

        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    status: res.statusCode,
                });
            }

            const [user] = await database.execute(
                'SELECT id FROM users WHERE id = ?',
                [decoded.id]
            );

            if (!user.length) {
                return res.status(400).json({
                    message: 'User not found',
                    status: res.statusCode,
                });
            }

            next();
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}

export default jwtVerify;