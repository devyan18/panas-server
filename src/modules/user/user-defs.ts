import { UserService } from "./user-service";
import { UserMongoRepository } from "./user-repository";

const userRepository = new UserMongoRepository();
const userService = new UserService(userRepository);

export { userService };
