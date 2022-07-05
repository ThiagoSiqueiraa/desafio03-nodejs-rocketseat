import { HttpError } from "../../../../utils/HttpError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpError(400, "User not exists");
    }

    if (!user.admin) {
      throw new HttpError(400, "User not admin");
    }

    const all = this.usersRepository.list();

    return all;
  }
}

export { ListAllUsersUseCase };
