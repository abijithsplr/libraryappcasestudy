const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/library');
// mongoose.connect('mongodb+srv://abijith1:abijith1@cluster0.xvsfs.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const currentUserSchema = new Schema({
  username: String,
  password: String,
  role: String
});
var currentUserData = mongoose.model('currentUserData', currentUserSchema);
module.exports = currentUserData;