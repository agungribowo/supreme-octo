import BaseRouter from "./BaseRouter";

import AuthController from "@src/controllers/AuthController";

class AuthRoutes extends BaseRouter {
  public routes(): void {
    this.router.post('/register', AuthController.register);
    this.router.post('/login', AuthController.login);
    this.router.get('/profile', AuthController.profile);
  }
}

export default new AuthRoutes().router;