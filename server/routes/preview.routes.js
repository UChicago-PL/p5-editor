import { Router } from 'express';
import Submission from '../models/submission';
import { serverSideRender } from '../controllers/embed.controller';
import { get404Sketch } from '../views/404Page';

const router = new Router();
router.get('/preview/:submission_id/', (req, res) => {
  Submission.find({ submissionId: req.params.submission_id })
    .sort('-createdAt')
    .exec((err, projects) => {
      if (err || !projects.length) {
        get404Sketch((html) => res.send(html));
        return;
      }
      serverSideRender(req, res, projects[0].files);
    });
});
export default router;
