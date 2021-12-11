"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class ApiService {
    static get(url, options) {
        return (0, node_fetch_1.default)(url, options);
    }
}
exports.ApiService = ApiService;
