import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    
    // Find if the user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) return res.status(200).send();
    
    // If user doesn't exist, create a new one
    const newUser = new User(req.body);
    await newUser.save();

    // Send the created user object to the client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
      
    // Find if the user already exists
    const existingUser = await User.findOne({_id : req.userId});
    if (!existingUser) return res.status(500).json({message:"User not found !"});
    
       res.json(existingUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong !" });
  }
};

const updateCurrentUser =async (req: Request, res: Response)=>{
  try{
    
    const {name , addressLine1 , city , country} = req.body;
    const user = await User.findById(req.userId)
     
    if(!user) return res.status(404).json({message : "User not found"})
  
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    
    await user.save();
     res.send(user)
  }catch(error){
    console.log(error)
    res.status(500).json({message: "Error updating user"})
  }
}
export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser
};
