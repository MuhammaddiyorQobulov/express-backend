import jwt from "jsonwebtoken";
import config from "../api/Auth/config.js";
const roleMiddleWaree = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json("No access");
      }
      const { roles: userRoles } = jwt.verify(token, config.secret);
      let hasRoles = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRoles = true;
        }
      });
      if (!hasRoles) {
        return res.status(403).json("No access");
      }
      next();
    } catch (e) {
      return res.status(403).json("No access");
    }
  };
};

export default roleMiddleWaree;
