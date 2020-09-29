"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hellowWorld = void 0;
function hellowWorld(request, response) {
    return response.json({ msg: 'Hello World!' });
}
exports.hellowWorld = hellowWorld;
