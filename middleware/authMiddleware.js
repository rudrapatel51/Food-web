const jwt = require('jsonwebtoken');
const JWT_SECRET = 'c8ff8b996787be658b929d56182f18362b6f864a0b9c9443aab9afb4b87598763b8e67b8df59fd64268ef906a5e5e01197f377ead577226bc23bfa8ae4efe8df'; 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
