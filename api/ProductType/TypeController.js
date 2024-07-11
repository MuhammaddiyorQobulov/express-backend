import Type from "./Type.js";

class TypeController {
  async getTypes(req, res) {
    try {
      const types = await Type.find();
      res.json(types);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while getting" });
    }
  }

  async createType(req, res) {
    try {
      const type = new Type(req.body);
      await type.save();
      res.json(type);
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Error while creating" });
    }
  }
}

export default new TypeController();