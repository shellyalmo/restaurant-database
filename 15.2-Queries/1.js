import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const client = await MongoClient.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const coll = client.db("test").collection("restaurants");

console.log(
  "1.1 Write a MongoDB query to display all the documents in the restaurant collection",
  await coll.find({}).toArray()
);

console.log(
  "1.2 - Write a MongoDB query to display all restaurants that have a specific cuisine",
  await coll
    .find({
      cuisine: "pizza",
    })
    .toArray()
);

console.log(
  "1.3 - Write a MongoDb query that displays only kosher restaurants",
  await coll
    .find({
      kosher: true,
    })
    .toArray()
);

console.log(
  "1.4 - Write a MongoDb query that displays only specific cities restaurants",
  await coll.find({ "address.city": "Tel Aviv" }).toArray()
);

console.log(
  "1.5 - Write a MongoDb query to display a specific restaurants address",
  await coll
    .find(
      {
        name: "pizza makpizza",
      },
      {
        projection: {
          address: 1,
        },
      }
    )
    .toArray()
);

console.log(
  "1.6 - Write a MongoDB query to display specific restaurants coordinates",
  await coll
    .find(
      {
        name: "pizza makpizza",
      },
      {
        projection: {
          "address.coordinates": 1,
        },
      }
    )
    .toArray()
);

console.log(
  "1.7. - Write a MongoDB query that should display all restaurants in ascending order by restaurant name",
  await coll
    .find(
      {},
      {
        sort: { name: 1 },
      }
    )
    .toArray()
);

console.log(
  "1.8 - Write a MongoDB query that should display all restaurants in ascending order by city names.",
  await coll
    .find(
      {},
      {
        sort: { "address.city": 1 },
      }
    )
    .toArray()
);

console.log(
  "1.9 - Update a specific restaurant's name",
  await coll.findOneAndUpdate(
    { name: "yoffi toffi" },
    { $set: { name: "toffi yoffi" } }
  )
);
console.log(await coll.findOne({ name: "toffi yoffi" }));
await coll.findOneAndUpdate(
  { name: "toffi yoffi" },
  { $set: { name: "yoffi toffi" } }
);

// not sure how to add an _id during set
console.log(
  "1.10 - Update a specific restaurant by adding a new review.",
  await coll.findOneAndUpdate(
    { name: "yoffi toffi" },
    { $addToSet: { reviews: { score: 2, date: new Date() } } }
  )
);
console.log(await coll.findOne({ name: "yoffi toffi" }));

// finish

await client.close();
