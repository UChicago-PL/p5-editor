import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import isAuthenticated from '../utils/isAuthenticated';

const router = new Router();

router.post('/submit-gh-repo', UserController.submitGHRepo);
router.get('/gh-repos', UserController.getGHRepos);
router.put('/preferences', isAuthenticated, UserController.updatePreferences);
router.put('/account', isAuthenticated, UserController.updateSettings);
router.delete('/auth/github', UserController.unlinkGithub);

export default router;
