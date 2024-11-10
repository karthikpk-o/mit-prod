import config from "./config.js";
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Ensure the secret is in the correct format for jose

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        // Use jwtVerify from jose to verify the JWT
        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (payload.UserID) {
            req.user = payload;
            next();
        } else {
            return res.status(403).json({});
        }
    } catch (err) {
        return res.status(403).json({});
    }
};

export default authMiddleware;
