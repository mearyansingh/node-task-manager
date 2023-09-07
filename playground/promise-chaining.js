require('../src/db/mongoose')
const User = require('../src/modals/user')

//Chaining example
// User.findByIdAndUpdate('64e646e626bcfdd0734baa7d', { age: 1 }).then((user) => {
//    console.log(user)
//    return User.countDocuments({ age: 1 })
// }).then((result) => {
//    console.log(result)
// }).catch((error) => {
//    console.log(error)
// })

//async/await example
const updateAgeAndCount = async (id, age) => {
   const user = await User.findByIdAndUpdate(id, { age })
   const count = await User.countDocuments({ age })
   return count
}

updateAgeAndCount('64e646e626bcfdd0734baa7d', 2).then((count) => {
   console.log(count, "count")
}).catch((e) => {
   console.log(e, "e")
})