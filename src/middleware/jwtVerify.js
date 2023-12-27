import jwt from 'jsonwebtoken';
import database from '../../database.js';

const jwtVerify = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
                status: res.statusCode,
            });
        }

        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    status: res.statusCode,
                });
            }

            const [result] = await database.execute(
                'SELECT token FROM users WHERE id = ?',
                [decoded.id]
            );
            
            if (result[0].token !== token) {
                return res.status(401).json({
                    message: 'Unauthorized',
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