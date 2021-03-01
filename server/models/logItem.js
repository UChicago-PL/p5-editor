import mongoose from 'mongoose';

// Register Project model as it's referenced by logItem
import { fileSchema } from './project';

const { Schema } = mongoose;

const projectSnapshotSchema = new Schema(
  {
    // Project._id is a String for some reason
    project: { type: String, ref: 'Project' },
    files: { type: [fileSchema] },
  },
  { timestamps: true, _id: true, usePushEach: true },
);

const logItemSchema = new Schema(
  {
    logType: {
      type: String,
      enum: ['snapshot', 'run-auto', 'run-manual', 'tidy', 'submission']
    },
    userAgent: {
      type: String
    },
    createdAt: {
      type: Number
    },
    projectSnapshot: { type: projectSnapshotSchema }
  },
  { timestamps: false, _id: true, usePushEach: true }
);

export default mongoose.model('LogItem', logItemSchema);
