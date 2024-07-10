import jwt from "jsonwebtoken";
import config from "../api/Auth/config.js";
const authMiddleWaree = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json("No access");
    }
    const decodedData = jwt.verify(token, config.secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(403).json("No access");
  }
};

export default authMiddleWaree;