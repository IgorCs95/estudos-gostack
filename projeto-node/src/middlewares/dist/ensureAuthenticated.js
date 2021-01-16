"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = require("../config/auth");
var AppError_1 = require("../errors/AppError");
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1["default"]('JWT token is missing', 401);
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1["default"].jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (error) {
        throw new AppError_1["default"]('Invalid JWT token', 401);
    }
}
exports["default"] = ensureAuthenticated;
