import { Router } from 'express';
import Submission from '../models/submission';
import { serverSideRender } from '../controllers/embed.controller';
import { get404Sketch } from '../views/404Page';
import { injectPrelude, last } from '../../client/utils/cs111Prelude';

const router = new Router();
router.get('/preview/:submission_id/', (req, res) => {
  Submission.find({ submissionId: req.params.submission_id })
    .sort('-createdAt')
    .exec((err, projects) => {
      if (err || !projects.length) {
        get404Sketch((html) => res.send(html));
        return;
      }
      const files = projects[0].files;
      files.forEach((file) => {
        if (file.fileType === 'file' && last(file.name.split('.')) === 'html') {
          file.content = injectPrelude(file.content);
        }
      });
      serverSideRender(req, res, files);
    });
});
export default router;
