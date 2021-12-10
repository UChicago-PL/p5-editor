import crypto from 'crypto';
import async from 'async';
import { Octokit } from '@octokit/rest';
import { createPullRequest } from 'octokit-plugin-create-pull-request';
import request from 'request';

import Submission from '../models/submission';
import Project from '../models/project';
import User from '../models/user';
import UserAllowlist from '../models/userAllowlist';
import Assignment from '../models/assignment';

export * from './user.controller/apiKey';

export function userResponse(user) {
  return {
    email: user.email,
    username: user.username,
    preferences: user.preferences,
    apiKeys: user.apiKeys,
    verified: user.verified,
    id: user._id,
    totalSize: user.totalSize,
    github: user.github,
    google: user.google
  };
}

const random = (done) => {
  crypto.randomBytes(20, (err, buf) => {
    const token = buf.toString('hex');
    done(err, token);
  });
};

export function findUserByUsername(username, cb) {
  User.findByUsername(username, (err, user) => {
    cb(user);
  });
}

export function updatePreferences(req, res) {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    if (!user) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    const preferences = Object.assign({}, user.preferences, req.body.preferences);
    user.preferences = preferences;

    user.save((saveErr) => {
      if (saveErr) {
        res.status(500).json({ error: saveErr });
        return;
      }

      res.json(user.preferences);
    });
  });
}

export function resetPasswordInitiate(req, res) {
  async.waterfall(
    [
      random,
      (token, done) => {
        User.findByEmail(req.body.email, (err, user) => {
          if (!user) {
            res.json({
              success: true,
              message: 'If the email is registered with the editor, an email has been sent.'
            });
            return;
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save((saveErr) => {
            done(saveErr, token, user);
          });
        });
      },
      (token, user, done) => {
        // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        // const mailOptions = renderResetPassword({
        //   body: {
        //     domain: `${protocol}://${req.headers.host}`,
        //     link: `${protocol}://${req.headers.host}/reset-password/${token}`,
        //   },
        //   to: user.email,
        // });
        // mail.send(mailOptions, done);
      }
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
        return;
      }
      res.json({
        success: true,
        message: 'If the email is registered with the editor, an email has been sent.'
      });
    }
  );
}

export function validateResetPasswordToken(req, res) {
  User.findOne(
    { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
    (err, user) => {
      if (!user) {
        res.status(401).json({ success: false, message: 'Password reset token is invalid or has expired.' });
        return;
      }
      res.json({ success: true });
    }
  );
}

export function emailVerificationInitiate(req, res) {
  async.waterfall([
    random,
    (token, done) => {
      User.findById(req.user.id, (err, user) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
        if (!user) {
          res.status(404).json({ error: 'Document not found' });
          return;
        }

        if (user.verified === User.EmailConfirmation.Verified) {
          res.status(409).json({ error: 'Email already verified' });
          // return;
        }

        // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        // const mailOptions = renderEmailConfirmation({
        //   body: {
        //     domain: `${protocol}://${req.headers.host}`,
        //     link: `${protocol}://${req.headers.host}/verify?t=${token}`,
        //   },
        //   to: user.email,
        // });

        // mail.send(mailOptions, (mailErr, result) => {
        //   // eslint-disable-line no-unused-vars
        //   if (mailErr != null) {
        //     res.status(500).send({ error: 'Error sending mail' });
        //   } else {
        //     const EMAIL_VERIFY_TOKEN_EXPIRY_TIME = Date.now() + 3600000 * 24; // 24 hours
        //     user.verified = User.EmailConfirmation.Resent;
        //     user.verifiedToken = token;
        //     user.verifiedTokenExpires = EMAIL_VERIFY_TOKEN_EXPIRY_TIME; // 24 hours
        //     user.save();

        //     res.json(userResponse(req.user));
        //   }
        // });
      });
    }
  ]);
}

export function verifyEmail(req, res) {
  const token = req.query.t;

  User.findOne({ verifiedToken: token, verifiedTokenExpires: { $gt: new Date() } }, (err, user) => {
    if (!user) {
      res.status(401).json({ success: false, message: 'Token is invalid or has expired.' });
      return;
    }

    user.verified = User.EmailConfirmation.Verified;
    user.verifiedToken = null;
    user.verifiedTokenExpires = null;
    user.save().then((result) => {
      // eslint-disable-line
      res.json({ success: true });
    });
  });
}

