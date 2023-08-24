const { Schema, model } = require('mongoose');

const reactionSchema = Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    ref: 'reaction',
    default: () => new mongoose.Types.ObjectId(), 
  },
  reactionBody: {
    type: String,
    required: true, 
    maxLength: 280, 
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString();
});

// Retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
