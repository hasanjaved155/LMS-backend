import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        console.log(name, email, password, confirmPassword)
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!confirmPassword) {
            return res.send({ message: 'Confirm Password is Required' })
        }

        if (password !== confirmPassword) {
            return res.status(401).send({
                success: false,
                message: "Password is not match with Confirm Password"
            })
        }

        //check user
        const existingUser = await userModel.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register pleasr login'
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).send({
            success: true,
            message: 'user Register Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        // Add logic here to fetch the users data from the database
        const users = await userModel.find();

        res.status(200).send({
            success: true,
            message: 'Fetched users successfully',
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching users',
            error
        });
    }
};
