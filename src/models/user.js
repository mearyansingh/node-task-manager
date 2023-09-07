const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      unique: true,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error("Email is invallid")
         }
      }
   },
   age: {
      type: Number,
      default: 0,
      //cusom validation
      validate(value) {
         if (value < 0) {
            throw new Error("Age must be a positive number")
         }
      }
   },
   password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
         if (value.toLowerCase().includes("password")) {
            throw new Error('Password cannot contain "password"')
         }
      }
   },
   tokens: [{
      token: {
         type: String,
         required: true
      }
   }],
   avatar: {
      type: Buffer
   }
}, {
   timestamps: true
})

// Create a virtual property
userSchema.virtual('tasks', { ref: 'Task', localField: "_id", foreignField: "owner" });

userSchema.methods.toJSON = function () {
   const user = this
   const userObject = user.toObject()
   //Deleat password and tokens
   delete userObject.password
   delete userObject.tokens
   delete userObject.avatar

   return userObject
}

// Generate a JWT token
userSchema.methods.generateAuthToken = async function () {
   const user = this;
   const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
   user.tokens = user.tokens.concat({ token });
   await user.save();
   return token;
}

// Function to find a user by their email and password
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });

   if (!user) {
      throw new Error('User not found');
   }

   // Compare the provided password with the stored hash
   const isPasswordMatch = await bcrypt.compare(password, user.password);

   if (!isPasswordMatch) {
      throw new Error('Invalid password');
   }
   return user;
}

// Middleware to hashing the password before saving (Hash the plain text password before saving)
userSchema.pre('save', async function (next) {
   const user = this;

   // console.log(user)
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }
   next();
});

// Middleware to delete associated tasks when a user is removed
userSchema.pre('deleteOne', async function (next) {
   const user = this;
   await Task.deleteMany({ owner: user._conditions._id });
   next();
});

const User = mongoose.model("User", userSchema)

module.exports = User