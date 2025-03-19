import { type UserRepository } from "../interfaces/user-repository.interface";
import { SignInUserDto } from "../dto/sign-in-user.dto";
import { User } from "../../domain/entities/user.entity";
import { compare } from "bcrypt";
import { AccessToken } from "../../../../shared/tools/jwt";

type AuthResponse = {
  user: User;
  accessToken: string;
};

export class SignInUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: SignInUserDto): Promise<AuthResponse> {
    const userFound = await this.userRepository.findByEmail(dto.email);

    if (!userFound) throw new Error("Invalid Credentials");

    const isValidPassword = await compare(dto.password, userFound.password);

    if (!isValidPassword) throw new Error("Invalid Credentials");

    const accessToken = await AccessToken.create({ userId: userFound.id });

    return {
      user: new User(
        userFound.id,
        userFound.name,
        userFound.nickname,
        userFound.email,
        userFound.password,
      ),
      accessToken,
    };
  }
}
