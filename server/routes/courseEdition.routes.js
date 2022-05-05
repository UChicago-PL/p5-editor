import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';

import UserAllowList from '../models/userAllowlist';
import CourseEdition from '../models/courseEdition';

export function editionSignUp(req, res) {
  if (!req.user || !req.user.github || !req.user.githubToken) {
    res.status(404).json({ success: false, message: 'You must be logged in to complete this action.' });
    return;
  }
  const edition = req.body['edition-selection'];
  const password = req.body['edition-password'];
  const github = req.user.github;
  if (!edition || !password) {
    res.status(300).json({ success: false, message: 'Incomplete request' });
    return;
  }
  CourseEdition.findOne({ name: edition, simplePassword: password })
    .then((edition) => {
      if (!edition) {
        res.status(300).json({ success: false, message: 'Wrong password / edition combination' });
        return;
      }
      return UserAllowList.findOne({ github }).then((allowListItem) => {
        if (!allowListItem) {
          UserAllowList.create({
            github,
            type: 'user',
            studyParticipant: false,
            edition: edition.name,
            authState: 'authed'
          });
          res.status(200).json({ success: true });
          return;
        }
        if (allowListItem.authState === 'banned') {
          res.status(300).json({ success: false, message: 'You do now have access to this course' });
          return;
        }
        allowListItem.authState = 'authed';
        allowListItem.save().then(() => res.status(200).json({ success: true }));
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(300).json({ success: false, message: 'Err. Wrong password / edition combination' });
    });
}

export function getEditions(req, res) {
  CourseEdition.find({})
    .then((results) => {
      const editions = results.map((x) => x.name);
      res.status(200).json({ success: true, content: editions });
    })
    .catch(() => {
      res.status(500).json({ success: false, message: 'Service Error' });
    });
}

const router = new Router();

router.post('/edition-signup', isAuthenticated, editionSignUp);
router.get('/get-editions', isAuthenticated, getEditions);

export default router;
