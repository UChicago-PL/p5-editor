const studyParticipants = {
  ids: ['mcnuttandrew', 'outkine', 'ravichugh']
};
/**
 * Check whether or not a user is enrolled in the study
 */
export default (userId) => studyParticipants.ids.includes(userId);
