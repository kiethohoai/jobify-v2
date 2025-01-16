import jwt from 'jsonwebtoken';

export const createJWT = (paylaod) => {
  const token = jwt.sign(paylaod, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
