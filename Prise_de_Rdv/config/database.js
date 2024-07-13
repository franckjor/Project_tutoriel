const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DBCONNECTION}.amxcwso.mongodb.net/Prise_Rdv` )
  .then(() => console.log("connected successfully to server"))
  .catch(err => console.log("error connecting", err));
