import { type User, UserModel } from "./user";

export interface UserRepository {
  create(user: Omit<User, "id">): Promise<User>;
  findById(id: string): Promise<User | null>;
}

export class UserMongoRepository implements UserRepository {
  async create(userData: Omit<User, "id">): Promise<User> {
    const newUser = new UserModel(userData);
    await newUser.save();

    const { _id, __v, ...data } = newUser.toObject();

    const user = {
      ...data,
      id: newUser._id.toString(),
    };

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ _id: id });

    if (user) {
      const { _id, __v, ...data } = user.toObject();

      return {
        ...data,
        id: user._id.toString(),
      };
    }
    return null;
  }
}
