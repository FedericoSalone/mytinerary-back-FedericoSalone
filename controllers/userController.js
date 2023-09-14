import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userInDB = await User.findOne({ email });

        if (userInDB) {
            return res.json({ success: false, error: "The email is already registered" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        const userResponse = {
            email: newUser.email,
            image: newUser.image,
            name: newUser.name,
            _id: newUser._id,
        };

        const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({ success: true, user: userResponse, token: token });

    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInDB = await User.findOne({ email });

        if (!userInDB) {
            return res.json({ success: false, error: "Incorrect email or password" });
        }

        const validPassword = bcrypt.compareSync(password, userInDB.password);

        if (!validPassword) {
            return res.json({ success: false, error: "Incorrect email or password" });
        }

        const userResponse = {
            email: userInDB.email,
            image: userInDB.image,
            name: userInDB.name,
            _id: userInDB._id,
        };

        const token = jwt.sign({ email: userInDB.email }, process.env.SECRET_KEY);

        return res.status(200).json({ success: true, user: userResponse, token: token });

    } catch (error) {
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
    const userResponse = {
        email: req.user.email,
        image: req.user.image,
        name: req.user.name,
        _id: req.user._id,
    };
    res.status(200).json({ success: true, user: userResponse });
};












