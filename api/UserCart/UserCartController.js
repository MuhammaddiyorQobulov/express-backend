import Products from "../Products/Products.js";
import UserCart from "./UserCart.js";

class UserCartController {
  async getCart(req, res) {
    const userId = req.user.id;
    const cart = await UserCart.findOne({ userId });
    res.json(cart);
  }
  
  async addToCart(req, res) {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const totalCost = (products) => {
      let total = 0;
      products.forEach((i) => {
        total += i.price * i.quantity;
      });
      return total;
    };

    const cart = await UserCart.findOne({ userId });
    const product = await Products.findById(productId);
    if (!cart) {
      const userCart = new UserCart({
        userId,
        products: [
          {
            product,
            quantity,
          },
        ],
        total: product.price * quantity,
      });
      await userCart.save();
      return res.json(userCart);
    }

    const index = cart.products.findIndex((i) => i._id == productId);
    if (index == -1) {
      cart.products.push({
        quantity,
        _id: product._id,
        price: product.price,
        title: product.title,
        imgUrl: product.imgUrl,
        description: product.description,
        type: product.type,
        date: Date.now(),
      });
    } else {
      cart.products[index].quantity = quantity;
    }
    cart.total = totalCost(cart.products);
    await cart.save();
    res.json(cart);
  }

  async removeFromCart(req, res) {
    const userId = req.user.id;
    const { productId } = req.body;
    const cart = await UserCart.findOne({ userId });
    const { price, quantity } = cart.products.find((i) => i._id == productId);

    const updatedCart = await UserCart.findOneAndUpdate(
      { userId },
      {
        $pull: { products: { _id: productId } },
        $inc: { total: -price * quantity },
      }
    );
    res.json(updatedCart);
  }
}
export default new UserCartController();
