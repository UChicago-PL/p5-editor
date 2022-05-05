import mongoose from 'mongoose';
const { Schema } = mongoose;

const editionSchema = new Schema(
  {
    name: { type: String, unique: true },
    simplePassword: { type: String },
    repoName: { type: String },
    classroomInvite: { type: String }
  },
  { usePushEach: true }
);

const EditionModel = mongoose.model('CourseEdition', editionSchema);

EditionModel.create(
  {
    name: 'wi22',
    simplePassword: 'xxxx',
    repoName: 'creative-coding-wi22',
    classroomInvite: 'https://classroom.github.com/a/duQh2yvt'
  },
  () => {
    // there is a uniqueness constraint on usernames, so no duplicates will be created
    // ignore the uniqueness error
  }
);

export default EditionModel;
