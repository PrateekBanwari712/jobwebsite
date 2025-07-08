import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        console.log(fullName, email, phoneNumber, password, role)
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing ",
                success: false
            });
        };

        const file = req.file;
        console.log(file)
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "user already exist with this email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {

                profilePhoto: cloudResponse.secure_url,
                
            },
        })
        return res.status(201).json
            ({
                message: "Account created successfully",
                success: true,
            });
    } catch (error) {
        console.log(error);
        
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(email, password, role)
        if (!email || !password || !role) {
            res.status(400).json({
                message: "Something is missing ",
                success: false,
            });
        };


        let user = await User.findOne({ email });
        if (!email) {
            res.status(400).json({
                message: "Incorrect Email ",
                success: false,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password ",
                success: false,
            })
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        };
        const tokenDate = {
            userId: user._id
        }
        const token = await jwt.sign(tokenDate, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })

    }
    catch (error) {
        console.log(error)
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills, } = req.body;
        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: "data not defined",
                success: false
            })
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: "File not found in request" });
        }


        //cloudinary se file aayegi
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        // console.log(uploadResult);

        let skillsArray = [];
        if (typeof skills === "string") {
            skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; //saves cloudinary url
            user.profile.resumeOriginalName = file.originalname; //save the original file name
        }

        await user.save();
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}