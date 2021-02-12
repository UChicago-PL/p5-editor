import studyParticipants from './studyParticipants.json';

/**
 * Check whether or not a user is enrolled in the study
 */
export default (userId) => {
  return studyParticipants.ids.includes(userId);
};
