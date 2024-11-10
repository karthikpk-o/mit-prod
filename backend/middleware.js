import { jwtVerify } from "jose";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        // Verify the token using `jose`
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );

        // Check if payload contains the expected UserID
        if (payload.UserID) {
            req.user = payload;
            return next();
        } else {
            return res.status(403).json({});
        }
    } catch (err) {
        return res.status(403).json({});
    }
};

export default authMiddleware;
