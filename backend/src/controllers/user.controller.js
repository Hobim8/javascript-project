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

export {
    registerUser
};  