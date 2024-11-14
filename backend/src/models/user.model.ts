import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

class UserModel {
  private users: User[] = [
    {
      id: "1",
      username: "Risa",
      password: "12345",
    },
  ];

  findAll(): User[] {
    return this.users;
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
