
// Migration: auth
// Put your migration logic here
const mongoose = require("mongoose");
  
const authSchema = new mongoose.Schema({
  // Schema fields go here
});

const auth = mongoose.model("auth", authSchema);

module.exports = auth;

