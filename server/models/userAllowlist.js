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

const UserAllowlist = mongoose.model('UserAllowlist', userAllowlistSchema);

if (process.env.NODE_ENV === 'development') {
  const users = ['mcnuttandrew', 'mcnuttandrew-test', 'outkine', 'ravichugh'];

  users.forEach((user) => {
    UserAllowlist.create({ github: user, type: 'user', studyParticipant: true }, (e) => {
      // there is a uniqueness constraint on usernames, so no duplicates will be created
      // ignore the uniqueness error
    });
  });
}

export default UserAllowlist;
