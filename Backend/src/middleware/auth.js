const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
  // १. हेडरमधून टोकन घ्या
  const token = req.header('x-auth-token'); 

  console.log("Using Secret Key:", process.env.JWT_SECRET_KEY);
  console.log("Received Token:", token ? "Yes" : "No");

  // २. टोकन नसेल तर एरर द्या
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // ३. टोकन व्हेरिफाय करा
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // टोकनमधून युजर आयडी काढला
    next();
  } catch (err) {
    // ४. इथेच तुम्हाला 'Token is not valid' हा अलर्ट येतोय
    res.status(401).json({ msg: 'Token is not valid' });
  }
};