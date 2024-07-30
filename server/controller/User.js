import UserModel from "../model/User.js"
export const register = async (req, res) => {
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        res.status(404).send({ message: "user already created with this email" });
        return;
      }
      let userInfo = await UserModel.create({
        ...req.body,
        profilePic: req?.file?.filename,
      });
      if (userInfo) res.status(202).send({ message: "user created" });
      res.status(404).send({ message: "something went wrong" });
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  };
  
export const login = async (req, res) => {
    try {
      let user = await UserModel.findOne({
        email: req?.body.email,
        password: req?.body.password
      });
       if (user) res.status(200).send({ id: user._id, role: user.role });
      else res.status(404).send({ message: "wrong username / password" });
    } catch (e) {
      res.status(404).send({ error: e?.message });
    }
  };