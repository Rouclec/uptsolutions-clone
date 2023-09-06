import { Schema, models, model } from "mongoose";
import { isEmail } from "validator";
import { hash, compare } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide a valid email yea?"],
            unique: true,
            lowercase: true,
            validate: [isEmail, "Please provide a valid email"],
        },
        fullName: {
            type: String,
            required: [true, "Please enter your name"],
        },
        role: {
            type: Schema.ObjectId,
            ref: "Role",
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8,
            select: false, //do not select password for every user query
        },
        profileImage: {
            type: String
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords do not match!!",
            },
        },
        lastLogin: {
            type: Date,
            default: Date.now(),
        },
        active: {
            type: Boolean,
            default: true,
            select: false
        },
        resetToken: String,
        resetTokenExpiration: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

userSchema.plugin(uniqueValidator, {
    message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema

//virtualPopulate
userSchema.pre(/^find/, function (next) {
    this.populate({
        path: "role",
        select: "code -_id",
    });
    next();
});

//Pre method runs before a user object is 'saved'
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); //if the password has not been modified, go to the next middleware
    this.password = await hash(this.password, 12); //encrypt the password with a strength of 12
    this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = randomBytes(32).toString("hex"); //genrates a random 32 characters hexadecimal string

    this.resetToken = createHash("sha256") //create a sha256 hash with the randomly genrated string above
        .update(resetToken)
        .digest("hex");

    this.resetTokenExpiration = Date.now() + 10 * 60 * 1000; //set reset token expiration to 10 minutes from now

    return resetToken;
};



export default models ? models.User || model('User', userSchema) : model('User', userSchema)