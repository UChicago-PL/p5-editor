import passport from 'passport';
import GitLabStrategy from 'passport-gitlab2';

import User from '../models/user';
import UserAllowlist from '../models/userAllowlist';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/*
  Input:
  [
    { value: 'email@example.com' }
  ]

  Output:
    ['email@example.com']
*/
const getEmails = (gitlabEmails) => (gitlabEmails || []).map((item) => item.value).filter(Boolean);

/**
 * Sign in with GitLab.
 */
passport.use(
  new GitLabStrategy(
    {
      clientID: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
      baseURL: process.env.GITLAB_URL,
      callbackURL: '/auth/gitlab/callback',
      passReqToCallback: true,
      // api is for creating merge requests
      scope: ['api']
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ github: profile.username }, (findByGithubErr, existingUser) => {
        if (existingUser) {
          // if after the login, the user exists in the database but with a different email
          // then they have already logged in with a different github account
          if (req.user && req.user.email !== existingUser.email) {
            done(new Error('GitLab account is already linked to another account.'));
            return;
          }
          done(null, existingUser);
          return;
        }
        const emails = getEmails(profile.emails);
        const primaryEmail = emails[0];
        // otherwise, if the user exists in the database but is missing a github assocation,
        // populate the github field
        if (req.user) {
          req.user.github = profile.username;
          req.user.githubToken = accessToken;
          req.user.verified = User.EmailConfirmation.Verified;
          req.user.save(() => done(null, req.user));
          return;
        }
        // otherwise, the user does not exist in the database. Attempt to find the user
        // by email, and then by username
        User.findByEmail(emails, (findByEmailErr, existingEmailUser) => {
          if (existingEmailUser) {
            existingEmailUser.email = existingEmailUser.email || primaryEmail;
            existingEmailUser.github = profile.username;
            existingEmailUser.username = existingEmailUser.username || profile.username;
            existingEmailUser.githubToken = accessToken;
            existingEmailUser.name = existingEmailUser.name || profile.displayName;
            existingEmailUser.verified = User.EmailConfirmation.Verified;
            existingEmailUser.save(() => done(null, existingEmailUser));
            return;
          }
          User.findByUsername(
            profile.username,
            { caseInsensitive: true },
            (findByUsernameErr, existingUsernameUser) => {
              if (existingUsernameUser) {
                existingUsernameUser.verified = User.EmailConfirmation.Verified;
                existingUsernameUser.githubToken = accessToken;
                existingUsernameUser.username = profile.username;
                existingUsernameUser.save((saveErr) => {
                  if (saveErr) {
                    console.log(`Error updating user ${profile.username}`, saveErr);
                  }
                  return done(null, existingUsernameUser);
                });
                return;
              }
              const user = new User();
              user.email = primaryEmail;
              user.github = profile.username;
              user.username = profile.username;
              user.githubToken = accessToken;
              user.name = profile.displayName;
              user.verified = User.EmailConfirmation.Verified;
              user.save((saveErr) => {
                if (saveErr) {
                  console.log(`Error creating user ${profile.username}`, saveErr);
                }
                return done(null, user);
              });

              const userAllowListItem = new UserAllowlist();
              userAllowListItem.github = profile.username;
              userAllowListItem.studyParticipant = false;
              userAllowListItem.edition = 'unknown';
              userAllowListItem.authState = 'unauthed';
            }
          );
        });
      });
    }
  )
);
