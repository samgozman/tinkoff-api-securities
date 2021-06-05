# tinkoff-api-securities

Получает список торгуемых на Tinkoff инструментов.

## Установка

Установите пакет при помощи NPM

```bash
npm install tinkoff-api-securities
```

```javascript
import Tinkoff from 'tinkoff-api-securities';

const main = async () => {
    const API = new Tinkoff('Tinkoff Invest API SandBox token');
    // Список всех торгуемых акций, облигаций, ETF и валют
    const stocks = await API.stocks();
    const bonds = await API.bonds();
    const etfs = await API.etfs();
    const currencies = await API.currencies();

    // Уточнение валюты инструмента
    const stocks_usd = await API.stocks('USD');
};

main();
```
