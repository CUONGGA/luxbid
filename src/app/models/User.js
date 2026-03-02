const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
  type: String,
  unique: true
},
  name: String,
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: String,
  facebookId: {
  type: String,
  unique: true,
  sparse: true,
  default: undefined
},
  avatar: String,
  provider: {
    type: String,
    default: 'local'
  },
  role: {
    type: String,
    default: 'user'
  }
}, { timestamps: true });

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);