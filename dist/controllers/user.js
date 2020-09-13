"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const dbInterface_1 = require("./dbInterface");
// users
/*  POST
    {{URL}}/api/v1/user
    Body
      {
        "name": "Ted",
        "password": "letMeIn"
        "email": "ted@pizza.com"
      }
*/
function createUser(request, response, next) {
    console.log('createUser');
    console.log(request.body);
    const { userName, password, email } = request.body;
    const userEntity = {
        userName,
        password,
        email,
    };
    dbInterface_1.createUserDocument(userEntity)
        .then((userDoc) => {
        const userDocument = userDoc;
        console.log('added userDocument');
        console.log(userDocument);
        console.log(userDocument.toObject());
        response.status(201).json({
            success: true,
            data: userDocument,
        });
    });
}
exports.createUser = createUser;
/*  PATCH
    {{URL}}/api/v1/user/<userId>
    Body
    {
        "password": "letMeIn69"
    }
*/
function updateUser(request, response, next) {
    console.log('updateUser');
    console.log(request.body);
    User_1.default.findById(request.params.id, (err, user) => {
        if (request.body._id) {
            delete request.body._id;
        }
        for (const b in request.body) {
            if (request.body.hasOwnProperty(b)) {
                user[b] = request.body[b];
            }
        }
        user.save();
        response.json(user);
    });
}
exports.updateUser = updateUser;
/*
    GET
    {{URL}}/api/v1/validateUser
      userName and password in the body
*/
function validateUser(request, response, next) {
    const { userName, password } = request.params;
    return dbInterface_1.getUser(userName, password)
        .then((responseData) => {
        response.json(responseData);
    }).catch((err) => {
        response.json(null);
    });
}
exports.validateUser = validateUser;
//# sourceMappingURL=user.js.map