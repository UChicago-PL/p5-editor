import mongoose from 'mongoose';

import { fileSchema } from './project';

const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    files: { type: [fileSchema] },
    username: { type: String },
    project: { type: String },
    submissionId: { type: String },
    projectName: { type: String, ref: 'Project' },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' }
  },
  { timestamps: true, _id: true, usePushEach: true }
);

export default mongoose.model('Submission', submissionSchema);
