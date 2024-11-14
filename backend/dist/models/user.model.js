"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [
            {
                id: "1",
                username: "Risa",
                password: "12345",
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
