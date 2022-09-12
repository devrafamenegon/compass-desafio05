"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidUuid(id) {
    const regexUuid = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
    return id.match(regexUuid) !== null;
}
exports.default = isValidUuid;
