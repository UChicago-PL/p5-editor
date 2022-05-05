import { Router } from 'express';
import Submission from '../models/submission';
import { serverSideRender } from '../controllers/embed.controller';
import { get404Sketch } from '../views/404Page';
import { injectPrelude, last } from '../../client/utils/cs111Prelude';
import { getEditionForGithub } from '../routes/courseEdition.routes';

function allowedToShow(username) {
  return getEditionForGithub(username)
    .then((x) => {
      console.log(x);
      return x?.accessAllowed || false;
    })
    .catch(() => false);
}

const router = new Router();
router.get('/preview/:submission_id/', (req, res) => {
  Submission.find({ submissionId: req.params.submission_id })
    .sort('-createdAt')
    .exec((err, projects) => {
      if (err || !projects.length) {
        get404Sketch((html) => res.send(html));
        return;
      }
      console.log(projects);
      const github = projects[0].username;
      allowedToShow(github)
        .then((x) => {
          if (!x) {
            get404Sketch((html) => res.send(html));
            return;
          }
          // allowedToShow()
          const files = projects[0].files;
          files.forEach((file) => {
            if (file.fileType === 'file' && last(file.name.split('.')) === 'html') {
              file.content = injectPrelude(file.content);
            }
          });
          serverSideRender(req, res, files);
        })
        .catch(() => {
          get404Sketch((html) => res.send(html));
        });
    });
});
export default router;
