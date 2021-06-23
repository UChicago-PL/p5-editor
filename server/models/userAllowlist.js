import mongoose from 'mongoose';

const { Schema } = mongoose;

const userAllowlistSchema = new Schema(
  {
    github: { type: String },
    type: {
      type: String,
      enum: ['user', 'professor']
    },
    studyParticipant: { type: Boolean },
    edition: {
      type: String
    }
  },
  { timestamps: true, _id: true, usePushEach: true }
);
userAllowlistSchema.index({ github: 1, edition: 1 }, { unique: true });

const UserAllowlist = mongoose.model('UserAllowlist', userAllowlistSchema);

// if (process.env.NODE_ENV === 'development') {
const users = ['mcnuttandrew', 'mcnuttandrew-test', 'brianhempel', 'ravichugh'];

users.forEach((user) => {
  const cb = (e) => {
    // there is a uniqueness constraint on usernames, so no duplicates will be created
    // ignore the uniqueness error
  };
  UserAllowlist.create({ github: user, type: 'user', studyParticipant: true, edition: 'csp21' }, cb);
  UserAllowlist.create({ github: user, type: 'user', studyParticipant: true, edition: 'imm21' }, cb);
});
// }

export default UserAllowlist;
