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
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("./../entities/role");
const routing_controllers_1 = require("routing-controllers");
let RoleController = class RoleController {
    getall() {
        return role_1.Role.find();
    }
    generate(role) {
        return role_1.Role.save(role);
    }
    delete(id, response) {
        role_1.Role.delete(id);
        return response.sendStatus(200);
    }
};
__decorate([
    routing_controllers_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getall", null);
__decorate([
    routing_controllers_1.Post('/generate'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_1.Role]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "generate", null);
__decorate([
    routing_controllers_1.Delete('/delete'),
    __param(0, routing_controllers_1.QueryParam('id')), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "delete", null);
RoleController = __decorate([
    routing_controllers_1.JsonController('/role')
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controlller.js.map