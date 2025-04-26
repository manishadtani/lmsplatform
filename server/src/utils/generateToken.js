import jwt from "jsonwebtoken";
import config from "../config/config";

export const generateToken = (req, user, message) => {
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d", // token valid for 7 days
        }
    );


    return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 }).json({
        success: true,
        message,
        token,
    })
}