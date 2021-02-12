import studyParticipants from './studyParticipants.json';

/**
 * Check whether or not a user is enrolled in the study
 */
export default (userId) => studyParticipants.ids.includes(userId);
