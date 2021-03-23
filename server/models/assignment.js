import mongoose from 'mongoose';

const { Schema } = mongoose;

const assignmentSchema = new Schema(
  {
    humanReadableName: { type: String },
    urlName: { type: String, unique: true },
    released: { type: Boolean },
    dueDate: { type: Date },
    assignmentLink: { type: String },
    assignmentType: {
      type: String,
      enum: ['homework', 'exercise', 'project']
    }
  },
  { timestamps: true, _id: true, usePushEach: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

if (process.env.NODE_ENV === 'development') {
  const assignments = [
    {
      humanReadableName: 'An Example Assignment for development purposes',
      urlName: 'example-assignment',
      released: false,
      dueDate: new Date('April 1 2100'),
      assignmentType: 'homework'
    }
  ];

  assignments.forEach((assignment) => {
    Assignment.create(assignment, (e) => {
      if (e) {
        console.log('assignment creation error', assignment);
      }
    });
  });
}

export default Assignment;
