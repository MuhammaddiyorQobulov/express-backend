import User from "./User.js";
import Role from "./Role.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "./config.js";
import fileService from "../UploadImage/fileService.js";
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, config.secret, { expiresIn: "2h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const fileName = req.files ? fileService.saveFile(req.files.avatar) : "";
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, password, confirm, phone } = req.body;
      const condidate = await User.findOne({ username });

      if (condidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (!confirm) {
        return res
          .status(400)
          .json({ message: "Please confirm your password" });
      }
      if (password !== confirm) {
        return res.status(400).json({ message: "Passwords are not equal" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
        avatar: fileName,
        phone,
      });
      const token = generateAccessToken(user._id, user.roles);
      await user.save();
      return res.json({ token });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Wrong password" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, message: "Muvafaqqiyatli kirish" });
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Getusers error" });
    }
  }
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(404).json({ message: "User not found" });
    }
  }
  async CheckIsLogin(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(404).json({ message: "User not found" });
    }
  }
  async UpdateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(404).json({ message: "User not found" });
    }
  }
  async createRole(req, res) {
    try {
      const role = new Role(req.body);
      await role.save();
      res.json(role);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while creating" });
    }
  }
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(404).json({ message: "User not found" });
    }
  }
}

export default new AuthController();
