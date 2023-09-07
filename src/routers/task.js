//Task router file
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

//POST REQUEST
//Create task
router.post('/tasks', auth, async (req, res) => {
	const task = new Task({ ...req.body, owner: req.user._id })

	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error);
	}
})

// GET REQUEST
//Get /tasks?completed=true
//Get /tasks?limit=10&skip=20
//Get /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {

	const match = {}
	const sort = {}

	if (req.query.completed) {
		match.completed = req.query.completed === "true"
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(":")
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1//1 for ascending -1 for descending
	}

	try {
		// const task = await Task.find({ owner: req.user._id })
		await req.user.populate({
			path: "tasks",
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			},
		})
		res.send(req.user.tasks)


		//second way
		// await req.user.populate("tasks")
		// res.send(req.user.tasks)
	} catch (error) {
		res.status(500).res.send(error)
	}
	// Task.find({}).then((task) => {
	//    res.send(task)
	// }).catch((error) => {
	//    res.status(500).res.send(error)
	// })
})

//GET SINGLE TASK
//Getting single the tasks(Debug)
router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id

	try {
		// const task = await Task.findById(_id)
		const task = await Task.findOne({ _id, owner: req.user._id })

		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (error) {
		res.status(500).send()
	}
})

//UPDATE TASK
//Debug->404
router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ["description", "completed"]
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" })
	}

	try {
		//new
		// const task = await User.findById(req.params.id)
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

		//old
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

		if (!task) {
			return res.status(404).send()
		}

		updates.forEach((update) => task[update] = req.body[update])
		await task.save()

		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})

//DELETE TASK
router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
		if (!task) {
			res.status(404).send()
		}
		res.send(task)
	} catch (error) {
		res.status(400).send()
	}
})

module.exports = router