"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatJoiMessage(error) {
    const messages = error.details.length > 1
        ? error.details.map((error) => error.message.replace(/"/g, '').replace(/\//g, ''))
        : error.details[0].message.replace(/"/g, '').replace(/\//g, '');
    return messages;
}
exports.default = formatJoiMessage;
