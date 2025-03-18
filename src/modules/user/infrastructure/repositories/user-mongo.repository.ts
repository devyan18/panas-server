// user-mongoose.repository.ts
import { type UserRepository } from "../../application/interfaces/user-repository.interface";
import { UserModel } from "../schemas/user.schema";
import { User } from "../../domain/entities/user.entity";

export class UserMongoRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });

    return new User(
      created.id,
      created.name,
      created.nickname,
      created.email,
      created.password,
    );
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id);

    if (!found) return null;

    return new User(
      found.id,
      found.name,
      found.nickname,
      found.email,
      found.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });

    if (!found) return null;

    return new User(
      found.id,
      found.name,
      found.nickname,
      found.email,
      found.password,
    );
  }
}
