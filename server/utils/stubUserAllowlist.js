import UserAllowlist from '../models/userAllowlist';

if (process.env.NODE_ENV === 'development') {
  const users = ['mcnuttandrew', 'outkine', 'ravichugh'];

  users.forEach((user) => {
    UserAllowlist.create({ github: user, type: 'user', studyParticipant: true }, (e) => {
      // there is a uniqueness constraint on usernames, so no duplicates will be created
      // ignore the uniqueness error
    });
  });
}
