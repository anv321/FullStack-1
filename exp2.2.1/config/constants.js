// config/constants.js
export default {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: '1h',
  BCRYPT_ROUNDS: 10
};
