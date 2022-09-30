import User from "../modoles/user";
import dotenv from "dotenv";
dotenv.config();
const jwt = require('jsonwebtoken');

export const signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Đăng ký thất bại",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json(user);
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Email của bạn không hợp lệ. Vui lòng đăng ký !",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email và Password của bạn không đúng",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const {
      _id,
      name,
      avatar,
      email,
      role,
      phone,
      loginWeb,
      loginApp,
      avatarRestaurant,
      nameRestaurant,
    } = user;
    return res.json({
      token,
      user: {
        _id,
        avatar,
        email,
        name,
        role,
        phone,
        loginWeb,
        loginApp,
        avatarRestaurant,
        nameRestaurant,
      },
    });
  });
};