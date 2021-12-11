"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const currency_api_service_1 = require("./api/currency-api.service");
const config_json_1 = __importDefault(require("./config.json"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, config_json_1.default.frontendFolder)));
app.get("/v1/api/currency-name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currencyRes = yield currency_api_service_1.CurrencyApiService.getAllCurrencies();
    res.send(currencyRes);
}));
app.get("/v1/api/currency-rate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.symbols;
    const rateRes = yield currency_api_service_1.CurrencyApiService.getCurrentRate(query);
    res.send(rateRes);
}));
app.listen(config_json_1.default.serverPort, () => console.log(`Server listening on port ${config_json_1.default.serverPort}!`));
