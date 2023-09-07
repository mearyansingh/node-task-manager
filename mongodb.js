//CRUD->CREATE READ UPDATE DELETE

const { MongoClient, ObjectId } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
const url = 'mongodb+srv://aryansingh143001:mongo2023@cluster0.6b3ejpx.mongodb.net/';
// const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// const id = new ObjectId()
// console.log(id, 'ppp')
// console.log(id.getTimestamp(), 'getTimestamp')

//-------Create Operation------//
// async function connectAndInsert() {
// 	try {
// 		await client.connect();
// 		console.log('Connected to MongoDB');

// 		const db = client.db(dbName); // Get a reference to your database
// 		const collection = db.collection('tasks');

// 		const tasksToInsert = [
// 			{ desc: 'Clean the house', completed: true },
// 			{ desc: 'Renew inspection', completed: true },
// 			{ desc: 'Test the code', completed: false }
// 		];
// 		// const result = await collection.insertOne(userToInsert);
// 		const result = await collection.insertMany(tasksToInsert);
// 		console.log('Document inserted:', result);
// 	} catch (err) {
// 		console.error('Error connecting to MongoDB or inserting document:', err);
// 	} finally {
// 		client.close();
// 	}
// }

// connectAndInsert();


//---------- Read Operation-------//
// async function connectAndRead() {
// 	try {
// 		await client.connect();
// 		console.log('Connected to MongoDB');

// 		const db = client.db(dbName); // Get a reference to your database
// 		const collection = db.collection("tasks");

// 		const lastTaskId = await collection.findOne({ _id: new ObjectId("64e51d38cf62626a624152db") });
// 		const uncompletedTasks = await collection.find({ completed: false }).toArray();

// 		console.log('Fetched data id:', lastTaskId);
// 		console.log('Fetched data:', uncompletedTasks);


// 	} catch (err) {
// 		console.error('Unable to fetch:', err);
// 	} finally {
// 		client.close();
// 	}
// }
// connectAndRead();

//-------Update Operation------//
// async function connectAndUpdate() {
// 	try {
// 		await client.connect();
// 		console.log('Connected to MongoDB');

// 		const db = client.db(dbName); // Get a reference to your database
// 		const collection = db.collection("tasks");

// 		// const updatedResult = await collection.updateOne({ _id: new ObjectId("64e4c505f23945681538b862") }, {
// 		// 	// $set: { name: "Mike" }
// 		// 	//increament operation
// 		// 	// $inc: { age: 1 }
// 		// });

// 		const updatedManyResult = await collection.updateMany({ completed: false }, {
// 			$set: { completed: true }
// 			//increament operation
// 			// $inc: { age: 1 }
// 		});
// 		console.log('Fetched data id:', updatedManyResult);

// 	} catch (err) {
// 		console.error('Unable to fetch:', err);
// 	} finally {
// 		client.close();
// 	}
// }
// connectAndUpdate();

//-------Delete Operation------//
async function connectAndDelete() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db(dbName); // Get a reference to your database
		const collection = db.collection("tasks");

		const deleteManyResult = await collection.deleteOne({ desc: "Renew inspection" });
		console.log('Fetched data id:', deleteManyResult);

	} catch (err) {
		console.error('Unable to fetch:', err);
	} finally {
		client.close();
	}
}
connectAndDelete();
