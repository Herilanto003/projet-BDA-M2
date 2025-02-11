import jwt from "jsonwebtoken";

const secret = "mysecret";

export const generateToken = (payload: any) => {
  const expiresIn = "1d";

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch (error: any) {
    throw new Error("Invalid token");
  }
};
