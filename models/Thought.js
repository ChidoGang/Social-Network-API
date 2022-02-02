const {Schema,model,Types} = require("mongoose");
const formatDate = require("../utils/formatDate");

const ReactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: [true, "Enter reaction!"],
          maxLength: 280
      },
      username: {
          type: String,
          required: [true, "Please enter username !"]
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => formatDate(createdAtVal)
      }
  },
  {
      toJSON: {
          getters: true
      }
  }
);

const ThoughtSchema = new Schema(
  {
      thoughtText: {
          type: String,
          required: [true, "Enter thoughts !"],
          minLength: 1,
          maxLength: 280
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => formatDate(createdAtVal)
      },
      username: {
          type: String,
          required: [true, "Please enter the username!"]
      },
      reactions: [ReactionSchema]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
  }
)

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;