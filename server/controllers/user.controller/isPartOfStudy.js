import UserWhitelist from '../../models/userWhitelist';

/**
 * Check whether or not a user is enrolled in the study
 */
export default (userGithub, callback) => {
  UserWhitelist.findOne({ github: userGithub }, (e, userWhitelist) => {
    // there has to be a better way -_-
    if (e || !userWhitelist) callback(e, null);
    else callback(e, userWhitelist.studyParticipant);
  });
};
