import { type UserRepository } from "../interfaces/user-repository.interface";
import { SignUpUserDto } from "../dto/sign-up-user.dto";
import { User } from "../../domain/entities/user.entity";
import { genSalt, hash } from "bcrypt";
import { AccessToken } from "../../../../shared/tools/jwt";

type AuthResponse = {
  user: User;
  accessToken: string;
};

export class SignUpUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: SignUpUserDto): Promise<AuthResponse> {
    const findExistingEmail = await this.userRepository.findByEmail(dto.email);

    if (findExistingEmail) throw new Error("Email already exists");

    const salt = await genSalt(10);

    const hashedPassword = await hash(dto.password, salt);

    const user = new User(
      "",
      dto.name,
      dto.nickname,
      dto.email,
      hashedPassword,
    );

    const createdUser = await this.userRepository.create(user);

    const accessToken = await AccessToken.create({ userId: user.id });

    return {
      user: createdUser,
      accessToken,
    };
  }
}
