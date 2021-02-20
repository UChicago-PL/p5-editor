import UserWhitelist from '../models/userWhitelist';

if (process.env.NODE_ENV === 'development') {
  const users = ['mcnuttandrew', 'outkine', 'ravichugh'];

  users.forEach((user) => {
    UserWhitelist.create({ github: user, type: 'user', studyParticipant: true }, (e) => {
      // there is a uniqueness constraint on usernames, so no duplicates will be created
      // ignore the uniqueness error
    });
  });
}
