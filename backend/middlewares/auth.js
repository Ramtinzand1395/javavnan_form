const auththeIp = (req, res, next) => {
  const authHeader = req.body.token;
  if (authHeader === null) {
    return res.status(401).json({ message: "شما مجوز ندارید." });
  } else if (authHeader) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Not authorized..." });
  }
};

module.exports = { auththeIp };
