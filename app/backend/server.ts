import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";
import { CurrencyApiService } from './api/currency-api.service';
import config from './config.json';

const app = express();

app.use(express.static(path.join(__dirname, config.frontendFolder)));

app.get("/v1/api/currency-name", async (req: Request, res: Response) => {
    const currencyRes = await CurrencyApiService.getAllCurrencies();
    res.send(currencyRes);
});

app.get("/v1/api/currency-rate", async (req: Request, res: Response) => {
    const query = req.query.symbols as string;
    const rateRes = await CurrencyApiService.getCurrentRate(query);
    res.send(rateRes);
});

app.listen(config.serverPort, () => console.log(`Server listening on port ${config.serverPort}!`));

