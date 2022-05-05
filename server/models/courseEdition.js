import mongoose from 'mongoose';
const { Schema } = mongoose;

const editionSchema = new Schema(
  {
    name: { type: String, unique: true },
    simplePassword: { type: String },
    repoName: { type: String },
    classroomInvite: { type: String },
    accessAllowed: { type: Boolean }
  },
  { usePushEach: true }
);

const EditionModel = mongoose.model('CourseEdition', editionSchema);

export default EditionModel;
