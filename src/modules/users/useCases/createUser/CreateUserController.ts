import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;
      const user = this.createUserUseCase.execute({ email, name });

      return response.status(201).json({
        name: user.name,
        admin: user.admin,
        email: user.email,
      });
    } catch (e) {
      return response.status(e.code).json({ error: e.message });
    }
  }
}

export { CreateUserController };
