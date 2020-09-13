"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagsRouter = express_1.default.Router();
const controllers_1 = require("../controllers");
tagsRouter.get('/tags', controllers_1.getTags);
tagsRouter.post('/tag', controllers_1.createTag);
tagsRouter.post('/tags', controllers_1.createTags);
exports.default = tagsRouter;
//# sourceMappingURL=tags.js.map