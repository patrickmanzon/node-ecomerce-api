const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required."],
        minlength: 3
    },
    email: {
        type:String,
        required: [true, "Email field is required."],
        unique: true,
        validate: {
            message: "Invalid email format",
            validator: validator.isEmail
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

UserSchema.pre('save', async function () {
    if(this.isModified("password")){
        const passwordSalt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, passwordSalt);
    }
})

UserSchema.methods.verifyPassword = async function(password) {
    const checker = await bcrypt.compare(password, this.password);
    return checker;
}

module.exports = mongoose.model("User", UserSchema);