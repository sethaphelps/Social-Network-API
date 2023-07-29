const { Schema, Types } = require("mongoose");

const formatDate = (theDate) => {
  return theDate.toDateString();
};


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
      toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema({
    reactionID: {
      type:Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date),
    },
  },
  {
      toJSON: {
      virtuals: true,
    },
    id: false,
  })

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = Thought;
