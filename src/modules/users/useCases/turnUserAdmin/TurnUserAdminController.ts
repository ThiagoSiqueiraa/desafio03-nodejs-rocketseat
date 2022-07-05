import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;

      const user = this.turnUserAdminUseCase.execute({ user_id });

      return response.status(200).json({
        email: user.email,
        name: user.name,
        admin: user.admin,
      });
    } catch (e) {
      return response.status(e.code).json({ error: e.message });
    }
  }
}

export { TurnUserAdminController };
