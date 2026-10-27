import { parseArgs } from 'node:util';
import mongoose from 'mongoose';
import { exit } from 'node:process';

const { values } = parseArgs({
  options: {
    name: { type: 'string' },
    urlName: { type: 'string' },
    released: { type: 'boolean', default: true },
    dueDate: { type: 'string' },
    assignmentType: { type: 'string', default: "homework" },
    edition: { type: 'string' },
  }
});

if(!(values.name && values.urlName && values.dueDate && values.edition)) {
  console.log("Missing arguments (need --name, --urlName, --dueDate, and --edition)");
  exit(1);
}

// https://stackoverflow.com/a/1353711
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

if(!isValidDate(new Date(values.dueDate))) {
  console.log(`{values.dueDate} is an invalid date.`);
  exit(1);
}

await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
await mongoose.connection.collection('assignments').insertOne({
  humanReadableName: values.name,
  urlName: values.urlName,
  released: values.released,
  dueDate: new Date(values.dueDate),
  assignmentType: values.assignmentType,
  edition: values.edition
});
await mongoose.disconnect();
