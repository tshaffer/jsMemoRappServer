"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
const controllers_1 = require("../controllers");
usersRouter.get('/user/:userName/password/:password', controllers_1.validateUser);
usersRouter.post('/user', controllers_1.createUser);
usersRouter.patch('/user/:id', controllers_1.updateUser);
exports.default = usersRouter;
//# sourceMappingURL=users.js.map