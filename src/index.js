const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT;

// Express Middleware
// app.use((req, res, next) => {
//    if (req.method === 'GET') {
//       res.send("GET request are disabled")
//    } else {
//       next()
//    }
//    next()
// })

//Middleware for maintenance 
// app.use((req, res, next) => {
//    res.status(503).send("site is currently down.Check back soon!")
// })


// Middleware to parse JSON requests
app.use(express.json()) // for parsing application/json
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

//Hashing example
// var bcrypt = require('bcryptjs');

// const myFunction = async () => {
//    const password = 'aryan143001@#'
//    const hashedPassword = await bcrypt.hash(password, 8)
//    console.log(password)
//    console.log(hashedPassword)

//    const isMatch = await bcrypt.compare('Aryan143001@#', hashedPassword)
//    console.log(isMatch)


// }

// myFunction()

//JWT example
// var jwt = require('jsonwebtoken');

// const myFunction = () => {
//    const token = jwt.sign({ _id: "abc123" }, process.env.JWT_SECRET, { expiresIn: "7 days" })
//    console.log(token, "token")

//    const data = jwt.verify(token, process.env.JWT_SECRET)
//    console.log(data, "data")
// }

// myFunction()

const Task = require("./models/task")
const User = require("./models/user")


const main = async () => {
   // const task = await Task.findById("64f563b86c3c2a552f0c5321")
   // await task.populate('owner')
   // console.log(task.owner)

   const user = await User.findById("64f56343c2b23753df0308f1")
   await user.populate('tasks')
   console.log(user.tasks)
}

// main()