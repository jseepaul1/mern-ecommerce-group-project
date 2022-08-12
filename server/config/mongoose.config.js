const mongoose = require("mongoose");
const dbName = "clothingStoreDB";

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to ${dbName}`);
  })
  .catch((err) => {
    console.log("There was an error connecting to MongoDB", err);
  });
