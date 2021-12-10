import { Router } from 'express';
import Submission from '../models/submission';

const router = new Router();

export function getSubmissionForUser(username) {
  return new Promise((resolve, reject) => {
    Submission.aggregate([
      { $match: { username } },
      { $lookup: { from: 'assignments', localField: 'assignment', foreignField: '_id', as: 'assign' } }
    ]).exec((err, submissions) => {
      if (err || !submissions.length) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(submissions);
    });
  });
}

router.get('/get-all-submissions', (req, res) => {
  if (!req.user || !req.user.github || !req.user.githubToken || !req.user.username) {
    res.status(404).json({ success: false, message: 'You must be logged in to complete this action.' });
    return;
  }

  getSubmissionForUser(req.user.username).then((result) => {
    res.json(
      (Array.isArray(result) ? result : [result]).map((sub) => ({
        username: sub.username,
        project: sub.project,
        submissionId: sub.submissionId,
        projectName: sub.projectName,
        assignment: sub.assignment,
        prNumber: sub.prNumber,
        assign: sub.assign,
        createdAt: sub.createdAt
      }))
    );
  });
});

export default router;
