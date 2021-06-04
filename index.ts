import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';

class Tinkoff {
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

    // Clear sandbox before use
    protected async init() {
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
    protected prepareArray(arr: MarketInstrument[]): Array<string> {
        const clean = [];
        for (const el of arr) {
            clean.push(el.ticker);
        }
        return clean;
    }

    public async stock(currency?: string) {
        const stocks = (await this.API.stocks()).instruments;
        if (!currency) {
            return this.prepareArray(stocks);
        } else {
            return this.prepareArray(this.filterArray(stocks, currency));
        }
    }
}

// Test
const main = async () => {
    const secretToken: string = process.env['SANDBOX_TOKEN']!;
    const tinkoff = new Tinkoff(secretToken);
    console.log(await tinkoff.stock('USD'));
};

main();
