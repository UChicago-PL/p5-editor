import lodash from 'lodash';

import passport from 'passport';
import GitHubStrategy from 'passport-github';

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
    { value: 'email@example.com', primary: false, verified: true },
    { value: 'unverified@example.com', primary: false, verified: false }
  ]

  Output:
    ['email@example.com']
*/
const getVerifiedEmails = (githubEmails) =>
  (githubEmails || []).filter((item) => item.verified === true).map((item) => item.value);

const getPrimaryEmail = (githubEmails) => (lodash.find(githubEmails, { primary: true }) || {}).value;

/**
 * Sign in with GitHub.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback',
      passReqToCallback: true,
      // repo is for creating pull requests
      scope: ['repo', 'user:email']
    },
    (req, accessToken, refreshToken, profile, done) => {
      UserAllowlist.exists({ github: profile.username }, (userExistsErr, exists) => {
        // first, verify that the user is a part of the allowlist
        if (!exists) {
          console.log(`User ${profile.username} is not whitelisted.`);
          done(new Error('User is not whitelisted.'));
          return;
        }
        User.findOne({ github: profile.username }, (findByGithubErr, existingUser) => {
          if (existingUser) {
            // if after the login, the user exists in the database but with a different email
            // then they have already logged in with a different github account
            if (req.user && req.user.email !== existingUser.email) {
              done(new Error('GitHub account is already linked to another account.'));
              return;
            }
            done(null, existingUser);
            return;
          }
          const emails = getVerifiedEmails(profile.emails);
          const primaryEmail = getPrimaryEmail(profile.emails);

          // otherwise, if the user exists in the database but is missing a github assocation,
          // populate the github field
          if (req.user) {
            req.user.github = profile.username;
            req.user.githubToken = accessToken;
            req.user.verified = User.EmailConfirmation.Verified;
            req.user.save((saveErr) => done(null, req.user));
          } else {
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
                existingEmailUser.save((saveErr) => done(null, existingEmailUser));
              } else {
                User.findByUsername(
                  profile.username,
                  { caseInsensitive: true },
                  (findByUsernameErr, existingUsernameUser) => {
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
                  }
                );
              }
            });
          }
        });
      });
    }
  )
);
