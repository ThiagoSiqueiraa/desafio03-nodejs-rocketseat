import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      if (typeof user_id !== "string")
        throw new Error("Opps! Internal server error");

      const all = this.listAllUsersUseCase.execute({
        user_id,
      });

      return response.status(200).json(all);
    } catch (e) {
      return response.status(e.code).json({ error: e.message });
    }
  }
}

export { ListAllUsersController };
