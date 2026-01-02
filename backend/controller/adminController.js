import db from "../config/dbConnection.js";
import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM admins WHERE email = ? AND `password` = ?";

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Server Error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                status: false,
                message: "Invalid Email or Password"
            });
        }

        const admin = result[0];


        const accessToken = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JSONACCESSTOKEN,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.JSONREFRESHTOKEN,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            status: true,
            message: "Admin Logged In",
            authType: "admin",
            accessToken,
            admin: {
                id: admin.id,
                email: admin.email
            }
        });
    });
};


export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
    });
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({
        status: true,
        message: "Logged out successfully"
    });
};
