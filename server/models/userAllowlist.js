import mongoose from 'mongoose';

const { Schema } = mongoose;

const userAllowlistSchema = new Schema(
  {
    github: { type: String, unique: true },
    type: {
      type: String,
      enum: ['user', 'professor']
    },
    studyParticipant: { type: Boolean }
  },
  { timestamps: true, _id: true, usePushEach: true }
);

export default mongoose.model('UserAllowlist', userAllowlistSchema);
