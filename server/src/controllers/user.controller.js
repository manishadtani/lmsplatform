import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name){
        return res.status(400).json({message:"name is required"})
    }
    if(!email){
        return res.status(400).json({message:"email is required"})
    }
    if(!password){
        return res.status(400).json({message:"password is required"})
    }
    // 1. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
     
    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Send response (excluding password)
    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userData
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email){
        return res.status(400).json({message:"email is required"})
    }
    if(!password){
        return res.status(400).json({message:"password is required"})
    }
      // 1. Check if user exists
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      // 2. Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      // 3. Generate JWT
      generateToken(res,user,"welcome back "+user.name)
  
      // 4. Exclude password from response
      const { password: _, ...userData } = user._doc;
  
      // 5. Send response with token
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: userData
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };