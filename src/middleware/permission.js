import database from "../../database.js";
import jwt from "jsonwebtoken";

const permission = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;

    try {
        jwt.verify(token, "secret", async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                    status: res.statusCode,
                });
            }

            const [result] = await database.execute(
                "SELECT * FROM users WHERE id = ?",
                [decoded.id]
            );
            if (id === undefined) {
                if (result[0].role_id !== 1) {
                    return res.status(401).json({
                        message: "Unauthorized",
                        status: res.statusCode,
                    });
                }
            } else {
                if (result[0].role_id !== 1 || result[0].id !== Number(id)) {
                    return res.status(401).json({
                        message: "Unauthorized",
                        status: res.statusCode,
                    });
                }
            }

            next();
        });
            // jwt.verify(token, "secret", async (err, decoded) => {
            //     if (err) {
            //         return res.status(401).json({
            //             message: "Unauthorized",
            //             status: res.statusCode,
            //         });
            //     }
    
            //     const [result] = await database.execute(
            //         "SELECT * FROM users WHERE id = ?",
            //         [decoded.id]
            //     );
    
            //     if (result[0].role_id !== 1 && result[0].id !== id) {
            //         return res.status(401).json({
            //             message: "Unauthorized",
            //             status: res.statusCode,
            //         });
            //     } else {
            //         next();    
            //     }
            // });


        // jwt.verify(token, "secret", async (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({
        //             message: "Unauthorized",
        //             status: res.statusCode,
        //         });
        //     }
            
        //     const [result] = await database.execute(
        //         "SELECT role_id FROM users WHERE id = ?",
        //         [decoded.id]
        //     );
    
        //     if (result[0].role_id !== 1) {
        //         return res.status(401).json({
        //             message: "Unauthorized",
        //             status: res.statusCode,
        //         });
        //     }
        //     next();
        // });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            status: res.statusCode,
        });
    }
}

export default permission;

// const permission2 = async (req, res, next) => {
//     const token = req.headers.authorization;
//     const { id } = req.params;

//     try {
//         jwt.verify(token, "secret", async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({
//                     message: "Unauthorized",
//                     status: res.statusCode,
//                 });
//             }

//             const [result] = await database.execute(
//                 "SELECT * FROM users WHERE id = ?",
//                 [decoded.id]
//             );

//             if (result[0].role_id !== 1 && result[0].id !== id) {
//                 return res.status(401).json({
//                     message: "Unauthorized",
//                     status: res.statusCode,
//                 });
//             }


//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error",
//             status: res.statusCode,
//         });
//     }
// }