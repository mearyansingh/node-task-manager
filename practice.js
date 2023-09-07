//CRUD->CREATE READ UPDATE DELETE

const { MongoClient, ObjectId } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
const url = 'mongodb+srv://aryansingh143001:mongo2023@cluster0.6b3ejpx.mongodb.net/';
// const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('users');

//   //the following code examples can be pasted here...
//   const insertResult = await collection.insertOne({name:"sham singh",age:24});
//   console.log('Inserted documents =>', insertResult);
//   return 'done.';
// }

// main()
//   .then(console.log,"console.log")
//   .catch(console.error,"console.error")
//   .finally(() => client.close());

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// const id = new ObjectId()
// console.log(id, 'ppp')
// console.log(id.getTimestamp(), 'getTimestamp')

//Create Operation
async function connectAndInsert() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db(dbName); // Get a reference to your database
		const collection = db.collection('users');

		const userToInsert = { name: 'John', age: 30 };
		const result = await collection.insertOne(userToInsert);
		console.log('Document inserted:', result);
	} catch (err) {
		console.error('Error connecting to MongoDB or inserting document:', err);
	} finally {
		client.close();
	}
}

connectAndInsert();


// Read Operation
async function connectAndRead() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db(dbName); // Get a reference to your database
		const collection = db.collection("users");

		// const result = await collection.findOne({ _id: new ObjectId("64e4c505f23945681538b862") });
		// const result = await collection.find({ age: 24 }).toArray();

		// Returns an integer for the number of documents that match the query of the collection
		const result = await collection.countDocuments({ age: 24 });

		// Returns the count of all documents in a collection
		// const result = await collection.estimatedDocumentCount({ age: 24 });

		console.log('Fetched data:', result);
	} catch (err) {
		console.error('Unable to fetch:', err);
	} finally {
		client.close();
	}
}
connectAndRead();

//-------Update Operation------//
async function connectAndUpdate() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db(dbName); // Get a reference to your database
		const collection = db.collection("tasks");

		// const updatedResult = await collection.updateOne({ _id: new ObjectId("64e4c505f23945681538b862") }, {
		// 	// $set: { name: "Mike" }
		// 	//increament operation
		// 	// $inc: { age: 1 }
		// });

		const updatedManyResult = await collection.updateMany({ completed: false }, {
			$set: { completed: true }
			//increament operation
			// $inc: { age: 1 }
		});
		console.log('Fetched data id:', updatedManyResult);

	} catch (err) {
		console.error('Unable to fetch:', err);
	} finally {
		client.close();
	}
}
connectAndUpdate();


//-------Delete Operation------//
async function connectAndDelete() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db(dbName); // Get a reference to your database
		const collection = db.collection("users");

		// const updatedResult = await collection.updateOne({ _id: new ObjectId("64e4c505f23945681538b862") }, {
		// 	// $set: { name: "Mike" }
		// 	//increament operation
		// 	// $inc: { age: 1 }
		// });

		const deleteManyResult = await collection.deleteMany({ age: 24 });
		console.log('Fetched data id:', deleteManyResult);

	} catch (err) {
		console.error('Unable to fetch:', err);
	} finally {
		client.close();
	}
}
connectAndDelete();