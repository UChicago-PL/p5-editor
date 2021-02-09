import studyParticipants from './studyParticipants.json';

export default (userId) => studyParticipants.ids.includes(userId);
