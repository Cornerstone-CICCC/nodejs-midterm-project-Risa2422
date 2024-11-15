import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

class UserModel {
  private users: User[] = [
    {
      id: "19988b16-58b9-4b2c-9147-3a84307982ae",
      username: "Taro",
      password: "$2b$12$pFz/I1OL7CJ87fVaAwHrWutA3vZwR.LI3cpsBBzXH6uP5rbzJOyP2",
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    return user;
  }

  findByUsername(username: string): User | undefined {
    const user = this.users.find((user) => user.username === username);
    if (!user) return undefined;
    return user;
  }

  create(newData: Omit<User, "id">): User {
    const user = {
      id: uuidv4(),
      ...newData,
    };
    this.users.push(user);
    return user;
  }
}

export default new UserModel();
