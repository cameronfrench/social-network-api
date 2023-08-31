const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, 
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
