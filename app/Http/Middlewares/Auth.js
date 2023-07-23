
  // Auth middleware
  const AuthMiddleware = (req, res, next) => {
    // Middleware logic goes here
    next();
  };
  
  module.exports = AuthMiddleware;
  