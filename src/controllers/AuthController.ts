import { Request, Response } from "express";
import Authentication from "@src/utils/Authentication";
const db = require("@src/config/db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const hashedPassword: string = await Authentication.passwordHash(password);

    await db.user.create({username, password: hashedPassword});

    return res.send("register suksess");
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    let {username, password} = req.body;

    const user = await db.user.findOne({
      where: {username}
    });

    let compare = await Authentication.passwordCompare(password, user.password);

    if(compare) {
      let token = Authentication.genereateToken(user.id, username, user.password);
      return res.send({
        token
      });
    }

    return res.send("auth failed");
  }

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  }
}

export default new AuthController();