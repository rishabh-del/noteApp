var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    mobile: {

      type: Number
    },
    verified: {
      type: Boolean,
      default: false,
    },
    authyId: String,
    emailID: {
      type: String,
      unique: true
    },
    password: {

      type: String
    },
    role: {
      type: String
    },
    userId: {
      type: String,
      unique: true
    },

  },
  { collection: 'userdata' },
);

const User = mongoose.model('User', UserSchema);
module.exports = { User };

