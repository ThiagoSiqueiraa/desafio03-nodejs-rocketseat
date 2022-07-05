import { HttpError } from "../../../../utils/HttpError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

/*
  id: string;
  name: string;
  admin: boolean;
  email: string;
  created_at: string;
  updated_at: string;
  */
class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyExists = this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) throw new HttpError(400, "Email already in use");

    const user = this.usersRepository.create({ email, name });

    return user;
  }
}

export { CreateUserUseCase };
