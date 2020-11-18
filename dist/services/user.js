"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
function create(user) {
    return user.save();
}
function findById(userId) {
    return User_1.default.findById(userId)
        .exec()
        .then((user) => {
        if (!user) {
            throw new Error(`User ${userId} not found`);
        }
        return user;
    });
}
function findAll() {
    return User_1.default.find().sort({ firstName: 1 }).exec();
}
function update(userId, update) {
    return User_1.default.findById(userId)
        .exec()
        .then((user) => {
        if (!user) {
            throw new Error(`User ${userId} not found`);
        }
        if (update.firstName) {
            user.firstName = update.firstName;
        }
        if (update.lastName) {
            user.lastName = update.lastName;
        }
        if (update.email) {
            user.email = update.email;
        }
        if (update.password) {
            user.password = update.password;
        }
        return user.save();
    });
}
function deleteUser(userId) {
    return User_1.default.findByIdAndDelete(userId).exec();
}
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteUser,
};
//# sourceMappingURL=user.js.map