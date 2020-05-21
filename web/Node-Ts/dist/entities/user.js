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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const rsm_role_map_use_1 = require("./rsm_role_map_use");
let User = class User extends typeorm_1.BaseEntity {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
__decorate([
    typeorm_1.Column('bigint', {
        name: 'MSM_USER_ID',
        primary: true,
        generated: true,
        width: 22,
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'MSM_USR_USERNAME',
        unique: true,
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'MSM_USR_PASSWORD',
        nullable: false,
        length: 250,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'MSM_USR_FIRSTNAME',
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'MSM_USR_LASTNAME',
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'MSM_USR_EMAIL',
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany((type) => rsm_role_map_use_1.RoleMapUser, (rolemapuser) => rolemapuser.user),
    typeorm_1.JoinTable(),
    __metadata("design:type", rsm_role_map_use_1.RoleMapUser)
], User.prototype, "rolemapuser", void 0);
User = __decorate([
    typeorm_1.Entity({
        name: 'msm_user',
        schema: 'shopping_mall',
    })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map