export function updatePassword(req, res) {
  User.findOne(
    { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
    (err, user) => {
      if (!user) {
        res.status(401).json({ success: false, message: 'Password reset token is invalid or has expired.' });
        return;
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save((saveErr) => {
        req.logIn(user, (loginErr) => res.json(userResponse(req.user)));
      });
    }
  );

  // eventually send email that the password has been reset
}

export function userExists(username, callback) {
  User.findByUsername(username, (err, user) => (user ? callback(true) : callback(false)));
}

export function saveUser(res, user) {
  user.save((saveErr) => {
    if (saveErr) {
      res.status(500).json({ error: saveErr });
      return;
    }

    res.json(userResponse(user));
  });
}

export function updateSettings(req, res) {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    if (!user) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    user.username = req.body.username;

    if (req.body.currentPassword) {
      user.comparePassword(req.body.currentPassword, (passwordErr, isMatch) => {
        if (passwordErr) throw passwordErr;
        if (!isMatch) {
          res.status(401).json({ error: 'Current password is invalid.' });
          return;
        }
        user.password = req.body.newPassword;
        saveUser(res, user);
      });
    } else if (user.email !== req.body.email) {
      const ONE_DAY = 3600000 * 24; // 24 hours
      const EMAIL_VERIFY_TOKEN_EXPIRY_TIME = Date.now() + ONE_DAY;
      user.verified = User.EmailConfirmation.Sent;

      user.email = req.body.email;

      random((error, token) => {
        user.verifiedToken = token;
        user.verifiedTokenExpires = EMAIL_VERIFY_TOKEN_EXPIRY_TIME;

        saveUser(res, user);

        // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        // const mailOptions = renderEmailConfirmation({
        //   body: {
        //     domain: `${protocol}://${req.headers.host}`,
        //     link: `${protocol}://${req.headers.host}/verify?t=${token}`,
        //   },
        //   to: user.email,
        // });

        // mail.send(mailOptions);
      });
    } else {
      saveUser(res, user);
    }
  });
}

export function unlinkGithub(req, res) {
  if (req.user) {
    req.user.github = undefined;
    req.user.githubToken = undefined;
    saveUser(res, req.user);
    return;
  }
  res.status(404).json({ success: false, message: 'You must be logged in to complete this action.' });
}

export function createSubmission(props) {
  const { files, project, username, submissionId, assignment, prNumber } = props;
  return new Promise((resolve, reject) => {
    Submission.create(
      {
        files,
        username,
        project: project.id,
        projectName: project.name,
        submissionId,
        assignment: assignment._id,
        prNumber
      },
      (err, item) => {
        if (err) {
          console.log('create submission error', item);
          return reject(err);
        }
        resolve();
      }
    );
  });
}

export function getFileContent(id) {
  return new Promise((resolve, reject) => {
    Project.findById(id, (err, project) => {
      if (err || project === null) {
        reject(new Error('Project with that id does not exist.'));
        return;
      }
      resolve(project);
    });
  });
}

const promiseRequest = (url) => {
  return new Promise((resolve, reject) => {
    request({ method: 'GET', url, encoding: null }, (innerErr, response, body) => {
      if (innerErr) {
        return reject(innerErr);
      }
      return resolve(body);
    });
  });
};

/**
 * prepare a PR based on a project
 * returns an object like {[pathToFile]: file}
 * @param {object} data - {file: list of file objects}
 * @param {string} prefix - optional prefix for subfiles
 * @param {boolean} justContent - optional flag indicating if the result should just be content
 */
async function prepPR(data, prefix) {
  console.log(data);
  const files = [];
  for (let idx = 0; idx < data.files.length; idx += 1) {
    const file = data.files[idx];
    if (file.url) {
      // eslint-disable-next-line no-await-in-loop
      const res = await promiseRequest(file.url);
      file.content = res.toString('base64');
      file.fileType = 'asset';
      delete file.url;
    }
    files.push(file);
  }
  const idsToFiles = files.reduce((acc, file) => {
    acc[file.id] = file;
    return acc;
  }, {});
  const childrenIdsToParentsIds = files.reduce((acc, file) => {
    file.children.forEach((childId) => {
      acc[childId] = file.id;
    });
    return acc;
  }, {});

  function getName(id) {
    const thisFile = idsToFiles[id];
    const parentid = childrenIdsToParentsIds[id];
    if (!parentid) {
      return '';
    }
    return `${getName(parentid)}/${thisFile.name}`;
  }
  const idsToNames = Object.keys(idsToFiles).reduce((acc, id) => {
    acc[id] = getName(id).slice(1);
    return acc;
  }, {});

  const namesToFiles = files.reduce((acc, file) => {
    if (file.fileType === 'file') {
      acc[`${prefix || ''}${idsToNames[file.id]}`] = file.content;
    }
    if (file.fileType === 'asset') {
      acc[`${prefix || ''}${idsToNames[file.id]}`] = { content: file.content, encoding: 'base64' };
    }
    return acc;
  }, {});

  return namesToFiles;
}

