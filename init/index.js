const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path=require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    return initDB();
  })
  .then(() => {
    console.log("data was initialized");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.disconnect();
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

async function initDB() {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({
    ...obj,
   owner:"66ec24b514c092ac77d3da46" ,
  }));
  await Listing.insertMany(initData.data);
}