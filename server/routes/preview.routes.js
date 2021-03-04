import { Router } from 'express';
import Submission from '../models/submission';
import { prepPR } from '../controllers/user.controller';

const router = new Router();

export function getSubmissionForSubmissionId(submissionId) {
  return new Promise((resolve, reject) =>
    Submission.find({ submissionId })
      .sort('-createdAt')
      .exec((err, projects) => {
        if (err || !projects.length) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(projects[0]);
      })
  );
}

function getHtmlFile(files) {
  const index = files.find((file) => file.name.includes('index.html'));
  if (index) {
    return index.content;
  }
  const nonIndexHtml = files.find((file) => file.name.includes('html'));
  return nonIndexHtml.content;
}
function prepRender(files, id) {
  return Object.entries(prepPR({ files }, '', false)).reduce((acc, [fileName, file]) => {
    if (fileName.endsWith('.css')) {
      // example of what were modifying
      // <link rel="stylesheet" type="text/css" href="style.css">
      const re = new RegExp(`href="${fileName}"`, 'g');
      return acc.replace(re, `href="${id}/${fileName}"`);
    } else if (fileName.endsWith('.js')) {
      // example of what were modifying
      // <script src="sketch.js"></script>;
      const re = new RegExp(`src="${fileName}"`, 'g');
      return acc.replace(re, `src="${id}/${fileName}"`);
    }
    return acc;
  }, getHtmlFile(files));
}

router.get('/preview/:submission_id/:file', (req, res) => {
  // TODO add a check to see if project is over a certain age
  getSubmissionForSubmissionId(req.params.submission_id)
    .then((result) => {
      const foundFile = result.files.find((file) => file.name === req.params.file);
      if (!foundFile) {
        res.send(300);
      }
      res.send(foundFile.content);
    })
    .catch((e) => {
      console.log(e);
      res.send(300);
    });
});

router.get('/preview/:submission_id/', (req, res) => {
  getSubmissionForSubmissionId(req.params.submission_id)
    .then((result) => res.send(prepRender(result.files, req.params.submission_id)))
    .catch((e) => {
      console.log(e);
      res.send(300);
    });
});

export default router;
