import type { User } from "./user";
import type { UserRepository } from "./user-repository";
import { hash, genSalt } from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: Omit<User, "id">): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    return this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
