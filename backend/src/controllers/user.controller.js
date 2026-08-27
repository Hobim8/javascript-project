import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation if the user doesn't fill all this register field return error

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        // check if the user exist already in the system 

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }

        //create user 

        const createUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User Registered",
            user: { email: createUser.email, username: createUser.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        //checking if the user already exist 
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "User not found"
        });

        //checking if the password is correct 
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({
            message: "invaild credentials"
        })

        res.status(200).json({
            message: "User Logged in",
            user: {
                email: user.email,
                username: user.username,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }
}




export {
    registerUser,
    loginUser,
    logoutUser
};  