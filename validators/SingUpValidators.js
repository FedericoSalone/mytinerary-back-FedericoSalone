import joi from "joi";
import joiPwd from "joi-password-complexity";

const passwordComplexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

export const signUpSchema = joi.object({
    firstName: joi.string().min(2).max(50).required().messages({
        "any.required": "First name is a required field",
        "string.empty": "First name cannot be empty",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name cannot exceed 50 characters",
    }),
    lastName: joi.string().min(2).max(50).required().messages({
        "any.required": "Last name is a required field",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name cannot exceed 50 characters",
    }),
    email: joi.string().email().required().messages({
        "any.required": "Email is a required field",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be in a valid format",
    }),
    password: joiPwd(passwordComplexityOptions).required().messages({
        "any.required": "Password is a required field",
        "string.empty": "Password cannot be empty",
    }),
    photoURL: joi.string(),
    country: joi.string(),
});

const validator = (req, res, next) => {
    const validate = signUpSchema.validate(req.body, { abortEarly: false });

    if (validate.error) {
        return res.json({ success: false, response: validate.error.details, error: true });
    }

    next();
};

export default validator;




