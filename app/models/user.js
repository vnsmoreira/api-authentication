const { Schema, model } = require('mongoose');
const bcript = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcript.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = model('User', UserSchema);

module.exports = User;
