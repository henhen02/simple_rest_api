import database from "../../database.js";
import jwt from "jsonwebtoken";

export const updateProfile = async (req, res) => {
    const token = req.headers.authorization;
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({
            message: 'All fields must be filled',
            status: res.statusCode,
        });
    }
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
            status: res.statusCode,
        })
    }

    try {
        const { id } = jwt.decode(token, 'secret');

        const [rows] = await database.execute(
            'SELECT id from users WHERE email = ?',
            [email]
        );

        if (rows.length) {
            return res.status(409).json({
                message: "Email already exist!",
                status: res.statusCode,
            })
        }

        await database.execute(
            'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
            [username, password, email, id]
        );

        return res.status(200).json({
            message: 'Successfully update user',
            status: res.statusCode,
            data: {
                id: id,
                username,
                password,
                email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            status: res.statusCode,
        });
    }
}