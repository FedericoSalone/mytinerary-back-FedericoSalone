import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res,next) => {
    try {

        const passwordHash = bcrypt.hashSync(req.body.password, 10)

        let body = {...req.body}
        body.password = passwordHash

        const newUser = await User.create(body)

        let {firstName, lastName, email, password } = newUser

        const token = jwt.sign( { firstName, lastName, email, password  }, process.env['SECRET_KEY'], { expiresIn: '1h'})

        return res.status(201).json({
            success: true, 
            response: {firstName, lastName, email, password },
            token: token,
            message: 'Sign up successfully.'
        })

    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const signIn = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email})

        if (!user) {
            throw new Error("There are no users with this email address.")
        }

        let passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password)

        if (!passwordIsCorrect){
            throw new Error("Incorrect email address or password")
        }

        let {firstName, lastName, email, password} = user

        const token = jwt.sign( { firstName, lastName, email, password }, process.env['SECRET_KEY'], { expiresIn: '1h'})

        return res.status(200).json({
            success: true, 
            response: {firstName, lastName, email, password},
            token: token,
            message: 'Sign in successfully.'
        })

    }  catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { firstName, lastName, email, password, photoURL, country } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, error: "User not found" });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.photoURL = photoURL;
        user.country = country;

        if (password) {
            const passwordHash = bcrypt.hashSync(password, 10);
            user.password = passwordHash;
        }

        await user.save();

        return res.status(200).json({ success: true, user: user, message: "User updated successfully" });

    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, error: "User not found" });
        }

        await User.deleteOne({ _id: userId });

        return res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const signInToken = (req, res) => {
    const { firstName, lastName, email, password} = req.user

    res.status(200).json({
        success:true,
        response: {firstName, lastName, email, password},
        message: 'Sign in successfully.',
        body: req.body
    })
    res.status(200).json({ success: true, user: userResponse });
};












