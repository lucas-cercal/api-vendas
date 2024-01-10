export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defaultSecret',
    expiresIn: '1d',
  },
};
