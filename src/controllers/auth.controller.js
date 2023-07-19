import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);

  try {
    const passwordhash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordhash,
    });
    console.log(newUser);
    const userSaverd = await newUser.save();

    Jwt.sign({
      id: userSaverd._id,
    },
      "Secrete123", { expiresIn: "1d" }, (err, token) => {
        if (err) cosole.log(err)
      });
      res.cookie('token', token)
    res.json({ message: "User created successfully", })

    
      // res.json({
        //   id: userSaverd._id,
    //   usernmane: userSaverd.username,
    //   email: userSaverd.email,
    //   createdAt: userSaverd.createdAt,
    //   updatedAt: userSaverd.updatedAt
    // });
  } catch (error) {
    console.log(error);
  }
};
export const login = (req, res) => {
  res.send("login");
};
