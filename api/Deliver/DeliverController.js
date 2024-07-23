import Order from "../Orders/Order.js";

class DeliverController {
  async getDeliverOrders(req, res) {
    try {
      const { status } = req.query;
      const deliverId = req.user.id;
      if (status == "DELIVERED") {
        const orders = await Order.find({
          deliverId,
        });
        const filteredOrders = orders.filter((order) =>
          ["DELIVERED", "CANCELED", "RETURNED"].includes(order.status)
        );
        return res.json(filteredOrders);
      }
      if (status == "NEW") {
        const orders = await Order.find({
          status,
        });
        return res.json(orders);
      }
      const orders = await Order.find({ deliverId });
      const filteredOrders = orders.filter(
        (order) =>
          !["NEW", "DELIVERED", "CANCELED", "RETURNED"].includes(order.status)
      );
      return res.json(filteredOrders);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while getting" });
    }
  }
  async updateDeliverOrder(req, res) {
    try {
      const deliverId = req.user.id;
      const order = await Order.findByIdAndUpdate(req.params.id, {
        ...req.body,
        deliverId,
      });
      res.json(order);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while updating" });
    }
  }
}

export default new DeliverController();
