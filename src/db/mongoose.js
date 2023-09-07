const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, {
	// useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true

}).then(() => console.log('Connected!')).catch((error) => console.error("MongoDB connection failed:", error.message));

// const User = mongoose.model("User", {
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 	},
// 	email: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		lowercase: true,
// 		validate(value) {
// 			if (!validator.isEmail(value)) {
// 				throw new Error("Email is invallid")
// 			}
// 		}
// 	},
// 	age: {
// 		type: Number,
// 		default: 0,
// 		//cusom validation
// 		validate(value) {
// 			if (value < 0) {
// 				throw new Error("Age must be a positive number")
// 			}
// 		}
// 	},
// 	password: {
// 		type: "String",
// 		required: true,
// 		trim: true,
// 		minLength: 7,
// 		validate(value) {
// 			if (value.toLowerCase().includes("password")) {
// 				throw new Error('Password cannot contain "password"')
// 			}
// 		}
// 	}
// })

// const me = new User({
// 	name: "  Andrew  ",
// 	email: " mike@a.com  ",
// 	password: "pass@2023@#"
// })

// me.save().then(() => {
// 	console.log('Document saved:', me);
// }).catch((error) => {
// 	console.error('Error saving document:', error);
// });


// const Task = mongoose.model("Task", {
// 	description: {
// 		type: String,
// 		trim: true,
// 		required: true
// 	},
// 	completed: {
// 		type: Boolean,
// 		default: false
// 	}
// })

// const task = new Task({
// 	description: "Learn the mongoose library",
// 	completed: false
// })

// task.save().then(() => {
// 	console.log('task saved:', task)
// }).catch((error) => {
// 	console.error('Error saving task:', error);
// })