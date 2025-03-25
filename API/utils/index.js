import bcrybt from 'bcryptjs';
import JWT from 'jsonwebtoken';


export const HashString = async (useValue) => {
  const salt = await bcrybt.genSalt(10);
  const hashedPassword = await bcrybt.hash(useValue, salt);
  return hashedPassword;
};
export const CompareString = async (password,userPassword) => {
  const isMatch = await bcrybt.compare(password,userPassword);
  return isMatch;
};

// Json WebToken
export function CreateJWT(user) {
  return JWT.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
}

export function GenerateRandomCode(numberOfCharacters = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < numberOfCharacters; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}