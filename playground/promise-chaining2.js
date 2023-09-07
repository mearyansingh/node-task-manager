require('../src/db/mongoose')
const Task = require('../src/modals/task')

//promise-chaining
// Task.findByIdAndDelete("64e6477d3ee66be6a69fbf93").then((task) => {
//    console.log(task)
//    return Task.countDocuments({ completed: false })

// }).then((result) => {
//    console.log(result)
// }).catch((e) => {
//    console.log(e)
// })

//async-await
const deleteTaskAndCount = async (id) => {

   const task = await Task.findByIdAndDelete(id)
   const count = await Task.countDocuments({ completed: false })
   return count
}

deleteTaskAndCount('64e7290921de4a672521aeb9').then((count) => {
   console.log(count, "count")
}).catch((e) => {
   console.log(e, "e")
})