import { validationResult } from "express-validator";
import Order from "./Order.js";
import OrderStatus from "./OrderStatus.js";
import UserCart from "../UserCart/UserCart.js";
class OrderController {
  async createOrder(req, res) {
    const { phone, comment, address } = req.body;
    const { id: userId } = req.user;

    const errors = validationResult(req);
    const cart = await UserCart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Create order error", errors });
    }
    try {
      const order = new Order({
        userId,
        phone,
        comment,
        address,
        products: cart.products,
        total: cart.total,
      });
      await order.save();
      await UserCart.findOneAndDelete({ userId });
      res.json(order);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while creating" });
    }
  }
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while getting" });
    }
  }
  async updateOrder(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body);
      res.json(order);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while updating" });
    }
  }
  async createStatus(req, res) {
    try {
      const status = new OrderStatus(req.body);
      await status.save();
      res.json(status);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while creating status" });
    }
  }
  async getAllStatus(req, res) {
    try {
      const statuses = await OrderStatus.find();
      res.json(statuses);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: "Error while getting statuses" });
    }
  }
  async getUserOrders(req, res) {
    try {
      const id = req.user.id;
      const orders = await Order.find({ userId: id });
      res.json(orders);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while getting" });
    }
  }
}

export default new OrderController();
