import Tinkoff from '../index';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Setup environment variables for the test
dotenv.config({
    path: path.join(__dirname + '../../../' + 'config/settings.env'),
});

// Create API instance
let API: Tinkoff;
beforeAll(() => {
    const secretToken: string = process.env['SANDBOX_TOKEN']!;
    API = new Tinkoff(secretToken);
});

test('Get Tinkoff stocks', async () => {
    const stocks = await API.stocks('USD');
    expect(stocks.length).toBeGreaterThan(100);
    expect(typeof stocks[10].ticker).toBe('string');
});

test('Get Tinkoff bonds', async () => {
    const bonds = await API.bonds('RUB');
    expect(bonds.length).toBeGreaterThan(100);
    expect(typeof bonds[5].ticker).toBe('string');
});

test('Get Tinkoff etfs', async () => {
    const etfs = await API.etfs();
    expect(etfs.length).toBeGreaterThan(30);
    expect(typeof etfs[10].ticker).toBe('string');
});

test('Get Tinkoff currencies', async () => {
    const currencies = await API.currencies();
    expect(currencies.length).toBeGreaterThan(1);
    expect(typeof currencies[1].ticker).toBe('string');
});
