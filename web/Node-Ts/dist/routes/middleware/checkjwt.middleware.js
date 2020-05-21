"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const jwt = __importStar(require("jsonwebtoken"));
const config = __importStar(require("../../config/server"));
let CheckJwtMiddleware = class CheckJwtMiddleware {
    use(request, response, next) {
        if (request.url === '/service/login' && request.method === 'POST') {
            return next();
        }
        // Get the jwt token from the head does it work ?
        let token = request.get(config.tokenHeader);
        if (!token.startsWith('Bearer')) {
            // Reject if there is no Bearer in the token
            return response.status(401).send('Token is invalid');
        }
        // Remove Bearer from string
        token = token.slice(7, token.length);
        // Try to validate the token and get data
        try {
            const payload = jwt.verify(token, config.secretKey);
            response.locals.jwtPayload = payload;
        }
        catch (error) {
            // If token is not valid, respond with 401 (unauthorized)
            response.sendStatus(401);
            return;
        }
        // The token is valid for 1 hour
        // We want to send a new token on every request
        const newToken = jwt.sign({ userId: response.locals.jwtPayload.id, username: response.locals.jwtPayload.username }, config.secretKey, { expiresIn: config.tokenLife });
        // Set header to send new token
        response.setHeader('token', newToken);
        // go next to controller
        return next();
    }
};
CheckJwtMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], CheckJwtMiddleware);
exports.CheckJwtMiddleware = CheckJwtMiddleware;
//# sourceMappingURL=checkJwt.middleware.js.map