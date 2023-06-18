const jwt = require("jsonwebtoken");

const signToken = (id, role, first_name, last_name) => {
  return jwt.sign(
    { id, role, fullName: first_name + " " + last_name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = signToken;
