import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
  public static passwordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  }

  public static passwordCompare = async (text: string, encrytedText: string): Promise<boolean> => {
    let result = await bcrypt.compare(text, encrytedText);
    return result;
  }

  public static genereateToken = (id: number, username: string, password: string): string => {
    const secretKey: string = process.env.JWT_SECRET_KEY || "secret123456789abcdefghijklmnopqrstuvwxy";

    const token: string = jwt.sign({id, username, password}, secretKey); 
    return token;
  }
}

export default Authentication;