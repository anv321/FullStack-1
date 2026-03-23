// controllers/protectedController.js
export const getDashboard = (req, res, next) => {
  res.json({
    message: 'Welcome to the dashboard!',
    user: req.user
  });
};