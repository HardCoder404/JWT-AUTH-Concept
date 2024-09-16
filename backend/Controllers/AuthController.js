const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409).json({ message: "User already exits", success: false });
        }

        const userModel = new UserModel({ name,email,password });
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();                                  // database me ab save hogya

        res.status(201).json({ message: "Signup Successfull", success:true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success:false });
    }
};

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(403).json({ message: "User not found", success: false });
        }

        // check password match or not:
        const isPassword = await bcrypt.compare(password, user.password);  // inside compare: first parameter client se aya hua password hai, and second parameter database ka password hai uss user ka

        if(!isPassword){
            return res.status(403).json({ message: "Wrong Password", success: false });
        }

        // Generate JwtToken: It takes three parameter as shown how : 
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({ message: "Login Successfull", success:true, jwtToken, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success:false });
    }
};




module.exports = {
    signup,
    login
}