// TODO replace "repo" with "assignment" throughout
export function submitGHRepo(req, res) {
  if (!req.user || !req.user.github || !req.user.githubToken) {
    res.status(404).json({ success: false, message: 'You must be logged in to complete this action.' });
    return;
  }
  const { repo, project } = req.body;
  if (!repo) {
    res.status(300).json({ success: false, message: 'Incomplete request' });
    return;
  }
  const { urlName, humanReadableName } = repo;
  const { id } = project;
  if (!urlName || !id) {
    res.status(300).json({ success: false, message: 'Incomplete request' });
    return;
  }
  const owner = project.owner && project.owner.username;
  if (!owner) {
    res.status(300).json({ success: false, message: 'Incomplete request - no owner' });
    return;
  }
  UserAllowlist.findOne({ github: req.user.github }).then((allowListItem) => {
    console.log(allowListItem);
    if (!allowListItem) {
      console.log('error on submitting for ', req.user.github);
      return;
    }
    // const { edition } = allowListItem;
    getFileContent(id)
      .then((contents) => prepPR(contents, `${urlName}/`, true).then((preppedPr) => [preppedPr, contents]))
      .then(([preppedPr, contents]) => {
        const omniRepoName = 'creative-coding-wi22';
        const O = Octokit.plugin(createPullRequest);
        const submissionId = `${Math.floor(Math.random() * 1000000000000000000000)}`;
        new O({ auth: req.user.githubToken })
          .createPullRequest({
            owner: 'UChicago-PL',
            repo: `${omniRepoName}-${owner}`,
            title: `Submit ${humanReadableName}`,
            /* eslint max-len: 0 */
            body: `
  This is an automatically generated pull request. It is constitutes the submission of "${humanReadableName}" by ${owner}.
  
  No need to do anything else here, a friendly CS111 staff member will be along to grade it a little while after the deadline has passed. They'll most likely make some comments on your code to help you grow and improve as a programmer. Once they've finished grading it they'll click the "merge" button at the bottom of the page which combine your submission with the "main" branch of your git repo. (If you accidentally hit "merge" it's not a big deal, but you should try to let the staff do it!)
  
  A short while after grading has been completed for this assignment, a new file will be automatically added to this folder containing your grade for this assignment (look for it in the folder for the assignment at, ${urlName}/grade.txt ).  
  
  You can see the a live version of this submission at [this link](https://cmsc-11111-editor.herokuapp.com/preview/${submissionId}).
  You can view the original project at this this [link](https://editor.cs111.org/${owner}/sketches/${id}). 
  `,
            head: `autogenerated-pr-${submissionId}`,
            changes: [{ files: preppedPr, commit: 'creating some files' }]
          })
          .then((result) => {
            console.log('passed', result);
            res.json({ success: true, prURL: result.data.url }).status(200);
            return createSubmission({
              username: owner,
              files: contents.files,
              project,
              submissionId,
              assignment: repo,
              prNumber: result.data.number
            });
          })
          .catch((err) => {
            console.log('pr creation fail', err);
            res.json({ success: false, err: err.message }).status(300);
          });
      });
  });
}

export function getGHRepos(req, res) {
  if (!req.user || !req.user.github || !req.user.githubToken) {
    res.status(404).json({ success: false, message: 'You must be logged in to complete this action.' });
    return;
  }

  UserAllowlist.findOne({ github: req.user.github }).then((user) => {
    Assignment.find({ released: true, edition: user.edition }, (err, assignments) => {
      if (err) {
        console.log(err);
        res.status(300);
      }
      res.status(200).json(assignments);
    });
  });
}
