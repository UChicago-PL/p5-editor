import { parseArgs } from 'node:util';
import mongoose from 'mongoose';
import { exit } from 'node:process';

const { values } = parseArgs({
  options: {
    name: { type: 'string' },
    password: { type: 'string' },
    'repo-name': { type: 'string' },
  }
});

if(!(values.name && values.password && values['repo-name'])) {
  console.log("Missing arguments (need --name, --password, and --repo-name)");
  exit(1);
}

await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
await mongoose.connection.collection('courseeditions').insertOne({
  name: values.name,
  simplePassword: values.password,
  repoName: values['repo-name'],
  classroomInvite: "none",
  accessAllowed: true
});
await mongoose.disconnect();
