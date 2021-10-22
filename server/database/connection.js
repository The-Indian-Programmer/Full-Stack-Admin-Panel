const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    //    / / mongo connection
    const con = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDb connected ${(await con).connection.host}`);
  } catch (err) {
    console.log(`Failed to connect to the database ${err}`);
    process.exit(1);
  }
};

module.exports = connectDb;
