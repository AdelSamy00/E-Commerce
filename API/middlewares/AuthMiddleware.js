import JWT from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader?.startsWith('Bearer')) {
    next('Authentication == failed');
  }
  const token = authHeader?.split(' ')[1];
  try {
    const User = JWT.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(User);
    req.body.userId = User?.user?._id;
    next();
  } catch (error) {
    console.log(error);
    next('Authentication failed');
  }
};
