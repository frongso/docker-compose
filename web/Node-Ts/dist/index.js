"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./routes/controller/user.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const routing_controllers_1 = require("routing-controllers");
const test_controller_1 = require("./routes/controller/test.controller");
const typeorm_1 = require("typeorm");
const role_controlller_1 = require("./routes/controller/role.controlller");
const server_1 = require("./config/server");
const security_controller_1 = require("./routes/security/security.controller");
typeorm_1.createConnection()
    .then((connection) => {
    const app = routing_controllers_1.createExpressServer({
        controllers: [test_controller_1.TestController, user_controller_1.UserController, role_controlller_1.RoleController, security_controller_1.SecurityController],
        // middlewares: [LogMiddleware, CheckJwtMiddleware],
        routePrefix: '/service',
    });
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.listen(server_1.port, () => {
        // tslint:disable-next-line:no-console
        console.log('Hello world listen in port : ' + server_1.port);
    });
})
    .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
//# sourceMappingURL=index.js.map