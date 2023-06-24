import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "30d",
};

const secret_key = process.env.SECRET_KEY;

export const signJwtAccessToken = (payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) => {
  const token = jwt.sign(payload, secret_key!, options);
  return token
}

// export const resetPasswordToken = async (email: string) => {
//   const resetToken = jwt.sign({ email }, secret_key!, { expiresIn: '1h' });
//   return resetToken
// }

export const verifyJwt = async (token: string) => {
  try {
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
};


export const resetPasswordToken = async (email: string) => {
  const resetToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 3600, email }, secret_key!);
  return resetToken;
}

export const verifyJwtPasswordReset = async (token: string) => {
  try {
    const decoded = jwt.verify(token, secret_key!) as { exp: number; email: string };
    const expirationDate = new Date(decoded.exp * 1000);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      return { expired: true };
    }

    return { expired: false, decodedToken: decoded };
  } catch (error) {
    return { expired: true };
  }
};

