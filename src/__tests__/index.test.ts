import Tinkoff from '../index';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Setup environment variables for the test
dotenv.config({
    path: path.join(__dirname + '../../../' + 'config/settings.env'),
});

test('Get Tinkoff stocks', async () => {
    const secretToken: string = process.env['SANDBOX_TOKEN']!;
    const tinkoff = new Tinkoff(secretToken);
    const stocks = await tinkoff.stocks('USD');
    expect(stocks.length).toBeGreaterThan(100);
});
