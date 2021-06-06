import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';

interface Quote {
    ticker: string;
    name: string;
}

export class Tinkoff {
    protected API: OpenAPI;

    constructor(public secretToken: string) {
        this.API = new OpenAPI({
            apiURL: 'https://api-invest.tinkoff.ru/openapi/sandbox',
            secretToken: this.secretToken,
            socketURL:
                'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws',
        });
        this.init();
    }

    public async stocks(currency?: string): Promise<Array<Quote>> {
        const stocks = (await this.API.stocks()).instruments;
        return this.filter(stocks, currency);
    }

    public async bonds(currency?: string): Promise<Array<Quote>> {
        const bonds = (await this.API.bonds()).instruments;
        return this.filter(bonds, currency);
    }

    public async etfs(currency?: string): Promise<Array<Quote>> {
        const etfs = (await this.API.etfs()).instruments;
        return this.filter(etfs, currency);
    }

    public async currencies(currency?: string): Promise<Array<Quote>> {
        const currencies = (await this.API.currencies()).instruments;
        return this.filter(currencies, currency);
    }

    // Clear sandbox before use
    protected async init(): Promise<void> {
        await this.API.sandboxClear();
    }

    // Filter array of objects by property
    protected filterArray(
        arr: MarketInstrument[],
        currency: string
    ): MarketInstrument[] {
        return arr.filter((el) => {
            return el.currency === currency;
        });
    }

    // Convert array of objects to array of strings (tickers)
    protected prepareArray(arr: MarketInstrument[]): Array<Quote> {
        const clean = [];
        for (const el of arr) {
            clean.push({
                ticker: el.ticker,
                name: el.name,
            });
        }
        return clean;
    }

    protected filter(
        arr: MarketInstrument[],
        currency: string | undefined
    ): Array<Quote> {
        if (!currency) {
            return this.prepareArray(arr);
        } else {
            return this.prepareArray(this.filterArray(arr, currency));
        }
    }
}
