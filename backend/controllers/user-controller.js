import User from "../model/User.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find().populate("blogs");
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {

  try {
      const { name, email, password } = req.body;
   
    const existingUser = await User.findOne({ email: req.body.email });

     //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
 await user.save();

      return res.status(201).send({
      success: true,
      message: "User registered succesfully",
      user,
    });
  } catch (error) {
       console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register Api",
      error,
  })}
}

export const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;

  let existingUser;

    existingUser = await User.findOne({ email });
      const len=password.length;
      
        if (!existingUser) {
      return res.status(201).send({
        success: false,
        message: "User not found",
      });
    }   

      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
      );
          if (!isPasswordCorrect) {
      return res.status(201).send({
        success: false,
        message: "Icorrect password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user:existingUser,
    });

  } catch (error) {
       console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login Api",
      error,
  })
  }
  
};
