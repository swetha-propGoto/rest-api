const userService = require('../services/userService');
const Boom = require('@hapi/boom');


exports.getAllUsers = async(req,res,next)=>{
   try{
    const users=await userService.getUsers();
    res.status(200).json(users);
   }
   catch(error){
   next(error);
   }
};

exports.createUser = async(req,res,next)=>{
    try{
        const {name, email} = req.body;
        if(!name || !email){
            return res.status(400).json({message:'name and email are required'});
        }
        const newUser = await userService.addUser({name,email});
        
        res.status(201).json(newUser);
    }
    catch(error){
        next(error);
    }
}