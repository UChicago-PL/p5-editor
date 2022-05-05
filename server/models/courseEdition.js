import mongoose from 'mongoose';
const { Schema } = mongoose;

const editionSchema = new Schema(
  {
    name: { type: String, unique: true },
    simplePassword: { type: String },
    repoName: { type: String }
  },
  { timestamps: true, _id: true, usePushEach: true }
);

const EditionModel = mongoose.model('CourseEdition', editionSchema);

EditionModel.create({ name: 'wi22', simplePassword: 'xxxx', repoName: 'creative-coding-wi22' }, () => {
  // there is a uniqueness constraint on usernames, so no duplicates will be created
  // ignore the uniqueness error
});

export default EditionModel;
