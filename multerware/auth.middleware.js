import jwt from "jsonwebtoken";
import User from "../model/auth.model.js";



export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Authorization token is required"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.userID);

    if (!user) {
      return res.status(401).json({
        msg: "User not found"
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("Auth middleware error:", err.message);

    return res.status(401).json({
      msg: "Invalid or expired token"
    });
  }
};