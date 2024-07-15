import Type from "../ProductType/Type.js";
import fileService from "../UploadImage/fileService.js";
import Products from "./Products.js";

class ProductsController {
  async getOne(req, res) {
    const { id } = req.params;
    const product = await Products.findById(id);
    res.json(product);
  }
  async getProducts(req, res) {
    try {
      const { type, title } = req.body;
      const products = await Products.find({
        ...(type && { type }),
        ...(title && { title }),
      });
      res.json(products);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Getproducts error" });
    }
  }

  async createProduct(req, res) {
    try {
      const fileName = fileService.saveFile(req.files.picture);
      const { title, price, description, type } = req.body;
      const FoodType = await Type.findOne({ type });
      if (!FoodType) {
        return res.status(400).json({
          message:
            "Bunday mahsulot turi yoq, mahsulot turini qoshing va qayta urinib ko'ring",
        });
      }
      const product = new Products({
        title,
        price,
        imgUrl: fileName,
        description,
        type: FoodType.type,
      });
      await Products.create(product);
      res.json(product);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while creating" });
    }
  }
  async deleteProduct(req, res) {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
      res.json(product);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while deleting" });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Products.findByIdAndUpdate(id, req.body);
      res.json(product);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while updating" });
    }
  }

  async getOneProduct(req, res) {
    try {
      const { id } = req.body;
      const product = await Products.findById(id);
      res.json(product);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while getting" });
    }
  }
}
export default new ProductsController();
