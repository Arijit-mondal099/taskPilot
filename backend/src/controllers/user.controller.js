import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { generateToken } from "../utils/genToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate token and set cookie
        generateToken({ id: newUser._id }, res);

        return res.status(201).json({ success: true, message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error("Register user error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        // Generate token and set cookie
        generateToken({ id: user._id }, res);

        return res.status(200).json({ success: true, message: "User logged in successfully", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login user error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const logoutUser = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout user error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Get current user error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }   
}

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user._id;

        if (!name || !email || !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Valid name and email are required!" });
        }

        const isExist = await User.findOne({ email, _id: { $ne: userId } });
        if (isExist) {
            return res.status(400).json({ success: false, message: "Email is already in use" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        return res.status(200).json({ success: true, message: "User updated successfully", user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Update user error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Current and new passwords are required!" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "New password must be at least 6 characters long!" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
