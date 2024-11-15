"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [
            {
                id: "19988b16-58b9-4b2c-9147-3a84307982ae",
                username: "Taro",
                password: "$2b$12$pFz/I1OL7CJ87fVaAwHrWutA3vZwR.LI3cpsBBzXH6uP5rbzJOyP2",
            },
        ];
    }
    findAll() {
        return this.users;
    }
    findByUsername(username) {
        const user = this.users.find((user) => user.username === username);
        if (!user)
            return undefined;
        return user;
    }
    create(newData) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newData);
        this.users.push(user);
        return user;
    }
}
exports.default = new UserModel();
