"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./../../entities/user");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const config = __importStar(require("../../config/server"));
let SecurityController = class SecurityController {
    login(response, credential) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if username and password are set
            const username = credential.username;
            const password = credential.password;
            if (!(username && password)) {
                return response.sendStatus(400);
            }
            // Get user from database
            const userRepository = typeorm_1.getRepository(user_1.User);
            let user;
            try {
                user = yield userRepository.findOneOrFail({ where: { username } });
            }
            catch (error) {
                return response.sendStatus(401);
            }
            // Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                response.sendStatus(401);
                return;
            }
            // Sign JWT, valid for 15 min
            const token = jwt.sign({ userId: user.id, username: user.username }, config.secretKey, { expiresIn: config.tokenLife });
            // Send the jwt in the response
            response.send(token);
        });
    }
};
__decorate([
    routing_controllers_1.Post('/login'),
    __param(0, routing_controllers_1.Res()), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityController.prototype, "login", null);
SecurityController = __decorate([
    routing_controllers_1.JsonController()
], SecurityController);
exports.SecurityController = SecurityController;
//# sourceMappingURL=security.controller.js.map