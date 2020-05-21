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
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("./role");
const user_1 = require("./user");
const typeorm_1 = require("typeorm");
let RoleMapUser = class RoleMapUser extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.Column('bigint', {
        primary: true,
        name: 'RSM_RMU_ID',
        generated: true,
        width: 22,
    }),
    __metadata("design:type", Number)
], RoleMapUser.prototype, "rumid", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_1.User, (user) => user.rolemapuser),
    typeorm_1.JoinColumn({ name: 'MSM_USER_ID' }),
    __metadata("design:type", user_1.User)
], RoleMapUser.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => role_1.Role, (role) => role.rolemapuser),
    typeorm_1.JoinColumn({ name: 'MSM_ROLE_ID' }),
    __metadata("design:type", role_1.Role)
], RoleMapUser.prototype, "role", void 0);
RoleMapUser = __decorate([
    typeorm_1.Entity('rsm_role_map_user', { schema: 'shopping_mall' })
], RoleMapUser);
exports.RoleMapUser = RoleMapUser;
//# sourceMappingURL=rsm_role_map_use.js.map