// import UserAllowlist from '../../models/userAllowlist';

// /**
//  * Check whether or not a user is enrolled in the study
//  */
// export default (userGithub, callback) => {
//   UserAllowlist.findOne({ github: userGithub }, (e, userAllowlist) => {
//     // there has to be a better way -_-
//     if (e || !userAllowlist) callback(e, null);
//     else callback(e, userAllowlist.studyParticipant);
//   });
// };

export default (userGithub, cb) => cb({}, null);
