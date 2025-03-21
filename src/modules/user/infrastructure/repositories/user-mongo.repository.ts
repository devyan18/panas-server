import { type UserRepository } from "../../application/interfaces/user-repository.interface";
import { UserModel, type IUser } from "../schemas/user.schema";
import { User } from "../../domain/entities/user.entity";

export class UserMongoRepository implements UserRepository {
  private adapter(user: IUser): User {
    return new User(
      user.id,
      user.name,
      user.nickname,
      user.email,
      user.password,
    );
  }

  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });

    return this.adapter(created);
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id);

    if (!found) return null;

    return this.adapter(found);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });

    if (!found) return null;

    return this.adapter(found);
  }
}
